// src/main.ts
import { CONFIG } from './config';
import { STATE, handleError } from './state';
import { simulateHover, isDeleteButton } from './domUtils';
import { createPanelUI, injectStyles, updateUICore, setUIDeleteCounterInstance } from './ui';
import { setupSnapchatThemeObserver } from './themeManager';
import { DeleteCountManager } from './deleteCounter';
import type { UIPosition, ThemeOption } from './types';

// --- GM Function Declarations for this module ---
declare const GM_getValue: (key: string, defaultValue?: any) => Promise<any>;
declare const GM_setValue: (key: string, value: any) => Promise<void>;
declare const GM_addStyle: (css: string) => HTMLStyleElement;
// GM_xmlhttpRequest declaration for Tampermonkey.Request type
declare const GM_xmlhttpRequest: (details: Tampermonkey.Request) => void;
// --- End GM Function Declarations ---

// Log GM function availability at the very start
console.log(`[${CONFIG.SCRIPT_NAME}] GM_getValue type: ${typeof GM_getValue}`);
console.log(`[${CONFIG.SCRIPT_NAME}] GM_setValue type: ${typeof GM_setValue}`);
console.log(`[${CONFIG.SCRIPT_NAME}] GM_addStyle type: ${typeof GM_addStyle}`);
console.log(`[${CONFIG.SCRIPT_NAME}] GM_xmlhttpRequest type: ${typeof GM_xmlhttpRequest}`);

let deleteCounter: DeleteCountManager;

async function loadPreferences(): Promise<void> {
  try {
    if (typeof GM_getValue !== 'function') {
      handleError(new Error("GM_getValue is not available for loading preferences."), "loadPreferences");
      STATE.reverseOrder = true;
      STATE.autoScrollEnabled = false;
      STATE.uiPosition = { x: 20, y: 20 };
      STATE.themePreference = CONFIG.DEFAULT_THEME;
      STATE.ui.isMinimized = false;
      console.log(`[${CONFIG.SCRIPT_NAME}] GM_getValue not found, defaults set.`);
      return;
    }

    STATE.reverseOrder = (await GM_getValue(CONFIG.STORAGE_KEYS.REVERSE_ORDER, true)) as boolean;
    STATE.autoScrollEnabled = (await GM_getValue(CONFIG.STORAGE_KEYS.AUTO_SCROLL, false)) as boolean;
    const storedPosition = (await GM_getValue(CONFIG.STORAGE_KEYS.UI_POSITION)) as UIPosition | undefined;
    STATE.uiPosition = storedPosition || { x: 20, y: 20 };
    STATE.themePreference = (await GM_getValue(CONFIG.STORAGE_KEYS.THEME_PREFERENCE, CONFIG.DEFAULT_THEME)) as ThemeOption;
    STATE.ui.isMinimized = (await GM_getValue(CONFIG.STORAGE_KEYS.PANEL_MINIMIZED, false)) as boolean;
    console.log(`[${CONFIG.SCRIPT_NAME}] Preferences loaded via GM_getValue.`);
  } catch (error: any) {
    handleError(error, "Loading preferences");
    STATE.reverseOrder = true;
    STATE.autoScrollEnabled = false;
    STATE.uiPosition = { x: 20, y: 20 };
    STATE.themePreference = CONFIG.DEFAULT_THEME;
    STATE.ui.isMinimized = false;
  }
}

async function handlePotentialDeleteButton(button: HTMLButtonElement): Promise<void> {
  if (STATE.processedButtons.has(button)) return;
  try {
    if (isDeleteButton(button)) {
      STATE.processedButtons.add(button);
      button.click();
      STATE.lastDeleteTime = Date.now();
      await deleteCounter.increment();
      await new Promise((resolve) => setTimeout(resolve, CONFIG.POST_DELETE_DELAY));
    }
  } catch (error: any) {
    handleError(error, "Processing delete button");
  }
}

async function hoverNextMessage(): Promise<void> {
  if (!STATE.observerActive || STATE.isScrolling) return;
  try {
    let messages = Array.from(
      document.querySelectorAll<HTMLElement>(CONFIG.SELECTORS.MESSAGE_CONTAINER)
    ).filter((msgContainer) => {
      const header = msgContainer.querySelector<HTMLElement>(CONFIG.SELECTORS.MESSAGE_HEADER_SELECTOR);
      if (!header) return false;
      const potentialSelfIdentifier = header.querySelector<HTMLElement>(
        CONFIG.SELECTORS.USER_MESSAGE_IDENTIFIER_ELEMENT
      );
      const isUserMessage = !!potentialSelfIdentifier;
      return isUserMessage && !STATE.processedMessages.has(msgContainer);
    });

    if (STATE.reverseOrder) {
      messages.reverse();
    }

    for (const message of messages) {
      if (!STATE.observerActive) break;
      STATE.processedMessages.add(message);
      const hoverTargets: (Element | null)[] = [
        message.querySelector(CONFIG.SELECTORS.MESSAGE_HOVER_TARGET_1),
        message.querySelector(CONFIG.SELECTORS.MESSAGE_HOVER_TARGET_2),
        message,
      ].filter(Boolean);

      for (const target of hoverTargets) {
        if (!STATE.observerActive || !target) break;
        simulateHover(target, true);
        await new Promise((resolve) => setTimeout(resolve, CONFIG.MESSAGE_HOVER_DELAY));
        const menuVisible = !!document.querySelector(CONFIG.SELECTORS.CONTEXT_MENU);
        if (menuVisible) {
          await new Promise((resolve) => setTimeout(resolve, 50));
          break;
        } else {
          simulateHover(target, false);
          await new Promise((resolve) => setTimeout(resolve, 10));
        }
      }
      break;
    }
  } catch (error: any) {
    handleError(error, "Automatic message hover");
  }
  if (STATE.observerActive) {
    setTimeout(hoverNextMessage, CONFIG.MESSAGE_HOVER_DELAY * 2);
  }
}

async function autoScrollChat(): Promise<void> {
  if (!STATE.autoScrollEnabled || !STATE.observerActive || STATE.isScrolling) return;
  const now = Date.now();
  if (STATE.lastDeleteTime === 0 || now - STATE.lastDeleteTime > CONFIG.AUTO_SCROLL_DELAY) {
    STATE.isScrolling = true;
    if (STATE.ui.autoScrollToggleButton) {
      STATE.ui.autoScrollToggleButton.classList.add("scrolling");
    }
    const scrollContainerParent = document.querySelector<HTMLElement>(
        CONFIG.SELECTORS.CHAT_SCROLL_CONTAINER_PARENT_SELECTOR
    );
    let chatContainer: HTMLElement | null = null;
    if (scrollContainerParent) {
        let currentElement: HTMLElement | null = scrollContainerParent;
        while (currentElement && !chatContainer) {
            const style = window.getComputedStyle(currentElement);
            if (style.overflowY === "scroll" || style.overflowY === "auto") {
                chatContainer = currentElement;
                break;
            }
            currentElement = currentElement.parentElement;
        }
    }
    if (chatContainer) {
      for (let i = 0; i < CONFIG.MAX_SCROLL_ATTEMPTS; i++) {
        chatContainer.scrollTop = 0;
        await new Promise((resolve) => setTimeout(resolve, CONFIG.SCROLL_INTERVAL));
      }
      await new Promise((resolve) => setTimeout(resolve, CONFIG.LOAD_WAIT_AFTER_SCROLL));
    } else {
      console.warn(`[${CONFIG.SCRIPT_NAME}] Chat scroll container not found.`);
    }
    if (STATE.ui.autoScrollToggleButton) {
      STATE.ui.autoScrollToggleButton.classList.remove("scrolling");
      if (updateUICore.settings?.autoScrollToggleButton) updateUICore.settings.autoScrollToggleButton();
    }
    STATE.isScrolling = false;
    STATE.lastDeleteTime = Date.now();
    deleteCounter.updateDisplay();
  }
}

function setupDomObserver(): void {
  if (STATE.domObserver) STATE.domObserver.disconnect();
  STATE.domObserver = new MutationObserver((mutations) => {
    if (!STATE.observerActive) return;
    for (const mutation of mutations) {
      if (mutation.type === "childList") {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const elementNode = node as Element;
            if (elementNode.matches && elementNode.matches(CONFIG.SELECTORS.DELETE_BUTTON_CANDIDATE)) {
              handlePotentialDeleteButton(elementNode as HTMLButtonElement)
                .catch(err => handleError(err, "DOM Observer - direct match"));
            }
            elementNode
              .querySelectorAll<HTMLButtonElement>(CONFIG.SELECTORS.DELETE_BUTTON_CANDIDATE)
              .forEach(btn => handlePotentialDeleteButton(btn)
                .catch(err => handleError(err, "DOM Observer - querySelectorAll")));
          }
        });
      }
    }
  });
  STATE.domObserver.observe(document.body, { childList: true, subtree: true });
}

function toggleDeletionProcess(): void {
  STATE.observerActive = !STATE.observerActive;
  if (STATE.observerActive) {
    STATE.lastDeleteTime = Date.now();
    setupDomObserver();
    hoverNextMessage().catch(err => handleError(err, "Initial hoverNextMessage call"));
    if (STATE.autoScrollEnabled) {
      if (STATE.autoScrollIntervalId) clearInterval(STATE.autoScrollIntervalId);
      STATE.autoScrollIntervalId = window.setInterval(autoScrollChat, CONFIG.UI_UPDATE_INTERVAL);
    }
    if (STATE.displayUpdateIntervalId) clearInterval(STATE.displayUpdateIntervalId);
    STATE.displayUpdateIntervalId = window.setInterval(
        () => deleteCounter.updateDisplay(),
        CONFIG.UI_UPDATE_INTERVAL
    );
  } else {
    if (STATE.domObserver) {
      STATE.domObserver.disconnect();
      STATE.domObserver = null;
    }
    if (STATE.autoScrollIntervalId) {
      clearInterval(STATE.autoScrollIntervalId);
      STATE.autoScrollIntervalId = null;
    }
    if (STATE.displayUpdateIntervalId) {
      clearInterval(STATE.displayUpdateIntervalId);
      STATE.displayUpdateIntervalId = null;
    }
    STATE.processedMessages = new WeakSet<Element>();
    STATE.processedButtons = new WeakSet<Element>();
  }
  updateUICore.toggleButtonState();
  if (updateUICore.settings) {
    updateUICore.settings.orderToggleButton();
    updateUICore.settings.autoScrollToggleButton();
  }
  deleteCounter.updateDisplay();
}

async function initialize(): Promise<void> {
  console.log(`[${CONFIG.SCRIPT_NAME}] Initializing v${CONFIG.VERSION}...`);
  try {
    deleteCounter = new DeleteCountManager();
    setUIDeleteCounterInstance(deleteCounter);

    await loadPreferences(); 
    
    if (typeof GM_addStyle !== 'function') {
        handleError(new Error("GM_addStyle is not available for injecting styles."), "initialize");
    } else {
        injectStyles();
    }

    createPanelUI();
    if (STATE.ui.toggleButton) {
        STATE.ui.toggleButton.addEventListener("click", toggleDeletionProcess);
    } else {
        handleError(new Error("Toggle button not found after UI creation."), "Initialization");
    }
    setupSnapchatThemeObserver();
    console.log(`[${CONFIG.SCRIPT_NAME}] Initialized successfully.`);
  } catch (error: any) {
    handleError(error, "Initialization");
  }
}

if (document.readyState === "interactive" || document.readyState === "complete") {
  initialize().catch(err => console.error("Initialization failed:", err));
} else {
  document.addEventListener("DOMContentLoaded", () => {
    initialize().catch(err => console.error("Initialization failed (DOMContentLoaded):", err));
  });
}
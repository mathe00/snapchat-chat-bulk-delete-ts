// src/main.ts
import { CONFIG } from "./config";
import { STATE, handleError } from "./state";
import {
  simulateHover,
  isDeleteButton,
  triggerContextMenu,
  waitForDOMStabilization,
} from "./domUtils";
import {
  createPanelUI,
  injectStyles,
  updateUICore,
  setUIDeleteCounterInstance,
} from "./ui";
import { setupSnapchatThemeObserver } from "./themeManager";
import { DeleteCountManager } from "./deleteCounter";
import type { UIPosition, ThemeOption, DeletionSpeed } from "./types";

// --- GM Function Declarations for this module ---
declare const GM_getValue: (key: string, defaultValue?: any) => Promise<any>;
declare const GM_setValue: (key: string, value: any) => Promise<void>;
declare const GM_addStyle: (css: string) => HTMLStyleElement;
// GM_xmlhttpRequest declaration for Tampermonkey.Request type
declare const GM_xmlhttpRequest: (details: Tampermonkey.Request) => void;
// --- End GM Function Declarations ---

let deleteCounter: DeleteCountManager;

async function loadPreferences(): Promise<void> {
  try {
    if (typeof GM_getValue !== "function") {
      handleError(
        new Error("GM_getValue is not available for loading preferences."),
        "loadPreferences",
      );
      STATE.reverseOrder = true;
      STATE.autoScrollEnabled = false;
      STATE.autoDeletionEnabled = false; // New
      STATE.uiPosition = { x: 20, y: 20 };
      STATE.themePreference = CONFIG.DEFAULT_THEME;
      STATE.ui.isMinimized = false;
      STATE.deletionSpeed = "normal";
      return;
    }

    STATE.reverseOrder = (await GM_getValue(
      CONFIG.STORAGE_KEYS.REVERSE_ORDER,
      true,
    )) as boolean;
    STATE.autoScrollEnabled = (await GM_getValue(
      CONFIG.STORAGE_KEYS.AUTO_SCROLL,
      false,
    )) as boolean;
    STATE.autoDeletionEnabled = (await GM_getValue(
      CONFIG.STORAGE_KEYS.AUTO_DELETION,
      false,
    )) as boolean; // New
    const storedPosition = (await GM_getValue(
      CONFIG.STORAGE_KEYS.UI_POSITION,
    )) as UIPosition | undefined;
    STATE.uiPosition = storedPosition || { x: 20, y: 20 };
    STATE.themePreference = (await GM_getValue(
      CONFIG.STORAGE_KEYS.THEME_PREFERENCE,
      CONFIG.DEFAULT_THEME,
    )) as ThemeOption;
    STATE.ui.isMinimized = (await GM_getValue(
      CONFIG.STORAGE_KEYS.PANEL_MINIMIZED,
      false,
    )) as boolean;
    STATE.deletionSpeed = (await GM_getValue(
      CONFIG.STORAGE_KEYS.DELETION_SPEED,
      "normal",
    )) as DeletionSpeed;
    STATE.humanLikeDelays = (await GM_getValue(
      CONFIG.STORAGE_KEYS.HUMAN_LIKE_DELAYS,
      true,
    )) as boolean;
  } catch (error: any) {
    handleError(error, "Loading preferences");
    // Set defaults on error
    STATE.reverseOrder = true;
    STATE.autoScrollEnabled = false;
    STATE.autoDeletionEnabled = false; // New
    STATE.uiPosition = { x: 20, y: 20 };
    STATE.themePreference = CONFIG.DEFAULT_THEME;
    STATE.ui.isMinimized = false;
    STATE.deletionSpeed = "normal";
    STATE.humanLikeDelays = true;
  }
}

async function handlePotentialDeleteButton(
  button: HTMLButtonElement,
): Promise<void> {
  if (STATE.processedButtons.has(button)) return;
  try {
    if (isDeleteButton(button)) {
      const delays = CONFIG.DELETION_SPEEDS[STATE.deletionSpeed];
      STATE.processedButtons.add(button);
      button.click();
      STATE.lastDeleteTime = Date.now();
      await deleteCounter.increment();
      await new Promise((resolve) =>
        setTimeout(resolve, delays.postDeleteDelay),
      );
    }
  } catch (error: any) {
    handleError(error, "Processing delete button");
  }
}

function findMyMessages(): HTMLElement[] {
  const allMessages = document.querySelectorAll<HTMLElement>(
    CONFIG.SELECTORS.MESSAGE_CONTAINER,
  );

  const myMessages = Array.from(allMessages).filter((msgContainer) => {
    const header = msgContainer.querySelector<HTMLElement>(
      CONFIG.SELECTORS.MESSAGE_HEADER_SELECTOR,
    );
    if (!header) return false;
    const isUserMessage = !!header.querySelector(
      CONFIG.SELECTORS.USER_MESSAGE_IDENTIFIER_ELEMENT,
    );
    const isProcessed = STATE.processedMessages.has(msgContainer);

    return isUserMessage && !isProcessed;
  });

  return myMessages;
}

// --- Automatic Deletion Loop ---
async function deleteNextMessageAutomatic(): Promise<void> {
  if (!STATE.observerActive || !STATE.autoDeletionEnabled || STATE.isScrolling)
    return;

  try {
    const delays = CONFIG.DELETION_SPEEDS[STATE.deletionSpeed];
    const messages = findMyMessages();
    if (STATE.reverseOrder) {
      messages.reverse();
    }

    if (messages.length > 0) {
      const message = messages[0];
      STATE.processedMessages.add(message);

      const messageBubble = message.querySelector<HTMLElement>(
        CONFIG.SELECTORS.MESSAGE_BUBBLE,
      );
      if (messageBubble) {
        const eventView = messageBubble.ownerDocument.defaultView;
        if (!eventView) {
          handleError(
            new Error("Could not get window context from message bubble."),
            "deleteNextMessageAutomatic",
          );
          return;
        }

        const mousedownEvent = new MouseEvent("mousedown", {
          bubbles: true,
          cancelable: true,
          view: eventView,
          button: 0,
          buttons: 1,
        });
        messageBubble.dispatchEvent(mousedownEvent);

        await new Promise((resolve) => setTimeout(resolve, 200));

        const mouseupEvent = new MouseEvent("mouseup", {
          bubbles: true,
          cancelable: true,
          view: eventView,
          button: 0,
        });
        messageBubble.dispatchEvent(mouseupEvent);

        await new Promise((resolve) =>
          setTimeout(resolve, delays.messageInteractionDelay),
        );

        if (!document.querySelector(CONFIG.SELECTORS.CONTEXT_MENU)) {
          // Context menu didn't appear, but continue anyway
        }
      } else {
        handleError(
          new Error("Could not find message bubble to click."),
          "deleteNextMessageAutomatic",
        );
      }
    }
  } catch (error: any) {
    handleError(error, "Automatic message deletion loop");
  }

  if (STATE.observerActive && STATE.autoDeletionEnabled) {
    const delays = CONFIG.DELETION_SPEEDS[STATE.deletionSpeed];
    // Add random delay to simulate human behavior and avoid detection (if enabled)
    const baseDelay = delays.messageInteractionDelay * 2;
    const humanDelay = STATE.humanLikeDelays ? Math.random() * 1000 + 500 : 0;
    const randomDelay = baseDelay + humanDelay;
    setTimeout(deleteNextMessageAutomatic, randomDelay);
  }
}

// --- Manual Hover Deletion Loop ---
async function hoverNextMessage(): Promise<void> {
  if (!STATE.observerActive || STATE.isScrolling) return;
  try {
    const delays = CONFIG.DELETION_SPEEDS[STATE.deletionSpeed];
    const messages = findMyMessages();

    if (STATE.reverseOrder) {
      messages.reverse();
    }

    if (messages.length > 0) {
      const message = messages[0];
      if (!STATE.observerActive) return;
      STATE.processedMessages.add(message);

      const hoverTargets: (Element | null)[] = [
        message.querySelector(CONFIG.SELECTORS.MESSAGE_HOVER_TARGET_1),
        message.querySelector(CONFIG.SELECTORS.MESSAGE_HOVER_TARGET_2),
        message.querySelector(CONFIG.SELECTORS.MESSAGE_HOVER_TARGET_3),
        message,
      ].filter(Boolean);

      for (let i = 0; i < hoverTargets.length; i++) {
        const target = hoverTargets[i];
        if (!STATE.observerActive || !target) break;

        // Try multiple hover methods
        simulateHover(target, true);
        await new Promise((resolve) =>
          setTimeout(resolve, delays.messageInteractionDelay),
        );

        // Also try right-click simulation
        const contextMenuEvent = new MouseEvent("contextmenu", {
          bubbles: true,
          cancelable: true,
          view: target.ownerDocument.defaultView,
          button: 2, // Right click
          buttons: 2,
        });
        target.dispatchEvent(contextMenuEvent);
        await new Promise((resolve) => setTimeout(resolve, 100));

        // Check for context menu with current selector
        const menuVisible = !!document.querySelector(
          CONFIG.SELECTORS.CONTEXT_MENU,
        );

        // Also check for context menus nested inside message bubbles
        const nestedContextMenus = document.querySelectorAll(
          ".KB4Aq .gFryU, .T1yt2 .gFryU",
        );

        // Check if context menu is already visible in the current message
        const messageContextMenu = message.querySelector(".gFryU");

        // Also check for context menus in parent elements
        const parentContextMenu = message.closest(".gFryU");

        // Check for any context menus in the entire chat area
        const allContextMenusInChat = document.querySelectorAll(".gFryU");

        // Check if we're dealing with a "message not found" scenario
        const messageList = document.querySelector(".MibAa");
        const isEmptyOrLoading =
          !messageList || messageList.children.length === 0;

        if (
          menuVisible ||
          nestedContextMenus.length > 0 ||
          messageContextMenu ||
          parentContextMenu ||
          allContextMenusInChat.length > 0
        ) {
          await new Promise((resolve) => setTimeout(resolve, 200));

          // Reset hover state before breaking
          simulateHover(target, false);
          await new Promise((resolve) => setTimeout(resolve, 100));
          break;
        } else if (isEmptyOrLoading) {
          return; // Exit early if no messages to process
        } else {
          simulateHover(target, false);
          const fallbackDelay = STATE.humanLikeDelays
            ? 50 + Math.random() * 100
            : 0;
          await new Promise((resolve) => setTimeout(resolve, fallbackDelay));

          // Check if this was the last target and no context menu appeared
          if (i === hoverTargets.length - 1) {
            const finalContextMenuCheck = document.querySelector(".gFryU");
            if (!finalContextMenuCheck) {
              const remainingMessages = document.querySelectorAll(".T1yt2");
              if (remainingMessages.length === 0) {
                return; // All done
              }
            }
          }

          // Try multiple fallback methods

          // Method 1: Context menu trigger
          const contextMenuTriggered = await triggerContextMenu(target);

          if (contextMenuTriggered) {
            await new Promise((resolve) => setTimeout(resolve, 200));
            break;
          }

          // Method 2: Try clicking on the message first
          const clickEvent = new MouseEvent("click", {
            bubbles: true,
            cancelable: true,
            view: target.ownerDocument.defaultView,
          });
          target.dispatchEvent(clickEvent);
          await new Promise((resolve) => setTimeout(resolve, 100));

          // Method 3: Try different hover targets
          const alternativeTargets = [
            target.querySelector(".KB4Aq"),
            target.querySelector("ul.rbTsq"),
            target.closest(".T1yt2"),
          ].filter(Boolean);

          for (const altTarget of alternativeTargets) {
            if (altTarget && altTarget !== target) {
              simulateHover(altTarget, true);
              await new Promise((resolve) => setTimeout(resolve, 150));

              const altMenuCheck = document.querySelector(".gFryU");
              if (altMenuCheck) {
                await new Promise((resolve) => setTimeout(resolve, 100));
                break;
              }
              simulateHover(altTarget, false);
            }
          }

          // Final check after all methods
          const finalMenuCheck = document.querySelector(".gFryU");
          if (finalMenuCheck) {
            await new Promise((resolve) => setTimeout(resolve, 100));
            break;
          }

          // Check if we've exhausted all messages
          const remainingMessages = document.querySelectorAll(".T1yt2");
          if (remainingMessages.length === 0) {
            return; // Exit early if no messages left
          }
        }
      }
    }
  } catch (error: any) {
    handleError(error, "Manual message hover");
  }
  if (STATE.observerActive) {
    const delays = CONFIG.DELETION_SPEEDS[STATE.deletionSpeed];
    // Wait for DOM to stabilize after deletion
    waitForDOMStabilization(3000).then((stable) => {
      // Clear processed messages after DOM stabilizes to handle Snapchat's DOM recreation
      STATE.processedMessages = new WeakSet<Element>();

      if (stable) {
        setTimeout(() => {
          hoverNextMessage();
        }, delays.messageInteractionDelay);
      } else {
        setTimeout(() => {
          hoverNextMessage();
        }, delays.messageInteractionDelay * 2);
      }
    });
  }
}

async function autoScrollChat(): Promise<void> {
  if (!STATE.autoScrollEnabled || !STATE.observerActive || STATE.isScrolling)
    return;
  const now = Date.now();
  if (now - STATE.lastDeleteTime > CONFIG.AUTO_SCROLL_DELAY) {
    const messages = findMyMessages();
    if (messages.length > 0) {
      STATE.lastDeleteTime = now;
      return;
    }

    STATE.isScrolling = true;
    if (STATE.ui.autoScrollToggleButton) {
      STATE.ui.autoScrollToggleButton.classList.add("scrolling");
    }
    const scrollContainerParent = document.querySelector<HTMLElement>(
      CONFIG.SELECTORS.CHAT_SCROLL_CONTAINER_PARENT_SELECTOR,
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
        await new Promise((resolve) =>
          setTimeout(resolve, CONFIG.SCROLL_INTERVAL),
        );
      }
      await new Promise((resolve) =>
        setTimeout(resolve, CONFIG.LOAD_WAIT_AFTER_SCROLL),
      );
    }
    if (STATE.ui.autoScrollToggleButton) {
      STATE.ui.autoScrollToggleButton.classList.remove("scrolling");
      if (updateUICore.settings?.autoScrollToggleButton)
        updateUICore.settings.autoScrollToggleButton();
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

            if (
              elementNode.matches &&
              elementNode.matches(CONFIG.SELECTORS.DELETE_BUTTON_CANDIDATE)
            ) {
              handlePotentialDeleteButton(
                elementNode as HTMLButtonElement,
              ).catch((err) => handleError(err, "DOM Observer - direct match"));
            }

            // Also check for context menu buttons
            if (
              elementNode.matches &&
              (elementNode.matches(".IxaB_ button") ||
                elementNode.closest(".IxaB_"))
            ) {
              if (elementNode.tagName === "BUTTON") {
                handlePotentialDeleteButton(
                  elementNode as HTMLButtonElement,
                ).catch((err) =>
                  handleError(err, "DOM Observer - context menu button"),
                );
              }
            }

            elementNode
              .querySelectorAll<HTMLButtonElement>(
                CONFIG.SELECTORS.DELETE_BUTTON_CANDIDATE,
              )
              .forEach((btn) => {
                handlePotentialDeleteButton(btn).catch((err) =>
                  handleError(err, "DOM Observer - querySelectorAll"),
                );
              });
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

    // Always start the hover-based deletion logic
    hoverNextMessage().catch((err) =>
      handleError(err, "Initial hoverNextMessage call"),
    );

    // If auto-deletion is enabled, also start the automatic loop
    if (STATE.autoDeletionEnabled) {
      deleteNextMessageAutomatic().catch((err) =>
        handleError(err, "Initial deleteNextMessageAutomatic call"),
      );
    }

    if (STATE.autoScrollEnabled) {
      if (STATE.autoScrollIntervalId) clearInterval(STATE.autoScrollIntervalId);
      STATE.autoScrollIntervalId = window.setInterval(
        autoScrollChat,
        CONFIG.UI_UPDATE_INTERVAL,
      );
    }
    if (STATE.displayUpdateIntervalId)
      clearInterval(STATE.displayUpdateIntervalId);
    STATE.displayUpdateIntervalId = window.setInterval(
      () => deleteCounter.updateDisplay(),
      CONFIG.UI_UPDATE_INTERVAL,
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
    // humanLikeDelays setting is preserved across toggles
  }
  updateUICore.toggleButtonState();
  if (updateUICore.settings) {
    updateUICore.settings.autoDeletionToggleButton();
    updateUICore.settings.deletionSpeedToggleButton();
    updateUICore.settings.orderToggleButton();
    updateUICore.settings.autoScrollToggleButton();
  }
  deleteCounter.updateDisplay();
}

async function initialize(): Promise<void> {
  try {
    deleteCounter = new DeleteCountManager();
    setUIDeleteCounterInstance(deleteCounter);

    await loadPreferences();

    if (typeof GM_addStyle !== "function") {
      handleError(
        new Error("GM_addStyle is not available for injecting styles."),
        "initialize",
      );
    } else {
      injectStyles();
    }

    createPanelUI();
    if (STATE.ui.toggleButton) {
      STATE.ui.toggleButton.addEventListener("click", toggleDeletionProcess);
    } else {
      handleError(
        new Error("Toggle button not found after UI creation."),
        "Initialization",
      );
    }
    setupSnapchatThemeObserver();
  } catch (error: any) {
    handleError(error, "Initialization");
  }
}

if (
  document.readyState === "interactive" ||
  document.readyState === "complete"
) {
  initialize().catch((err) => console.error("Initialization failed:", err));
} else {
  document.addEventListener("DOMContentLoaded", () => {
    initialize().catch((err) =>
      console.error("Initialization failed (DOMContentLoaded):", err),
    );
  });
}

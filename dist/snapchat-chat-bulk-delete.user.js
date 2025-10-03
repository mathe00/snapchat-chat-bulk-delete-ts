// ==UserScript==
// @name         Snapchat Chat Bulk Delete
// @namespace    https://github.com/mathe00/snapchat-chat-bulk-delete-ts
// @version      3.1.5
// @description  Advanced bulk message deletion tool for Snapchat Web. Features theme options, persistent settings, automatic message detection, efficient deletion, auto-scroll, configurable deletion order, and a sleek, modern, minimizable interface. Operates by simulating user interactions.
// @author       mathe00 (Ported by T3 Chat)
// @match        https://web.snapchat.com/*
// @match        https://www.snapchat.com/web/*
// @icon         data:image/png;base64,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
// @grant        GM_addStyle
// @grant        GM_setValue
// @grant        GM_getValue
// @run-at       document-idle
// @license      MIT
// @compatible   firefox Violentmonkey Tampermonkey
// @compatible   chrome Violentmonkey Tampermonkey
// @compatible   edge Violentmonkey Tampermonkey
// @supportURL   https://github.com/mathe00/snapchat-chat-bulk-delete-ts/issues
// @homepageURL  https://github.com/mathe00/snapchat-chat-bulk-delete-ts
// ==/UserScript==


(async function() {
  'use strict';
const INJECTED_LOGO_BASE64 = "data:image/png;base64,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";
// src/config.ts
var CONFIG = {
  SCRIPT_NAME: "Snapchat Chat Bulk Delete",
  VERSION: "3.3.0",
  // Version updated for new feature
  STORAGE_KEYS: {
    REVERSE_ORDER: "scbd_reverse_order_v3_1_5",
    AUTO_SCROLL: "scbd_auto_scroll_v3_1_5",
    UI_POSITION: "scbd_ui_position_v3_1_5",
    THEME_PREFERENCE: "scbd_theme_preference_v3_1_5",
    PANEL_MINIMIZED: "scbd_panel_minimized_v3_1_5",
    AUTO_DELETION: "scbd_auto_deletion_v3_3_0",
    // Changed
    DELETION_SPEED: "scbd_deletion_speed_v3_2_0",
    HUMAN_LIKE_DELAYS: "scbd_human_like_delays_v3_3_0"
  },
  AUTO_SCROLL_DELAY: 5e3,
  MAX_SCROLL_ATTEMPTS: 5,
  SCROLL_INTERVAL: 200,
  LOAD_WAIT_AFTER_SCROLL: 1e3,
  UI_UPDATE_INTERVAL: 1e3,
  SELECTORS: {
    MESSAGE_CONTAINER: ".T1yt2",
    MESSAGE_HEADER_SELECTOR: "header.ryCEc",
    USER_MESSAGE_IDENTIFIER_ELEMENT: ".GUB_w span > span.nonIntl",
    MESSAGE_HOVER_TARGET_1: ".KB4Aq",
    MESSAGE_HOVER_TARGET_2: "ul.rbTsq",
    MESSAGE_HOVER_TARGET_3: ".T1yt2",
    MESSAGE_BUBBLE: ".KB4Aq",
    CONTEXT_MENU: ".gFryU",
    DELETE_BUTTON_CANDIDATE: "button.NcaQH",
    DELETE_BUTTON_SVG_PATH_D: "M9.75 4.624",
    CHAT_SCROLL_CONTAINER_PARENT_SELECTOR: ".T1yt2",
    SNAPCHAT_ROOT_THEME_DARK: ':root[theme="dark"]',
    SNAPCHAT_ROOT_THEME_LIGHT: ':root[theme="light"]'
  },
  THEME_OPTIONS: ["auto", "light", "dark"],
  DEFAULT_THEME: "auto",
  SPEED_OPTIONS: ["slow", "normal", "fast", "insane", "insane_max"],
  DELETION_SPEEDS: {
    slow: { messageInteractionDelay: 1500, postDeleteDelay: 500 },
    normal: { messageInteractionDelay: 1e3, postDeleteDelay: 300 },
    fast: { messageInteractionDelay: 600, postDeleteDelay: 150 },
    insane: { messageInteractionDelay: 300, postDeleteDelay: 75 },
    insane_max: { messageInteractionDelay: 0, postDeleteDelay: 0 }
  }
};

// src/state.ts
var STATE = {
  observerActive: false,
  reverseOrder: true,
  autoScrollEnabled: false,
  autoDeletionEnabled: false,
  // New
  humanLikeDelays: true,
  // New - Enable random delays for human-like behavior
  lastDeleteTime: 0,
  isScrolling: false,
  isDragging: false,
  uiPosition: { x: 20, y: 20 },
  processedButtons: /* @__PURE__ */ new WeakSet(),
  processedMessages: /* @__PURE__ */ new WeakSet(),
  domObserver: null,
  snapchatThemeObserver: null,
  autoScrollIntervalId: null,
  displayUpdateIntervalId: null,
  ui: {
    container: null,
    mainControlsSection: null,
    toggleButton: null,
    counterDisplay: null,
    settingsSection: null,
    orderToggleButton: null,
    autoScrollToggleButton: null,
    themeToggleButton: null,
    autoDeletionToggleButton: null,
    // Changed
    deletionSpeedToggleButton: null,
    humanLikeDelaysToggleButton: null,
    infoSection: null,
    infoLogoImg: null,
    dragHandle: null,
    minimizeButton: null,
    isMinimized: false,
    isInfoVisible: false,
    isSettingsVisible: false,
    versionDisplay: null,
    currentThemeDisplay: null
  },
  themePreference: CONFIG.DEFAULT_THEME,
  currentAppliedTheme: "light",
  deletionSpeed: "normal"
};
function handleError(error, context = "General") {
  console.error(
    `[${CONFIG.SCRIPT_NAME} Error] ${context}: ${error.message}`,
    error.stack || ""
  );
}

// src/domUtils.ts
function simulateHover(element, enter) {
  if (!element) return;
  const eventView = element.ownerDocument.defaultView;
  if (!eventView) {
    handleError(
      new Error("Could not get window context from element"),
      "simulateHover"
    );
    return;
  }
  const eventTypes = enter ? ["mouseenter", "mouseover"] : ["mouseleave", "mouseout"];
  const useHumanDelays = window.STATE?.humanLikeDelays !== false;
  const baseDelay = useHumanDelays && enter ? 100 + Math.random() * 200 : useHumanDelays ? 20 + Math.random() * 40 : 0;
  setTimeout(() => {
    eventTypes.forEach((type, index) => {
      const event = new MouseEvent(type, {
        bubbles: true,
        cancelable: true,
        view: eventView,
        clientX: Math.random() * eventView.innerWidth,
        clientY: Math.random() * eventView.innerHeight
      });
      setTimeout(() => {
        element.dispatchEvent(event);
        let parent = element.parentElement;
        let depth = 0;
        while (parent && depth < 3) {
          parent.dispatchEvent(
            new MouseEvent(type, {
              bubbles: true,
              cancelable: true,
              view: eventView,
              clientX: Math.random() * eventView.innerWidth,
              clientY: Math.random() * eventView.innerHeight
            })
          );
          parent = parent.parentElement;
          depth++;
        }
      }, index * 10);
    });
  }, baseDelay);
}
function triggerContextMenu(element) {
  return new Promise((resolve) => {
    if (!element) {
      resolve(false);
      return;
    }
    const eventView = element.ownerDocument.defaultView;
    if (!eventView) {
      resolve(false);
      return;
    }
    const contextEvent = new MouseEvent("contextmenu", {
      bubbles: true,
      cancelable: true,
      view: eventView,
      clientX: Math.random() * eventView.innerWidth,
      clientY: Math.random() * eventView.innerHeight,
      button: 2
      // Right mouse button
    });
    element.dispatchEvent(contextEvent);
    setTimeout(() => {
      const contextMenu = element.querySelector(".gFryU") || document.querySelector(".gFryU");
      resolve(!!contextMenu);
    }, 300);
  });
}
function waitForDOMStabilization(timeout = 5e3) {
  return new Promise((resolve) => {
    const startTime = Date.now();
    let lastMessageCount = 0;
    let stableCount = 0;
    const checkStability = () => {
      const messages = document.querySelectorAll(".T1yt2");
      const currentCount = messages.length;
      if (currentCount === lastMessageCount) {
        stableCount++;
        if (stableCount >= 3) {
          resolve(true);
          return;
        }
      } else {
        stableCount = 0;
        lastMessageCount = currentCount;
      }
      if (Date.now() - startTime > timeout) {
        resolve(false);
        return;
      }
      setTimeout(checkStability, 100);
    };
    checkStability();
  });
}
function isDeleteButton(button) {
  try {
    const contextMenu = button.closest(CONFIG.SELECTORS.CONTEXT_MENU);
    if (!contextMenu) {
      button.closest(
        '[role="menu"], .menu, [class*="menu"], [class*="context"], .gFryU'
      );
      return false;
    }
    const menu = button.closest(CONFIG.SELECTORS.CONTEXT_MENU);
    if (!menu) return false;
    const allContainers = menu.querySelectorAll(".gPAXk");
    const lastContainer = allContainers[allContainers.length - 1];
    if (!lastContainer) {
      return false;
    }
    const buttonsInLastContainer = lastContainer.querySelectorAll("button.NcaQH");
    if (buttonsInLastContainer[buttonsInLastContainer.length - 1] !== button) {
      return false;
    }
    const svg = button.querySelector("svg");
    if (!svg) return false;
    const path = svg.querySelector("path");
    if (!path) return false;
    const pathData = path.getAttribute("d");
    const isMatch = pathData ? pathData.includes(CONFIG.SELECTORS.DELETE_BUTTON_SVG_PATH_D) : false;
    return isMatch;
  } catch (error) {
    handleError(error, "isDeleteButton check");
    return false;
  }
}
function getSnapchatPageTheme() {
  if (document.documentElement.matches(CONFIG.SELECTORS.SNAPCHAT_ROOT_THEME_DARK)) {
    return "dark";
  }
  if (document.documentElement.matches(CONFIG.SELECTORS.SNAPCHAT_ROOT_THEME_LIGHT)) {
    return "light";
  }
  return "light";
}

// src/gmApi.ts
function setLogoFromBase64(imgElement, base64DataUrl, scriptName, handleErrorFunction) {
  if (!(imgElement instanceof HTMLImageElement)) {
    handleErrorFunction(
      new Error("Invalid element passed to setLogoFromBase64."),
      "Logo Init"
    );
    return;
  }
  imgElement.onerror = function() {
    handleErrorFunction(
      new Error(
        `Image failed to load from base64 data URL. Check if the data URL is correct.`
      ),
      `Logo img.onerror (base64)`
    );
    this.alt = "Error loading logo from base64";
  };
  try {
    imgElement.src = base64DataUrl;
  } catch (error) {
    handleErrorFunction(error, `Logo Set Function (Outer Catch)`);
    imgElement.alt = "Exception loading logo from base64";
  }
}

// src/themeManager.ts
function applyPanelTheme(theme) {
  if (!STATE.ui.container) return;
  STATE.ui.container.classList.remove("theme-light", "theme-dark");
  STATE.ui.container.classList.add(`theme-${theme}`);
  STATE.currentAppliedTheme = theme;
  if (updateUICore.currentThemeDisplay) updateUICore.currentThemeDisplay();
}
function cycleThemePreference() {
  const currentIndex = CONFIG.THEME_OPTIONS.indexOf(STATE.themePreference);
  const nextIndex = (currentIndex + 1) % CONFIG.THEME_OPTIONS.length;
  STATE.themePreference = CONFIG.THEME_OPTIONS[nextIndex];
  if (typeof GM_setValue === "function") {
    try {
      GM_setValue(CONFIG.STORAGE_KEYS.THEME_PREFERENCE, STATE.themePreference);
    } catch (e) {
      handleError(e, "Error saving theme preference");
    }
  } else {
    handleError(
      new Error("GM_setValue is not a function in cycleThemePreference"),
      "GM_setValue Check"
    );
  }
  if (updateUICore.settings?.themeToggleButton)
    updateUICore.settings.themeToggleButton();
  if (STATE.themePreference === "auto") {
    applyPanelTheme(getSnapchatPageTheme());
  } else {
    applyPanelTheme(STATE.themePreference);
  }
}
function setupSnapchatThemeObserver() {
  if (STATE.snapchatThemeObserver) STATE.snapchatThemeObserver.disconnect();
  STATE.snapchatThemeObserver = new MutationObserver(() => {
    if (STATE.themePreference === "auto") {
      applyPanelTheme(getSnapchatPageTheme());
    }
  });
  STATE.snapchatThemeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["theme", "class"]
  });
}

// src/ui.ts
var deleteCounterInstance;
function setUIDeleteCounterInstance(instance) {
  deleteCounterInstance = instance;
}
var updateUICore = {
  toggleButtonState: () => {
    if (!STATE.ui.toggleButton) return;
    const b = STATE.ui.toggleButton;
    const isActive = STATE.observerActive;
    b.textContent = isActive ? "PAUSE" : "START";
    b.classList.toggle("active", isActive);
    b.classList.toggle("inactive", !isActive);
    const pulseStyleId = "scbd-pulse-style";
    const pulseElement = document.getElementById(pulseStyleId);
    if (isActive && !pulseElement) {
      const s = document.createElement("style");
      s.id = pulseStyleId;
      s.textContent = `@keyframes scbdPulse{0%{box-shadow:0 0 0 0 rgba(255,69,0,.7)}70%{box-shadow:0 0 0 10px rgba(255,69,0,0)}100%{box-shadow:0 0 0 0 rgba(255,69,0,0)}} .scbd-button.active{animation:scbdPulse 2s infinite}`;
      document.head.appendChild(s);
    } else if (!isActive && pulseElement) {
      pulseElement.remove();
    }
  },
  uiPosition: () => {
    if (STATE.ui.container && !STATE.ui.isMinimized) {
      STATE.ui.container.style.transform = `translate(${STATE.uiPosition.x}px, ${STATE.uiPosition.y}px)`;
    }
  },
  panelVisibility: () => {
    if (!STATE.ui.container || !STATE.ui.minimizeButton) return;
    const isMinimized = STATE.ui.isMinimized;
    STATE.ui.container.classList.toggle("minimized", isMinimized);
    STATE.ui.minimizeButton.innerHTML = isMinimized ? "&#x2750;" : "&#x2715;";
    STATE.ui.minimizeButton.title = isMinimized ? "Restore Panel" : "Minimize Panel";
    if (isMinimized) {
      if (STATE.ui.infoSection) STATE.ui.infoSection.style.display = "none";
      if (STATE.ui.settingsSection)
        STATE.ui.settingsSection.style.display = "none";
      STATE.ui.isInfoVisible = false;
      STATE.ui.isSettingsVisible = false;
      if (STATE.ui.container) STATE.ui.container.style.transform = "";
    } else {
      if (STATE.ui.infoSection)
        STATE.ui.infoSection.style.display = STATE.ui.isInfoVisible ? "block" : "none";
      if (STATE.ui.settingsSection)
        STATE.ui.settingsSection.style.display = STATE.ui.isSettingsVisible ? "block" : "none";
      updateUICore.uiPosition();
    }
    if (typeof GM_setValue === "function") {
      try {
        GM_setValue(CONFIG.STORAGE_KEYS.PANEL_MINIMIZED, isMinimized);
      } catch (e) {
        handleError(e, "Error calling GM_setValue in panelVisibility");
      }
    } else {
      handleError(
        new Error("GM_setValue is not a function in panelVisibility"),
        "GM_setValue Check"
      );
    }
  },
  toggleSection: (sectionName) => {
    const sectionElement = STATE.ui[`${sectionName}Section`];
    const visibilityFlag = `is${sectionName.charAt(0).toUpperCase() + sectionName.slice(1)}Visible`;
    if (!sectionElement || STATE.ui.isMinimized) return;
    STATE.ui[visibilityFlag] = !STATE.ui[visibilityFlag];
    sectionElement.style.display = STATE.ui[visibilityFlag] ? "block" : "none";
    if (STATE.ui[visibilityFlag]) {
      const otherSectionName = sectionName === "info" ? "settings" : "info";
      const otherSectionElement = STATE.ui[`${otherSectionName}Section`];
      const otherVisibilityFlag = `is${otherSectionName.charAt(0).toUpperCase() + otherSectionName.slice(1)}Visible`;
      if (otherSectionElement && STATE.ui[otherVisibilityFlag]) {
        STATE.ui[otherVisibilityFlag] = false;
        otherSectionElement.style.display = "none";
      }
    }
  },
  settings: {
    orderToggleButton: () => {
      if (!STATE.ui.orderToggleButton) return;
      STATE.ui.orderToggleButton.textContent = STATE.reverseOrder ? "Newest → Oldest" : "Oldest → Newest";
      STATE.ui.orderToggleButton.disabled = STATE.observerActive;
    },
    autoScrollToggleButton: () => {
      if (!STATE.ui.autoScrollToggleButton) return;
      STATE.ui.autoScrollToggleButton.classList.toggle(
        "enabled",
        STATE.autoScrollEnabled
      );
      STATE.ui.autoScrollToggleButton.setAttribute(
        "aria-checked",
        String(STATE.autoScrollEnabled)
      );
      STATE.ui.autoScrollToggleButton.disabled = STATE.observerActive;
    },
    themeToggleButton: () => {
      if (!STATE.ui.themeToggleButton) return;
      const themeName = STATE.themePreference.charAt(0).toUpperCase() + STATE.themePreference.slice(1);
      STATE.ui.themeToggleButton.title = `Theme: ${themeName}`;
      if (updateUICore.currentThemeDisplay) updateUICore.currentThemeDisplay();
    },
    autoDeletionToggleButton: () => {
      if (!STATE.ui.autoDeletionToggleButton) return;
      STATE.ui.autoDeletionToggleButton.classList.toggle(
        "enabled",
        STATE.autoDeletionEnabled
      );
      STATE.ui.autoDeletionToggleButton.setAttribute(
        "aria-checked",
        String(STATE.autoDeletionEnabled)
      );
      STATE.ui.autoDeletionToggleButton.disabled = STATE.observerActive;
    },
    deletionSpeedToggleButton: () => {
      if (!STATE.ui.deletionSpeedToggleButton) return;
      const btn = STATE.ui.deletionSpeedToggleButton;
      const speed = STATE.deletionSpeed;
      btn.textContent = `Speed: ${speed.charAt(0).toUpperCase() + speed.slice(1)}`;
      btn.disabled = STATE.observerActive;
    },
    humanLikeDelaysToggleButton: () => {
      if (!STATE.ui.humanLikeDelaysToggleButton) return;
      STATE.ui.humanLikeDelaysToggleButton.classList.toggle(
        "enabled",
        STATE.humanLikeDelays
      );
      STATE.ui.humanLikeDelaysToggleButton.setAttribute(
        "aria-checked",
        String(STATE.humanLikeDelays)
      );
      STATE.ui.humanLikeDelaysToggleButton.disabled = STATE.observerActive;
    }
  },
  versionDisplay: () => {
    if (STATE.ui.versionDisplay)
      STATE.ui.versionDisplay.textContent = `v${CONFIG.VERSION}`;
  },
  currentThemeDisplay: () => {
    if (STATE.ui.currentThemeDisplay) {
      const themeText = STATE.themePreference === "auto" ? `Auto (${STATE.currentAppliedTheme})` : STATE.themePreference.charAt(0).toUpperCase() + STATE.themePreference.slice(1);
      STATE.ui.currentThemeDisplay.textContent = `Theme: ${themeText}`;
    }
  },
  updateInfoSectionContent: () => {
    if (STATE.ui.infoSection) {
      STATE.ui.infoSection.innerHTML = `<h4>Information</h4>
            <p><strong>${CONFIG.SCRIPT_NAME} v${CONFIG.VERSION}</strong></p>
            <p>Operates by simulating UI clicks. No network requests are modified.
               User's own messages are identified based on their unique appearance in the chat.</p>
            <p>Settings (theme, order, auto-scroll) are saved.</p>
            <div class="scbd-info-logo-container">
                <img id="scbd-info-logo-img" alt="Script Logo" class="scbd-info-logo"/>
            </div>`;
      STATE.ui.infoLogoImg = STATE.ui.infoSection.querySelector(
        "#scbd-info-logo-img"
      );
      if (STATE.ui.infoLogoImg) {
        setLogoFromBase64(
          STATE.ui.infoLogoImg,
          typeof INJECTED_LOGO_BASE64 !== "undefined" ? INJECTED_LOGO_BASE64 : "",
          CONFIG.SCRIPT_NAME,
          handleError
        );
      } else {
        handleError(
          new Error(
            "Could not find #scbd-info-logo-img after setting innerHTML."
          ),
          "Info Logo Setup"
        );
      }
    }
  }
};
function createPanelUI() {
  STATE.ui.container = document.createElement("div");
  STATE.ui.container.id = "scbd-panel-container";
  STATE.ui.dragHandle = document.createElement("div");
  STATE.ui.dragHandle.id = "scbd-drag-handle";
  STATE.ui.container.appendChild(STATE.ui.dragHandle);
  const header = document.createElement("div");
  header.className = "scbd-header";
  const logoImg = document.createElement("img");
  logoImg.alt = "Logo";
  logoImg.className = "scbd-logo";
  setLogoFromBase64(
    logoImg,
    typeof INJECTED_LOGO_BASE64 !== "undefined" ? INJECTED_LOGO_BASE64 : "",
    CONFIG.SCRIPT_NAME,
    handleError
  );
  const title = document.createElement("span");
  title.className = "scbd-title";
  title.textContent = CONFIG.SCRIPT_NAME;
  header.appendChild(logoImg);
  header.appendChild(title);
  const headerControls = document.createElement("div");
  headerControls.className = "scbd-header-controls";
  STATE.ui.themeToggleButton = document.createElement("button");
  STATE.ui.themeToggleButton.className = "scbd-icon-button";
  STATE.ui.themeToggleButton.innerHTML = "🎨";
  STATE.ui.themeToggleButton.title = "Cycle Theme";
  STATE.ui.themeToggleButton.addEventListener("click", (e) => {
    e.stopPropagation();
    cycleThemePreference();
  });
  headerControls.appendChild(STATE.ui.themeToggleButton);
  const settingsButton = document.createElement("button");
  settingsButton.className = "scbd-icon-button";
  settingsButton.innerHTML = "⚙️";
  settingsButton.title = "Settings";
  settingsButton.addEventListener("click", (e) => {
    e.stopPropagation();
    updateUICore.toggleSection("settings");
  });
  headerControls.appendChild(settingsButton);
  const infoButton = document.createElement("button");
  infoButton.className = "scbd-icon-button";
  infoButton.innerHTML = "ℹ️";
  infoButton.title = "Information";
  infoButton.addEventListener("click", (e) => {
    e.stopPropagation();
    updateUICore.toggleSection("info");
  });
  headerControls.appendChild(infoButton);
  STATE.ui.minimizeButton = document.createElement("button");
  STATE.ui.minimizeButton.className = "scbd-icon-button scbd-minimize-btn";
  STATE.ui.minimizeButton.innerHTML = "&#x2715;";
  STATE.ui.minimizeButton.addEventListener("click", (e) => {
    e.stopPropagation();
    STATE.ui.isMinimized = !STATE.ui.isMinimized;
    updateUICore.panelVisibility();
  });
  headerControls.appendChild(STATE.ui.minimizeButton);
  header.appendChild(headerControls);
  STATE.ui.container.appendChild(header);
  const contentArea = document.createElement("div");
  contentArea.className = "scbd-content-area";
  STATE.ui.mainControlsSection = document.createElement("div");
  STATE.ui.mainControlsSection.id = "scbd-main-controls";
  STATE.ui.toggleButton = document.createElement("button");
  STATE.ui.toggleButton.id = "scbd-toggle-button";
  STATE.ui.toggleButton.className = "scbd-button";
  STATE.ui.mainControlsSection.appendChild(STATE.ui.toggleButton);
  STATE.ui.counterDisplay = document.createElement("div");
  STATE.ui.counterDisplay.id = "scbd-counter-display";
  STATE.ui.mainControlsSection.appendChild(STATE.ui.counterDisplay);
  contentArea.appendChild(STATE.ui.mainControlsSection);
  STATE.ui.settingsSection = document.createElement("div");
  STATE.ui.settingsSection.id = "scbd-settings-section";
  STATE.ui.settingsSection.style.display = "none";
  const settingsTitle = document.createElement("h4");
  settingsTitle.textContent = "Settings";
  STATE.ui.settingsSection.appendChild(settingsTitle);
  const deletionSpeedDiv = document.createElement("div");
  deletionSpeedDiv.className = "scbd-setting-row";
  deletionSpeedDiv.innerHTML = `<span>Speed:</span> `;
  STATE.ui.deletionSpeedToggleButton = document.createElement("button");
  STATE.ui.deletionSpeedToggleButton.className = "scbd-setting-button";
  STATE.ui.deletionSpeedToggleButton.addEventListener("click", () => {
    if (STATE.observerActive) return;
    const currentIndex = CONFIG.SPEED_OPTIONS.indexOf(STATE.deletionSpeed);
    const nextIndex = (currentIndex + 1) % CONFIG.SPEED_OPTIONS.length;
    STATE.deletionSpeed = CONFIG.SPEED_OPTIONS[nextIndex];
    if (typeof GM_setValue === "function") {
      try {
        GM_setValue(CONFIG.STORAGE_KEYS.DELETION_SPEED, STATE.deletionSpeed);
      } catch (e) {
        handleError(e, "Error saving deletion speed preference");
      }
    }
    if (updateUICore.settings?.deletionSpeedToggleButton)
      updateUICore.settings.deletionSpeedToggleButton();
  });
  deletionSpeedDiv.appendChild(STATE.ui.deletionSpeedToggleButton);
  STATE.ui.settingsSection.appendChild(deletionSpeedDiv);
  const orderDiv = document.createElement("div");
  orderDiv.className = "scbd-setting-row";
  orderDiv.innerHTML = `<span>Order:</span> `;
  STATE.ui.orderToggleButton = document.createElement("button");
  STATE.ui.orderToggleButton.className = "scbd-setting-button";
  STATE.ui.orderToggleButton.addEventListener("click", () => {
    if (STATE.observerActive) return;
    STATE.reverseOrder = !STATE.reverseOrder;
    if (typeof GM_setValue === "function") {
      try {
        GM_setValue(CONFIG.STORAGE_KEYS.REVERSE_ORDER, STATE.reverseOrder);
      } catch (e) {
        handleError(e, "Error saving order preference");
      }
    }
    if (updateUICore.settings?.orderToggleButton)
      updateUICore.settings.orderToggleButton();
    if (deleteCounterInstance) deleteCounterInstance.updateDisplay();
  });
  orderDiv.appendChild(STATE.ui.orderToggleButton);
  STATE.ui.settingsSection.appendChild(orderDiv);
  const autoDeletionDiv = document.createElement("div");
  autoDeletionDiv.className = "scbd-setting-row";
  const autoDeletionLabel = document.createElement("span");
  autoDeletionLabel.textContent = "Automatic Deletion:";
  autoDeletionDiv.appendChild(autoDeletionLabel);
  STATE.ui.autoDeletionToggleButton = document.createElement("button");
  STATE.ui.autoDeletionToggleButton.className = "scbd-toggle-switch";
  STATE.ui.autoDeletionToggleButton.setAttribute("role", "switch");
  STATE.ui.autoDeletionToggleButton.addEventListener("click", () => {
    if (STATE.observerActive) return;
    STATE.autoDeletionEnabled = !STATE.autoDeletionEnabled;
    if (typeof GM_setValue === "function") {
      try {
        GM_setValue(
          CONFIG.STORAGE_KEYS.AUTO_DELETION,
          STATE.autoDeletionEnabled
        );
      } catch (e) {
        handleError(e, "Error saving auto-deletion preference");
      }
    }
    if (updateUICore.settings?.autoDeletionToggleButton)
      updateUICore.settings.autoDeletionToggleButton();
  });
  autoDeletionDiv.appendChild(STATE.ui.autoDeletionToggleButton);
  STATE.ui.settingsSection.appendChild(autoDeletionDiv);
  const autoScrollDiv = document.createElement("div");
  autoScrollDiv.className = "scbd-setting-row";
  const autoScrollLabel = document.createElement("span");
  autoScrollLabel.textContent = "Auto-Scroll:";
  autoScrollDiv.appendChild(autoScrollLabel);
  STATE.ui.autoScrollToggleButton = document.createElement("button");
  STATE.ui.autoScrollToggleButton.className = "scbd-toggle-switch";
  STATE.ui.autoScrollToggleButton.setAttribute("role", "switch");
  STATE.ui.autoScrollToggleButton.setAttribute(
    "aria-checked",
    String(STATE.autoScrollEnabled)
  );
  STATE.ui.autoScrollToggleButton.addEventListener("click", () => {
    if (STATE.observerActive) return;
    STATE.autoScrollEnabled = !STATE.autoScrollEnabled;
    if (typeof GM_setValue === "function") {
      try {
        GM_setValue(CONFIG.STORAGE_KEYS.AUTO_SCROLL, STATE.autoScrollEnabled);
      } catch (e) {
        handleError(e, "Error saving auto-scroll preference");
      }
    }
    if (updateUICore.settings?.autoScrollToggleButton)
      updateUICore.settings.autoScrollToggleButton();
    if (deleteCounterInstance) deleteCounterInstance.updateDisplay();
  });
  autoScrollDiv.appendChild(STATE.ui.autoScrollToggleButton);
  STATE.ui.settingsSection.appendChild(autoScrollDiv);
  const humanLikeDelaysDiv = document.createElement("div");
  humanLikeDelaysDiv.className = "scbd-setting-row";
  const humanLikeDelaysLabel = document.createElement("span");
  humanLikeDelaysLabel.textContent = "Human-like Delays:";
  humanLikeDelaysDiv.appendChild(humanLikeDelaysLabel);
  STATE.ui.humanLikeDelaysToggleButton = document.createElement("button");
  STATE.ui.humanLikeDelaysToggleButton.className = "scbd-toggle-switch";
  STATE.ui.humanLikeDelaysToggleButton.setAttribute("role", "switch");
  STATE.ui.humanLikeDelaysToggleButton.addEventListener("click", () => {
    if (STATE.observerActive) return;
    STATE.humanLikeDelays = !STATE.humanLikeDelays;
    if (typeof GM_setValue === "function") {
      try {
        GM_setValue(
          CONFIG.STORAGE_KEYS.HUMAN_LIKE_DELAYS,
          STATE.humanLikeDelays
        );
      } catch (e) {
        handleError(e, "Error saving human-like delays preference");
      }
    }
    if (updateUICore.settings?.humanLikeDelaysToggleButton)
      updateUICore.settings.humanLikeDelaysToggleButton();
  });
  humanLikeDelaysDiv.appendChild(STATE.ui.humanLikeDelaysToggleButton);
  STATE.ui.settingsSection.appendChild(humanLikeDelaysDiv);
  contentArea.appendChild(STATE.ui.settingsSection);
  STATE.ui.infoSection = document.createElement("div");
  STATE.ui.infoSection.id = "scbd-info-section";
  STATE.ui.infoSection.style.display = "none";
  if (updateUICore.updateInfoSectionContent)
    updateUICore.updateInfoSectionContent();
  contentArea.appendChild(STATE.ui.infoSection);
  STATE.ui.container.appendChild(contentArea);
  const footer = document.createElement("div");
  footer.className = "scbd-footer";
  STATE.ui.currentThemeDisplay = document.createElement("span");
  STATE.ui.currentThemeDisplay.id = "scbd-current-theme";
  footer.appendChild(STATE.ui.currentThemeDisplay);
  STATE.ui.versionDisplay = document.createElement("span");
  STATE.ui.versionDisplay.id = "scbd-version";
  footer.appendChild(STATE.ui.versionDisplay);
  STATE.ui.container.appendChild(footer);
  document.body.appendChild(STATE.ui.container);
  STATE.ui.container.addEventListener("click", (e) => {
    if (STATE.ui.isMinimized && e.target === STATE.ui.container) {
      STATE.ui.isMinimized = false;
      updateUICore.panelVisibility();
    }
  });
  setupDragAndDrop();
  updateUICore.toggleButtonState();
  if (updateUICore.settings) {
    updateUICore.settings.autoDeletionToggleButton();
    updateUICore.settings.deletionSpeedToggleButton();
    updateUICore.settings.orderToggleButton();
    updateUICore.settings.autoScrollToggleButton();
    updateUICore.settings.humanLikeDelaysToggleButton();
    updateUICore.settings.themeToggleButton();
  }
  if (updateUICore.versionDisplay) updateUICore.versionDisplay();
  if (updateUICore.currentThemeDisplay) updateUICore.currentThemeDisplay();
  if (deleteCounterInstance) deleteCounterInstance.updateDisplay();
  if (STATE.themePreference === "auto") {
    applyPanelTheme(getSnapchatPageTheme());
  } else {
    applyPanelTheme(STATE.themePreference);
  }
  updateUICore.panelVisibility();
}
function setupDragAndDrop() {
  let initialX, initialY;
  function dragStart(e) {
    if (e.target === STATE.ui.dragHandle && STATE.ui.container && !STATE.ui.isMinimized) {
      initialX = e.clientX - STATE.uiPosition.x;
      initialY = e.clientY - STATE.uiPosition.y;
      STATE.isDragging = true;
      document.body.classList.add("scbd-dragging");
      if (STATE.ui.container)
        STATE.ui.container.classList.add("scbd-dragging-panel");
      document.addEventListener("mousemove", dragMove);
      document.addEventListener("mouseup", dragEnd);
    }
  }
  function dragMove(e) {
    if (STATE.isDragging && STATE.ui.container) {
      e.preventDefault();
      const newX = e.clientX - initialX;
      const newY = e.clientY - initialY;
      const rect = STATE.ui.container.getBoundingClientRect();
      STATE.uiPosition.x = Math.min(
        window.innerWidth - rect.width - 5,
        Math.max(5, newX)
      );
      STATE.uiPosition.y = Math.min(
        window.innerHeight - rect.height - 5,
        Math.max(5, newY)
      );
      updateUICore.uiPosition();
    }
  }
  function dragEnd() {
    if (!STATE.isDragging) return;
    STATE.isDragging = false;
    document.body.classList.remove("scbd-dragging");
    if (STATE.ui.container) {
      STATE.ui.container.classList.remove("scbd-dragging-panel");
    }
    document.removeEventListener("mousemove", dragMove);
    document.removeEventListener("mouseup", dragEnd);
    if (typeof GM_setValue === "function") {
      try {
        GM_setValue(CONFIG.STORAGE_KEYS.UI_POSITION, STATE.uiPosition);
      } catch (e) {
        handleError(e, "Error calling GM_setValue in dragEnd");
      }
    }
  }
  if (STATE.ui.container) {
    STATE.ui.container.addEventListener(
      "mousedown",
      dragStart
    );
  }
}
function injectStyles() {
  if (typeof GM_addStyle === "function") {
    GM_addStyle(`
      body.scbd-dragging, body.scbd-dragging * { user-select: none !important; cursor: grabbing !important; }
      #scbd-panel-container.scbd-dragging-panel, #scbd-panel-container.scbd-dragging-panel * { cursor: grabbing !important; }
      #scbd-panel-container {
        position: fixed; top: 0; left: 0; z-index: 100000;
        border-radius: 10px; box-shadow: 0 8px 25px rgba(0,0,0,0.2);
        display: flex; flex-direction: column; gap: 8px;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        min-width: 260px; max-width: 320px;
        padding: 10px;
        transition: transform 0.25s ease-out, opacity 0.25s ease-out, width 0.25s ease-out, height 0.25s ease-out, bottom 0.25s ease-out, right 0.25s ease-out;
        overflow: hidden;
      }
      #scbd-panel-container.theme-light { background-color: rgba(255,255,255,0.85); color: #333; border: 1px solid rgba(0,0,0,0.1); }
      #scbd-panel-container.theme-dark  { background-color: rgba(40,40,40,0.9); color: #eee; border: 1px solid rgba(255,255,255,0.15); }
      #scbd-panel-container.minimized {
        width: 44px !important; height: 44px !important; padding: 0 !important;
        border-radius: 50%; opacity: 0.7;
        bottom: 20px; right: 20px; top: auto !important; left: auto !important; transform: none !important;
        cursor: pointer; display: flex; align-items: center; justify-content: center;
      }
      #scbd-panel-container.minimized:hover { opacity: 1; }
      #scbd-panel-container.minimized .scbd-header-controls .scbd-minimize-btn { font-size: 20px; }
      #scbd-panel-container.minimized > *:not(.scbd-header),
      #scbd-panel-container.minimized .scbd-header > *:not(.scbd-header-controls),
      #scbd-panel-container.minimized .scbd-header-controls > *:not(.scbd-minimize-btn) { display: none !important; }

      #scbd-drag-handle { position: absolute; top: 0; left: 0; right: 0; height: 30px; cursor: move; z-index: 1; }
      .scbd-header { display: flex; align-items: center; gap: 8px; padding-bottom: 5px; border-bottom: 1px solid; position: relative; z-index: 2; }
      .theme-light .scbd-header { border-bottom-color: rgba(0,0,0,0.1); }
      .theme-dark .scbd-header { border-bottom-color: rgba(255,255,255,0.1); }
      .scbd-logo { width: 18px; height: 18px; object-fit: contain; display: inline-block; vertical-align: middle; }
      .scbd-title { font-weight: bold; font-size: 13px; flex-grow: 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
      .scbd-header-controls { display: flex; align-items: center; gap: 4px; margin-left: auto; }
      .scbd-icon-button { background: transparent; border: none; cursor: pointer; font-size: 16px; padding: 4px; border-radius: 4px; transition: background-color 0.2s; line-height: 1; }
      .theme-light .scbd-icon-button { color: #555; } .theme-dark .scbd-icon-button { color: #bbb; }
      .theme-light .scbd-icon-button:hover { background-color: rgba(0,0,0,0.08); }
      .theme-dark .scbd-icon-button:hover { background-color: rgba(255,255,255,0.1); }
      .scbd-minimize-btn { font-weight: bold; }

      .scbd-content-area { display: flex; flex-direction: column; gap: 8px; }
      #scbd-main-controls { display: flex; flex-direction: column; gap: 8px; }
      #scbd-toggle-button { padding: 10px 15px; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; font-size: 14px; transition: background-color 0.2s, color 0.2s, box-shadow 0.2s; }
      #scbd-toggle-button.inactive.theme-light { background-color: #FFFC00; color: black; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
      #scbd-toggle-button.inactive.theme-dark { background-color: #FFFC00; color: black; box-shadow: 0 2px 4px rgba(0,0,0,0.3); }
      #scbd-toggle-button.active { background-color: #FF4500; color: white; box-shadow: 0 2px 4px rgba(255,69,0,0.3); }
      #scbd-counter-display { font-size: 11px; text-align: center; opacity: 0.8; line-height: 1.4; }
      .theme-light #scbd-counter-display { color: #444; } .theme-dark #scbd-counter-display { color: #ccc; }

      #scbd-settings-section, #scbd-info-section { padding: 10px; border-radius: 6px; font-size: 12px; line-height: 1.5; animation: scbd-fade-in 0.3s ease-out; }
      .theme-light #scbd-settings-section, .theme-light #scbd-info-section { background-color: rgba(0,0,0,0.03); border: 1px solid rgba(0,0,0,0.07); }
      .theme-dark #scbd-settings-section, .theme-dark #scbd-info-section { background-color: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); }
      #scbd-settings-section h4, #scbd-info-section h4 { margin-top: 0; margin-bottom: 8px; font-size: 13px; opacity: 0.9; }
      .scbd-setting-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; gap: 8px; }
      .scbd-setting-row > span { flex-shrink: 0; font-size: 12px; opacity: 0.9;}
      .scbd-setting-button { font-size: 11px; padding: 5px 10px; border-radius: 5px; border: 1px solid; cursor: pointer; transition: background-color 0.2s, border-color 0.2s; min-width: 110px; text-align: center; }
      .theme-light .scbd-setting-button { background-color: #f0f0f0; border-color: #ddd; color: #333; }
      .theme-dark .scbd-setting-button { background-color: #383838; border-color: #555; color: #ddd; }
      .theme-light .scbd-setting-button:hover { background-color: #e0e0e0; border-color: #ccc; }
      .theme-dark .scbd-setting-button:hover { background-color: #484848; border-color: #666; }
      .scbd-setting-button:disabled { opacity: 0.5; cursor: not-allowed; }

      .scbd-toggle-switch {
        position: relative; display: inline-block; width: 40px; height: 20px;
        background-color: #ccc; border-radius: 20px; cursor: pointer;
        transition: background-color 0.3s ease;
      }
      .scbd-toggle-switch::before {
        content: ""; position: absolute;
        width: 16px; height: 16px; border-radius: 50%;
        background-color: white; top: 2px; left: 2px;
        transition: transform 0.3s ease;
      }
      .scbd-toggle-switch.enabled { background-color: #4CAF50; }
      .theme-dark .scbd-toggle-switch.enabled { background-color: #66BB6A; }
      .theme-dark .scbd-toggle-switch { background-color: #555; }
      .scbd-toggle-switch.enabled::before { transform: translateX(20px); }
      .scbd-toggle-switch:disabled { opacity: 0.5; cursor: not-allowed; }
      .scbd-toggle-switch.scrolling {
        animation: scbd-pulse-scroll 1s infinite alternate;
      }
      @keyframes scbd-pulse-scroll { from { box-shadow: 0 0 0 0px rgba(76, 175, 80, 0.7); } to { box-shadow: 0 0 0 5px rgba(76, 175, 80, 0); } }

      .scbd-info-logo-container { text-align: center; margin-top: 15px; }
      .scbd-info-logo { max-width: 64px; max-height: 64px; object-fit: contain; display: block; margin: 0 auto; opacity: 0.8; }

      .scbd-footer { display: flex; justify-content: space-between; align-items: center; padding-top: 5px; border-top: 1px solid; font-size: 10px; opacity: 0.6; }
      #scbd-current-theme { text-align: left; } #scbd-version { text-align: right; }
      .theme-light .scbd-footer { border-top-color: rgba(0,0,0,0.1); }
      .theme-dark .scbd-footer { border-top-color: rgba(255,255,255,0.1); }

      @keyframes scbd-fade-in { from { opacity: 0; transform: translateY(-5px); } to { opacity: 1; transform: translateY(0); } }
    `);
  }
}

// src/deleteCounter.ts
var DeleteCountManager = class {
  counters;
  currentChatId;
  constructor() {
    this.counters = { total: 0, chats: {} };
    this.currentChatId = this.extractChatId();
    this.setupUrlMonitoring();
    this.updateDisplay();
  }
  extractChatId() {
    const match = window.location.pathname.match(/\/([^/]+)$/);
    return match ? match[1] : "unknown_chat";
  }
  setupUrlMonitoring() {
    setInterval(() => {
      const newChatId = this.extractChatId();
      if (newChatId !== this.currentChatId) {
        this.currentChatId = newChatId;
        this.updateDisplay();
      }
    }, CONFIG.UI_UPDATE_INTERVAL);
  }
  async increment() {
    if (!this.counters.chats[this.currentChatId]) {
      this.counters.chats[this.currentChatId] = 0;
    }
    this.counters.chats[this.currentChatId]++;
    this.counters.total++;
    this.updateDisplay();
  }
  updateDisplay() {
    if (STATE.ui.counterDisplay) {
      const currentChatCount = this.counters.chats[this.currentChatId] || 0;
      const timeUntilScroll = STATE.autoScrollEnabled && STATE.observerActive ? Math.max(
        0,
        Math.ceil(
          (CONFIG.AUTO_SCROLL_DELAY - (Date.now() - STATE.lastDeleteTime)) / 1e3
        )
      ) : "-";
      STATE.ui.counterDisplay.innerHTML = `<div>Chat: ${currentChatCount}</div><div>Total: ${this.counters.total}</div><div>Next scroll: ${timeUntilScroll}s</div>`;
    }
  }
  resetCurrentChatCounter() {
    this.counters.chats[this.currentChatId] = 0;
    this.updateDisplay();
  }
  resetAllCounters() {
    this.counters = { total: 0, chats: {} };
    this.updateDisplay();
  }
};

// src/main.ts
var deleteCounter;
async function loadPreferences() {
  try {
    if (typeof GM_getValue !== "function") {
      handleError(
        new Error("GM_getValue is not available for loading preferences."),
        "loadPreferences"
      );
      STATE.reverseOrder = true;
      STATE.autoScrollEnabled = false;
      STATE.autoDeletionEnabled = false;
      STATE.uiPosition = { x: 20, y: 20 };
      STATE.themePreference = CONFIG.DEFAULT_THEME;
      STATE.ui.isMinimized = false;
      STATE.deletionSpeed = "normal";
      return;
    }
    STATE.reverseOrder = await GM_getValue(
      CONFIG.STORAGE_KEYS.REVERSE_ORDER,
      true
    );
    STATE.autoScrollEnabled = await GM_getValue(
      CONFIG.STORAGE_KEYS.AUTO_SCROLL,
      false
    );
    STATE.autoDeletionEnabled = await GM_getValue(
      CONFIG.STORAGE_KEYS.AUTO_DELETION,
      false
    );
    const storedPosition = await GM_getValue(
      CONFIG.STORAGE_KEYS.UI_POSITION
    );
    STATE.uiPosition = storedPosition || { x: 20, y: 20 };
    STATE.themePreference = await GM_getValue(
      CONFIG.STORAGE_KEYS.THEME_PREFERENCE,
      CONFIG.DEFAULT_THEME
    );
    STATE.ui.isMinimized = await GM_getValue(
      CONFIG.STORAGE_KEYS.PANEL_MINIMIZED,
      false
    );
    STATE.deletionSpeed = await GM_getValue(
      CONFIG.STORAGE_KEYS.DELETION_SPEED,
      "normal"
    );
    STATE.humanLikeDelays = await GM_getValue(
      CONFIG.STORAGE_KEYS.HUMAN_LIKE_DELAYS,
      true
    );
  } catch (error) {
    handleError(error, "Loading preferences");
    STATE.reverseOrder = true;
    STATE.autoScrollEnabled = false;
    STATE.autoDeletionEnabled = false;
    STATE.uiPosition = { x: 20, y: 20 };
    STATE.themePreference = CONFIG.DEFAULT_THEME;
    STATE.ui.isMinimized = false;
    STATE.deletionSpeed = "normal";
    STATE.humanLikeDelays = true;
  }
}
async function handlePotentialDeleteButton(button) {
  if (STATE.processedButtons.has(button)) return;
  try {
    if (isDeleteButton(button)) {
      const delays = CONFIG.DELETION_SPEEDS[STATE.deletionSpeed];
      STATE.processedButtons.add(button);
      button.click();
      STATE.lastDeleteTime = Date.now();
      await deleteCounter.increment();
      await new Promise(
        (resolve) => setTimeout(resolve, delays.postDeleteDelay)
      );
    }
  } catch (error) {
    handleError(error, "Processing delete button");
  }
}
function findMyMessages() {
  const allMessages = document.querySelectorAll(
    CONFIG.SELECTORS.MESSAGE_CONTAINER
  );
  const myMessages = Array.from(allMessages).filter((msgContainer) => {
    const header = msgContainer.querySelector(
      CONFIG.SELECTORS.MESSAGE_HEADER_SELECTOR
    );
    if (!header) return false;
    const isUserMessage = !!header.querySelector(
      CONFIG.SELECTORS.USER_MESSAGE_IDENTIFIER_ELEMENT
    );
    const isProcessed = STATE.processedMessages.has(msgContainer);
    return isUserMessage && !isProcessed;
  });
  return myMessages;
}
async function deleteNextMessageAutomatic() {
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
      const messageBubble = message.querySelector(
        CONFIG.SELECTORS.MESSAGE_BUBBLE
      );
      if (messageBubble) {
        const eventView = messageBubble.ownerDocument.defaultView;
        if (!eventView) {
          handleError(
            new Error("Could not get window context from message bubble."),
            "deleteNextMessageAutomatic"
          );
          return;
        }
        const mousedownEvent = new MouseEvent("mousedown", {
          bubbles: true,
          cancelable: true,
          view: eventView,
          button: 0,
          buttons: 1
        });
        messageBubble.dispatchEvent(mousedownEvent);
        await new Promise((resolve) => setTimeout(resolve, 200));
        const mouseupEvent = new MouseEvent("mouseup", {
          bubbles: true,
          cancelable: true,
          view: eventView,
          button: 0
        });
        messageBubble.dispatchEvent(mouseupEvent);
        await new Promise(
          (resolve) => setTimeout(resolve, delays.messageInteractionDelay)
        );
        if (!document.querySelector(CONFIG.SELECTORS.CONTEXT_MENU)) {
        }
      } else {
        handleError(
          new Error("Could not find message bubble to click."),
          "deleteNextMessageAutomatic"
        );
      }
    }
  } catch (error) {
    handleError(error, "Automatic message deletion loop");
  }
  if (STATE.observerActive && STATE.autoDeletionEnabled) {
    const delays = CONFIG.DELETION_SPEEDS[STATE.deletionSpeed];
    const baseDelay = delays.messageInteractionDelay * 2;
    const humanDelay = STATE.humanLikeDelays ? Math.random() * 1e3 + 500 : 0;
    const randomDelay = baseDelay + humanDelay;
    setTimeout(deleteNextMessageAutomatic, randomDelay);
  }
}
async function hoverNextMessage() {
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
      const hoverTargets = [
        message.querySelector(CONFIG.SELECTORS.MESSAGE_HOVER_TARGET_1),
        message.querySelector(CONFIG.SELECTORS.MESSAGE_HOVER_TARGET_2),
        message.querySelector(CONFIG.SELECTORS.MESSAGE_HOVER_TARGET_3),
        message
      ].filter(Boolean);
      for (let i = 0; i < hoverTargets.length; i++) {
        const target = hoverTargets[i];
        if (!STATE.observerActive || !target) break;
        simulateHover(target, true);
        await new Promise(
          (resolve) => setTimeout(resolve, delays.messageInteractionDelay)
        );
        const contextMenuEvent = new MouseEvent("contextmenu", {
          bubbles: true,
          cancelable: true,
          view: target.ownerDocument.defaultView,
          button: 2,
          // Right click
          buttons: 2
        });
        target.dispatchEvent(contextMenuEvent);
        await new Promise((resolve) => setTimeout(resolve, 100));
        const menuVisible = !!document.querySelector(
          CONFIG.SELECTORS.CONTEXT_MENU
        );
        const nestedContextMenus = document.querySelectorAll(
          ".KB4Aq .gFryU, .T1yt2 .gFryU"
        );
        const messageContextMenu = message.querySelector(".gFryU");
        const parentContextMenu = message.closest(".gFryU");
        const allContextMenusInChat = document.querySelectorAll(".gFryU");
        const messageList = document.querySelector(".MibAa");
        const isEmptyOrLoading = !messageList || messageList.children.length === 0;
        if (menuVisible || nestedContextMenus.length > 0 || messageContextMenu || parentContextMenu || allContextMenusInChat.length > 0) {
          await new Promise((resolve) => setTimeout(resolve, 200));
          simulateHover(target, false);
          await new Promise((resolve) => setTimeout(resolve, 100));
          break;
        } else if (isEmptyOrLoading) {
          return;
        } else {
          simulateHover(target, false);
          const fallbackDelay = STATE.humanLikeDelays ? 50 + Math.random() * 100 : 0;
          await new Promise((resolve) => setTimeout(resolve, fallbackDelay));
          if (i === hoverTargets.length - 1) {
            const finalContextMenuCheck = document.querySelector(".gFryU");
            if (!finalContextMenuCheck) {
              const remainingMessages2 = document.querySelectorAll(".T1yt2");
              if (remainingMessages2.length === 0) {
                return;
              }
            }
          }
          const contextMenuTriggered = await triggerContextMenu(target);
          if (contextMenuTriggered) {
            await new Promise((resolve) => setTimeout(resolve, 200));
            break;
          }
          const clickEvent = new MouseEvent("click", {
            bubbles: true,
            cancelable: true,
            view: target.ownerDocument.defaultView
          });
          target.dispatchEvent(clickEvent);
          await new Promise((resolve) => setTimeout(resolve, 100));
          const alternativeTargets = [
            target.querySelector(".KB4Aq"),
            target.querySelector("ul.rbTsq"),
            target.closest(".T1yt2")
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
          const finalMenuCheck = document.querySelector(".gFryU");
          if (finalMenuCheck) {
            await new Promise((resolve) => setTimeout(resolve, 100));
            break;
          }
          const remainingMessages = document.querySelectorAll(".T1yt2");
          if (remainingMessages.length === 0) {
            return;
          }
        }
      }
    }
  } catch (error) {
    handleError(error, "Manual message hover");
  }
  if (STATE.observerActive) {
    const delays = CONFIG.DELETION_SPEEDS[STATE.deletionSpeed];
    waitForDOMStabilization(3e3).then((stable) => {
      STATE.processedMessages = /* @__PURE__ */ new WeakSet();
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
async function autoScrollChat() {
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
    const scrollContainerParent = document.querySelector(
      CONFIG.SELECTORS.CHAT_SCROLL_CONTAINER_PARENT_SELECTOR
    );
    let chatContainer = null;
    if (scrollContainerParent) {
      let currentElement = scrollContainerParent;
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
        await new Promise(
          (resolve) => setTimeout(resolve, CONFIG.SCROLL_INTERVAL)
        );
      }
      await new Promise(
        (resolve) => setTimeout(resolve, CONFIG.LOAD_WAIT_AFTER_SCROLL)
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
function setupDomObserver() {
  if (STATE.domObserver) STATE.domObserver.disconnect();
  STATE.domObserver = new MutationObserver((mutations) => {
    if (!STATE.observerActive) return;
    for (const mutation of mutations) {
      if (mutation.type === "childList") {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const elementNode = node;
            if (elementNode.matches && elementNode.matches(CONFIG.SELECTORS.DELETE_BUTTON_CANDIDATE)) {
              handlePotentialDeleteButton(
                elementNode
              ).catch((err) => handleError(err, "DOM Observer - direct match"));
            }
            if (elementNode.matches && (elementNode.matches(".IxaB_ button") || elementNode.closest(".IxaB_"))) {
              if (elementNode.tagName === "BUTTON") {
                handlePotentialDeleteButton(
                  elementNode
                ).catch(
                  (err) => handleError(err, "DOM Observer - context menu button")
                );
              }
            }
            elementNode.querySelectorAll(
              CONFIG.SELECTORS.DELETE_BUTTON_CANDIDATE
            ).forEach((btn) => {
              handlePotentialDeleteButton(btn).catch(
                (err) => handleError(err, "DOM Observer - querySelectorAll")
              );
            });
          }
        });
      }
    }
  });
  STATE.domObserver.observe(document.body, { childList: true, subtree: true });
}
function toggleDeletionProcess() {
  STATE.observerActive = !STATE.observerActive;
  if (STATE.observerActive) {
    STATE.lastDeleteTime = Date.now();
    setupDomObserver();
    hoverNextMessage().catch(
      (err) => handleError(err, "Initial hoverNextMessage call")
    );
    if (STATE.autoDeletionEnabled) {
      deleteNextMessageAutomatic().catch(
        (err) => handleError(err, "Initial deleteNextMessageAutomatic call")
      );
    }
    if (STATE.autoScrollEnabled) {
      if (STATE.autoScrollIntervalId) clearInterval(STATE.autoScrollIntervalId);
      STATE.autoScrollIntervalId = window.setInterval(
        autoScrollChat,
        CONFIG.UI_UPDATE_INTERVAL
      );
    }
    if (STATE.displayUpdateIntervalId)
      clearInterval(STATE.displayUpdateIntervalId);
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
    STATE.processedMessages = /* @__PURE__ */ new WeakSet();
    STATE.processedButtons = /* @__PURE__ */ new WeakSet();
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
async function initialize() {
  try {
    deleteCounter = new DeleteCountManager();
    setUIDeleteCounterInstance(deleteCounter);
    await loadPreferences();
    if (typeof GM_addStyle !== "function") {
      handleError(
        new Error("GM_addStyle is not available for injecting styles."),
        "initialize"
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
        "Initialization"
      );
    }
    setupSnapchatThemeObserver();
  } catch (error) {
    handleError(error, "Initialization");
  }
}
if (document.readyState === "interactive" || document.readyState === "complete") {
  initialize().catch((err) => console.error("Initialization failed:", err));
} else {
  document.addEventListener("DOMContentLoaded", () => {
    initialize().catch(
      (err) => console.error("Initialization failed (DOMContentLoaded):", err)
    );
  });
}

})();

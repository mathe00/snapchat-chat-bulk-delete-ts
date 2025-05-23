// src/ui.ts
import { CONFIG } from './config';
import { STATE, handleError } from './state';
import { loadLogoViaGM } from './gmApi';
import { cycleThemePreference, applyPanelTheme } from './themeManager';
import { getSnapchatPageTheme } from './domUtils';
import type { ThemeOption, AppliedTheme, UIStateElements } from './types';
import { DeleteCountManager } from './deleteCounter';

// --- GM Function Declarations for this module ---
declare const GM_addStyle: (css: string) => HTMLStyleElement;
declare const GM_setValue: (key: string, value: any) => void; // GM_setValue typically returns void
// --- End GM Function Declarations ---

let deleteCounterInstance: DeleteCountManager;
export function setUIDeleteCounterInstance(instance: DeleteCountManager) {
    deleteCounterInstance = instance;
}

export const updateUICore = {
  toggleButtonState: () => {
    if (!STATE.ui.toggleButton) return;
    const b = STATE.ui.toggleButton;
    const isActive = STATE.observerActive;
    b.textContent = isActive ? "PAUSE" : "START";
    b.classList.toggle("active", isActive);
    b.classList.toggle("inactive", !isActive);

    const pulseStyleId = "scbd-pulse-style";
    let pulseElement = document.getElementById(pulseStyleId);
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
      if (STATE.ui.infoSection) STATE.ui.infoSection.style.display = 'none';
      if (STATE.ui.settingsSection) STATE.ui.settingsSection.style.display = 'none';
      STATE.ui.isInfoVisible = false;
      STATE.ui.isSettingsVisible = false;
      if (STATE.ui.container) STATE.ui.container.style.transform = '';
    } else {
      if (STATE.ui.infoSection) STATE.ui.infoSection.style.display = STATE.ui.isInfoVisible ? 'block' : 'none';
      if (STATE.ui.settingsSection) STATE.ui.settingsSection.style.display = STATE.ui.isSettingsVisible ? 'block' : 'none';
      updateUICore.uiPosition();
    }

    if (typeof GM_setValue === 'function') {
        try {
            GM_setValue(CONFIG.STORAGE_KEYS.PANEL_MINIMIZED, isMinimized);
        } catch (e: any) {
            handleError(e, "Error calling GM_setValue in panelVisibility");
        }
    } else {
        handleError(new Error("GM_setValue is not a function in panelVisibility"), "GM_setValue Check");
    }
  },
  toggleSection: (sectionName: 'info' | 'settings') => {
    const sectionElement = STATE.ui[`${sectionName}Section`];
    const visibilityFlag: 'isInfoVisible' | 'isSettingsVisible' =
        `is${sectionName.charAt(0).toUpperCase() + sectionName.slice(1)}Visible` as 'isInfoVisible' | 'isSettingsVisible';

    if (!sectionElement || STATE.ui.isMinimized) return;

    STATE.ui[visibilityFlag] = !STATE.ui[visibilityFlag];
    sectionElement.style.display = STATE.ui[visibilityFlag] ? 'block' : 'none';

    if (STATE.ui[visibilityFlag]) {
      const otherSectionName = sectionName === 'info' ? 'settings' : 'info';
      const otherSectionElement = STATE.ui[`${otherSectionName}Section`];
      const otherVisibilityFlag: 'isInfoVisible' | 'isSettingsVisible' =
        `is${otherSectionName.charAt(0).toUpperCase() + otherSectionName.slice(1)}Visible` as 'isInfoVisible' | 'isSettingsVisible';

      if (otherSectionElement && STATE.ui[otherVisibilityFlag]) {
        STATE.ui[otherVisibilityFlag] = false;
        otherSectionElement.style.display = 'none';
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
      STATE.ui.autoScrollToggleButton.classList.toggle("enabled", STATE.autoScrollEnabled);
      STATE.ui.autoScrollToggleButton.setAttribute('aria-checked', String(STATE.autoScrollEnabled));
      STATE.ui.autoScrollToggleButton.disabled = STATE.observerActive;
    },
    themeToggleButton: () => {
      if (!STATE.ui.themeToggleButton) return;
      const themeName = STATE.themePreference.charAt(0).toUpperCase() + STATE.themePreference.slice(1);
      STATE.ui.themeToggleButton.title = `Theme: ${themeName}`;
      if (updateUICore.currentThemeDisplay) updateUICore.currentThemeDisplay();
    },
  },
  versionDisplay: () => {
    if(STATE.ui.versionDisplay) STATE.ui.versionDisplay.textContent = `v${CONFIG.VERSION}`;
  },
  currentThemeDisplay: () => {
    if(STATE.ui.currentThemeDisplay) {
      const themeText = STATE.themePreference === 'auto'
        ? `Auto (${STATE.currentAppliedTheme})`
        : STATE.themePreference.charAt(0).toUpperCase() + STATE.themePreference.slice(1);
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
        STATE.ui.infoLogoImg = STATE.ui.infoSection.querySelector<HTMLImageElement>('#scbd-info-logo-img');
        if (STATE.ui.infoLogoImg) {
            loadLogoViaGM(STATE.ui.infoLogoImg, CONFIG.ICON_URL, CONFIG.SCRIPT_NAME, handleError);
        } else {
            handleError(new Error("Could not find #scbd-info-logo-img after setting innerHTML."), "Info Logo Setup");
        }
    }
  }
};

export function createPanelUI(): void {
  STATE.ui.container = document.createElement("div");
  STATE.ui.container.id = "scbd-panel-container";
  STATE.ui.dragHandle = document.createElement("div");
  STATE.ui.dragHandle.id = "scbd-drag-handle";
  STATE.ui.container.appendChild(STATE.ui.dragHandle);

  const header = document.createElement("div");
  header.className = "scbd-header";
  const logoImg = document.createElement('img');
  logoImg.alt = "Logo";
  logoImg.className = 'scbd-logo';
  loadLogoViaGM(logoImg, CONFIG.ICON_URL, CONFIG.SCRIPT_NAME, handleError);
  const title = document.createElement("span");
  title.className = 'scbd-title';
  title.textContent = CONFIG.SCRIPT_NAME;
  header.appendChild(logoImg);
  header.appendChild(title);

  const headerControls = document.createElement('div');
  headerControls.className = 'scbd-header-controls';
  STATE.ui.themeToggleButton = document.createElement("button");
  STATE.ui.themeToggleButton.className = "scbd-icon-button";
  STATE.ui.themeToggleButton.innerHTML = "🎨";
  STATE.ui.themeToggleButton.title = "Cycle Theme";
  STATE.ui.themeToggleButton.addEventListener('click', (e) => { e.stopPropagation(); cycleThemePreference(); });
  headerControls.appendChild(STATE.ui.themeToggleButton);

  const settingsButton = document.createElement("button");
  settingsButton.className = "scbd-icon-button";
  settingsButton.innerHTML = "⚙️";
  settingsButton.title = "Settings";
  settingsButton.addEventListener('click', (e) => { e.stopPropagation(); updateUICore.toggleSection('settings'); });
  headerControls.appendChild(settingsButton);

  const infoButton = document.createElement("button");
  infoButton.className = "scbd-icon-button";
  infoButton.innerHTML = "ℹ️";
  infoButton.title = "Information";
  infoButton.addEventListener('click', (e) => { e.stopPropagation(); updateUICore.toggleSection('info'); });
  headerControls.appendChild(infoButton);

  STATE.ui.minimizeButton = document.createElement("button");
  STATE.ui.minimizeButton.className = "scbd-icon-button scbd-minimize-btn";
  STATE.ui.minimizeButton.innerHTML = "&#x2715;";
  STATE.ui.minimizeButton.addEventListener("click", (e) => { e.stopPropagation(); STATE.ui.isMinimized = !STATE.ui.isMinimized; updateUICore.panelVisibility(); });
  headerControls.appendChild(STATE.ui.minimizeButton);
  header.appendChild(headerControls);
  STATE.ui.container.appendChild(header);

  const contentArea = document.createElement('div');
  contentArea.className = 'scbd-content-area';
  STATE.ui.mainControlsSection = document.createElement('div');
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
  const settingsTitle = document.createElement('h4');
  settingsTitle.textContent = 'Settings';
  STATE.ui.settingsSection.appendChild(settingsTitle);

  const orderDiv = document.createElement('div');
  orderDiv.className = 'scbd-setting-row';
  orderDiv.innerHTML = `<span>Order:</span> `;
  STATE.ui.orderToggleButton = document.createElement("button");
  STATE.ui.orderToggleButton.className = "scbd-setting-button";
  STATE.ui.orderToggleButton.addEventListener("click", () => {
    if (STATE.observerActive) return;
    STATE.reverseOrder = !STATE.reverseOrder;
    if (typeof GM_setValue === 'function') {
        try {
            GM_setValue(CONFIG.STORAGE_KEYS.REVERSE_ORDER, STATE.reverseOrder);
        } catch (e: any) {
            handleError(e, "Error saving order preference");
        }
    } else {
        handleError(new Error("GM_setValue is not a function for order toggle"), "GM_setValue Check");
    }
    if (updateUICore.settings?.orderToggleButton) updateUICore.settings.orderToggleButton();
    if (deleteCounterInstance) deleteCounterInstance.updateDisplay();
  });
  orderDiv.appendChild(STATE.ui.orderToggleButton);
  STATE.ui.settingsSection.appendChild(orderDiv);

  const autoScrollDiv = document.createElement('div');
  autoScrollDiv.className = 'scbd-setting-row';
  const autoScrollLabel = document.createElement('span');
  autoScrollLabel.textContent = "Auto-Scroll:";
  autoScrollDiv.appendChild(autoScrollLabel);
  STATE.ui.autoScrollToggleButton = document.createElement("button");
  STATE.ui.autoScrollToggleButton.className = "scbd-toggle-switch";
  STATE.ui.autoScrollToggleButton.setAttribute('role', 'switch');
  STATE.ui.autoScrollToggleButton.setAttribute('aria-checked', String(STATE.autoScrollEnabled));
  STATE.ui.autoScrollToggleButton.addEventListener("click", () => {
      if (STATE.observerActive) return;
      STATE.autoScrollEnabled = !STATE.autoScrollEnabled;
      if (typeof GM_setValue === 'function') {
          try {
              GM_setValue(CONFIG.STORAGE_KEYS.AUTO_SCROLL, STATE.autoScrollEnabled);
          } catch (e: any) {
              handleError(e, "Error saving auto-scroll preference");
          }
      } else {
          handleError(new Error("GM_setValue is not a function for auto-scroll"), "GM_setValue Check");
      }
      if (updateUICore.settings?.autoScrollToggleButton) updateUICore.settings.autoScrollToggleButton();
      if (deleteCounterInstance) deleteCounterInstance.updateDisplay();
  });
  autoScrollDiv.appendChild(STATE.ui.autoScrollToggleButton);
  STATE.ui.settingsSection.appendChild(autoScrollDiv);
  contentArea.appendChild(STATE.ui.settingsSection);

  STATE.ui.infoSection = document.createElement("div");
  STATE.ui.infoSection.id = "scbd-info-section";
  STATE.ui.infoSection.style.display = "none";
  if (updateUICore.updateInfoSectionContent) updateUICore.updateInfoSectionContent();
  contentArea.appendChild(STATE.ui.infoSection);
  STATE.ui.container.appendChild(contentArea);

  const footer = document.createElement('div');
  footer.className = 'scbd-footer';
  STATE.ui.currentThemeDisplay = document.createElement('span');
  STATE.ui.currentThemeDisplay.id = 'scbd-current-theme';
  footer.appendChild(STATE.ui.currentThemeDisplay);
  STATE.ui.versionDisplay = document.createElement('span');
  STATE.ui.versionDisplay.id = 'scbd-version';
  footer.appendChild(STATE.ui.versionDisplay);
  STATE.ui.container.appendChild(footer);

  document.body.appendChild(STATE.ui.container);
  STATE.ui.container.addEventListener('click', (e) => {
    if (STATE.ui.isMinimized && e.target === STATE.ui.container) {
        STATE.ui.isMinimized = false;
        updateUICore.panelVisibility();
    }
  });
  setupDragAndDrop();
  updateUICore.toggleButtonState();
  if (updateUICore.settings) {
    updateUICore.settings.orderToggleButton();
    updateUICore.settings.autoScrollToggleButton();
    updateUICore.settings.themeToggleButton();
  }
  if (updateUICore.versionDisplay) updateUICore.versionDisplay();
  if (updateUICore.currentThemeDisplay) updateUICore.currentThemeDisplay();
  if (deleteCounterInstance) deleteCounterInstance.updateDisplay();
  if (STATE.themePreference === 'auto') {
    applyPanelTheme(getSnapchatPageTheme());
  } else {
    applyPanelTheme(STATE.themePreference as AppliedTheme);
  }
  updateUICore.panelVisibility();
}

function setupDragAndDrop(): void {
  let initialX: number, initialY: number;
  function dragStart(e: MouseEvent) {
    if (e.target === STATE.ui.dragHandle && STATE.ui.container && !STATE.ui.isMinimized) {
      initialX = e.clientX - STATE.uiPosition.x;
      initialY = e.clientY - STATE.uiPosition.y;
      STATE.isDragging = true;
      document.body.classList.add('scbd-dragging');
      if (STATE.ui.container) STATE.ui.container.classList.add('scbd-dragging-panel');
      document.addEventListener("mousemove", dragMove);
      document.addEventListener("mouseup", dragEnd);
    }
  }
  function dragMove(e: MouseEvent) {
    if (STATE.isDragging && STATE.ui.container) {
      e.preventDefault();
      const newX = e.clientX - initialX;
      const newY = e.clientY - initialY;
      const rect = STATE.ui.container.getBoundingClientRect();
      STATE.uiPosition.x = Math.min(window.innerWidth - rect.width - 5, Math.max(5, newX));
      STATE.uiPosition.y = Math.min(window.innerHeight - rect.height - 5, Math.max(5, newY));
      updateUICore.uiPosition();
    }
  }
  function dragEnd() {
    if (!STATE.isDragging) return;
    STATE.isDragging = false;
    document.body.classList.remove('scbd-dragging');
    if (STATE.ui.container) {
        STATE.ui.container.classList.remove('scbd-dragging-panel');
    }
    document.removeEventListener("mousemove", dragMove);
    document.removeEventListener("mouseup", dragEnd);
    if (typeof GM_setValue === 'function') {
        try {
            GM_setValue(CONFIG.STORAGE_KEYS.UI_POSITION, STATE.uiPosition);
        } catch (e: any) {
            handleError(e, "Error calling GM_setValue in dragEnd");
        }
    } else {
        handleError(new Error("GM_setValue is not a function in dragEnd"), "GM_setValue Check");
    }
  }
  if (STATE.ui.container) {
    STATE.ui.container.addEventListener("mousedown", dragStart as EventListener);
  }
}

export function injectStyles(): void {
  if (typeof GM_addStyle === 'function') {
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
      .scbd-setting-button { font-size: 11px; padding: 5px 10px; border-radius: 5px; border: 1px solid; cursor: pointer; transition: background-color 0.2s, border-color 0.2s; }
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
  } else {
    handleError(new Error("GM_addStyle is not available for injecting styles."), "injectStyles");
  }
}
// src/themeManager.ts
import { CONFIG } from "./config";
import { STATE, handleError } from "./state";
import { getSnapchatPageTheme } from "./domUtils";
import type { ThemeOption, AppliedTheme } from "./types";
import { updateUICore, triggerFlashAnimation } from "./ui";

// --- GM Function Declarations for this module ---
declare const GM_setValue: (key: string, value: any) => void; // GM_setValue typically returns void
// --- End GM Function Declarations ---

export function applyPanelTheme(theme: AppliedTheme): void {
  if (!STATE.ui.container) return;
  STATE.ui.container.classList.remove("theme-light", "theme-dark");
  STATE.ui.container.classList.add(`theme-${theme}`);
  STATE.currentAppliedTheme = theme;
  if (updateUICore.currentThemeDisplay) updateUICore.currentThemeDisplay();
  // Update toggle button styling to match the new theme for consistency
  if (updateUICore.toggleButtonState) updateUICore.toggleButtonState();
}

export function cycleThemePreference(): void {
  const currentIndex = CONFIG.THEME_OPTIONS.indexOf(STATE.themePreference);
  const nextIndex = (currentIndex + 1) % CONFIG.THEME_OPTIONS.length;
  STATE.themePreference = CONFIG.THEME_OPTIONS[nextIndex];

  if (typeof GM_setValue === "function") {
    try {
      GM_setValue(CONFIG.STORAGE_KEYS.THEME_PREFERENCE, STATE.themePreference);
    } catch (e: any) {
      handleError(e, "Error saving theme preference");
    }
  } else {
    handleError(
      new Error("GM_setValue is not a function in cycleThemePreference"),
      "GM_setValue Check",
    );
  }

  if (updateUICore.settings?.themeToggleButton)
    updateUICore.settings.themeToggleButton();

  if (STATE.themePreference === "auto") {
    applyPanelTheme(getSnapchatPageTheme());
  } else {
    applyPanelTheme(STATE.themePreference as AppliedTheme);
  }

  // Trigger flash animation on the theme display to provide visual feedback when theme changes
  // This gives users immediate confirmation that the theme switch occurred
  if (STATE.ui.currentThemeDisplay) {
    triggerFlashAnimation(STATE.ui.currentThemeDisplay);
  }
}

export function setupSnapchatThemeObserver(): void {
  if (STATE.snapchatThemeObserver) STATE.snapchatThemeObserver.disconnect();
  STATE.snapchatThemeObserver = new MutationObserver(() => {
    if (STATE.themePreference === "auto") {
      applyPanelTheme(getSnapchatPageTheme());
    }
  });
  STATE.snapchatThemeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["theme", "class"],
  });
}

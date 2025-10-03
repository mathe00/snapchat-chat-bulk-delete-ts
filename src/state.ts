// src/state.ts
import type {
  GlobalState,
  UIPosition,
  ThemeOption,
  AppliedTheme,
  DeletionSpeed,
} from "./types";
import { CONFIG } from "./config";

export const STATE: GlobalState = {
  observerActive: false,
  reverseOrder: true,
  autoScrollEnabled: false,
  autoDeletionEnabled: false, // New
  humanLikeDelays: true, // New - Enable random delays for human-like behavior
  lastDeleteTime: 0,
  isScrolling: false,
  isDragging: false,
  uiPosition: { x: 20, y: 20 } as UIPosition,
  processedButtons: new WeakSet<Element>(),
  processedMessages: new WeakSet<Element>(),
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
    autoDeletionToggleButton: null, // Changed
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
    currentThemeDisplay: null,
  },
  themePreference: CONFIG.DEFAULT_THEME as ThemeOption,
  currentAppliedTheme: "light" as AppliedTheme,
  deletionSpeed: "normal" as DeletionSpeed,
};

export function handleError(error: Error, context = "General"): void {
  console.error(
    `[${CONFIG.SCRIPT_NAME} Error] ${context}: ${error.message}`,
    error.stack || "",
  );
}

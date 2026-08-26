// src/types.ts

export type DeletionSpeed =
  | "slow"
  | "normal"
  | "fast"
  | "insane"
  | "insane_max";

export interface Config {
  SCRIPT_NAME: string;
  VERSION: string;
  STORAGE_KEYS: {
    REVERSE_ORDER: string;
    AUTO_SCROLL: string;
    UI_POSITION: string;
    THEME_PREFERENCE: string;
    PANEL_MINIMIZED: string;
    AUTO_DELETION: string; // Changed from DELETION_MODE
    DELETION_SPEED: string;
    HUMAN_LIKE_DELAYS: string;
    UNSAVE_MODE: string;
  };
  AUTO_SCROLL_DELAY: number;
  MAX_SCROLL_ATTEMPTS: number;
  SCROLL_INTERVAL: number;
  LOAD_WAIT_AFTER_SCROLL: number;
  UI_UPDATE_INTERVAL: number;
  SELECTORS: {
    MESSAGE_CONTAINER: string;
    MESSAGE_HEADER_SELECTOR: string;
    USER_MESSAGE_IDENTIFIER_ELEMENT: string;
    MESSAGE_HOVER_TARGET_1: string;
    MESSAGE_HOVER_TARGET_2: string;
    MESSAGE_HOVER_TARGET_3: string;
    MESSAGE_BUBBLE: string;
    CONTEXT_MENU: string;
    DELETE_BUTTON_CANDIDATE: string;
    DELETE_BUTTON_SVG_PATH_D: string;
    UNSAVE_BUTTON_SVG_PATH_D: string;
    CHAT_SCROLL_CONTAINER_PARENT_SELECTOR: string;
    SNAPCHAT_ROOT_THEME_DARK: string;
    SNAPCHAT_ROOT_THEME_LIGHT: string;
  };
  THEME_OPTIONS: ThemeOption[];
  DEFAULT_THEME: ThemeOption;
  SPEED_OPTIONS: DeletionSpeed[];
  DELETION_SPEEDS: {
    [key in DeletionSpeed]: {
      messageInteractionDelay: number;
      postDeleteDelay: number;
    };
  };
}

export type ThemeOption = "auto" | "light" | "dark";
export type AppliedTheme = "light" | "dark";

export interface UIPosition {
  x: number;
  y: number;
}

export interface UIStateElements {
  container: HTMLDivElement | null;
  mainControlsSection: HTMLDivElement | null;
  toggleButton: HTMLButtonElement | null;
  counterDisplay: HTMLDivElement | null;
  settingsSection: HTMLDivElement | null;
  orderToggleButton: HTMLButtonElement | null;
  autoScrollToggleButton: HTMLButtonElement | null;
  themeToggleButton: HTMLButtonElement | null;
  autoDeletionToggleButton: HTMLButtonElement | null; // Changed
  deletionSpeedToggleButton: HTMLButtonElement | null;
  humanLikeDelaysToggleButton: HTMLButtonElement | null;
  unsaveToggleButton: HTMLButtonElement | null;
  infoSection: HTMLDivElement | null;
  infoLogoImg: HTMLImageElement | null;
  dragHandle: HTMLDivElement | null;
  minimizeButton: HTMLButtonElement | null;
  isMinimized: boolean;
  isInfoVisible: boolean;
  isSettingsVisible: boolean;
  versionDisplay: HTMLSpanElement | null;
  currentThemeDisplay: HTMLSpanElement | null;
}

export interface GlobalState {
  observerActive: boolean;
  reverseOrder: boolean;
  autoScrollEnabled: boolean;
  autoDeletionEnabled: boolean; // New
  humanLikeDelays: boolean; // New - Enable random delays for human-like behavior
  unsaveEnabled: boolean; // When true, messages are unsaved instead of deleted
  lastDeleteTime: number;
  isScrolling: boolean;
  isDragging: boolean;
  uiPosition: UIPosition;
  processedButtons: WeakSet<Element>;
  processedMessages: WeakSet<Element>;
  domObserver: MutationObserver | null;
  snapchatThemeObserver: MutationObserver | null;
  autoScrollIntervalId: number | null;
  displayUpdateIntervalId: number | null;
  fallbackMessageScanIntervalId: number | null; // New - Fallback periodic DOM scanner
  lastFallbackScanTime: number; // New - Track last fallback scan time
  scrollTimeout: number | null; // New - Debounce scroll events
  ui: UIStateElements;
  themePreference: ThemeOption;
  currentAppliedTheme: AppliedTheme;
  deletionSpeed: DeletionSpeed;
}

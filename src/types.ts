// src/types.ts

export interface Config {
  SCRIPT_NAME: string;
  VERSION: string;
  ICON_URL: string;
  STORAGE_KEYS: {
    REVERSE_ORDER: string;
    AUTO_SCROLL: string;
    UI_POSITION: string;
    THEME_PREFERENCE: string;
    PANEL_MINIMIZED: string;
  };
  AUTO_SCROLL_DELAY: number;
  MESSAGE_HOVER_DELAY: number;
  POST_DELETE_DELAY: number;
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
    CONTEXT_MENU: string;
    DELETE_BUTTON_CANDIDATE: string;
    DELETE_BUTTON_SVG_PATH_D: string;
    CHAT_SCROLL_CONTAINER_PARENT_SELECTOR: string;
    SNAPCHAT_ROOT_THEME_DARK: string;
    SNAPCHAT_ROOT_THEME_LIGHT: string;
  };
  THEME_OPTIONS: ThemeOption[];
  DEFAULT_THEME: ThemeOption;
}

export type ThemeOption = 'auto' | 'light' | 'dark';
export type AppliedTheme = 'light' | 'dark';

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
  lastDeleteTime: number;
  isScrolling: boolean;
  isDragging: boolean;
  uiPosition: UIPosition;
  processedButtons: WeakSet<Element>;
  processedMessages: WeakSet<Element>;
  domObserver: MutationObserver | null;
  snapchatThemeObserver: MutationObserver | null;
  autoScrollIntervalId: number | null; // NodeJS.Timeout in Node, number in browser
  displayUpdateIntervalId: number | null; // NodeJS.Timeout in Node, number in browser
  ui: UIStateElements;
  themePreference: ThemeOption;
  currentAppliedTheme: AppliedTheme;
}
// src/config.ts
import type { Config } from './types';

export const CONFIG: Config = {
  SCRIPT_NAME: "Snapchat Chat Bulk Delete",
  VERSION: "3.1.5", // Synchronize with package.json and build.mjs
  ICON_URL: "https://i.imgur.com/bIsPedd.png",
  STORAGE_KEYS: {
    REVERSE_ORDER: "scbd_reverse_order_v3_1_5", // Version bump for storage keys
    AUTO_SCROLL: "scbd_auto_scroll_v3_1_5",
    UI_POSITION: "scbd_ui_position_v3_1_5",
    THEME_PREFERENCE: "scbd_theme_preference_v3_1_5",
    PANEL_MINIMIZED: "scbd_panel_minimized_v3_1_5",
  },
  AUTO_SCROLL_DELAY: 5000,
  MESSAGE_HOVER_DELAY: 300,
  POST_DELETE_DELAY: 50,
  MAX_SCROLL_ATTEMPTS: 5,
  SCROLL_INTERVAL: 200,
  LOAD_WAIT_AFTER_SCROLL: 1000,
  UI_UPDATE_INTERVAL: 1000,
  SELECTORS: {
    MESSAGE_CONTAINER: ".T1yt2", // Example, verify if still valid
    MESSAGE_HEADER_SELECTOR: "header",
    USER_MESSAGE_IDENTIFIER_ELEMENT: "header .nonIntl", // Example
    MESSAGE_HOVER_TARGET_1: ".KB4Aq", // Example
    MESSAGE_HOVER_TARGET_2: '[role="button"]', // Example
    CONTEXT_MENU: ".gFryU", // Example
    DELETE_BUTTON_CANDIDATE: "button.NcaQH", // Example
    DELETE_BUTTON_SVG_PATH_D: "9.75 4.624", // Example
    CHAT_SCROLL_CONTAINER_PARENT_SELECTOR: ".T1yt2", // Example
    SNAPCHAT_ROOT_THEME_DARK: ':root[theme="dark"]',
    SNAPCHAT_ROOT_THEME_LIGHT: ':root[theme="light"]',
  },
  THEME_OPTIONS: ['auto', 'light', 'dark'],
  DEFAULT_THEME: 'auto',
};

// Note: CSS styles are now in ui.ts within injectStyles()
// If you had very large CSS here, it could remain, but GM_addStyle is cleaner for this size.
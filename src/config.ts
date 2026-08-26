// src/config.ts
import type { Config } from "./types";

export const CONFIG: Config = {
  SCRIPT_NAME: "Snapchat Chat Bulk Delete",
  VERSION: "3.4.0", // Synchronize with package.json and build.mjs
  STORAGE_KEYS: {
    REVERSE_ORDER: "scbd_reverse_order_v3_1_5",
    AUTO_SCROLL: "scbd_auto_scroll_v3_1_5",
    UI_POSITION: "scbd_ui_position_v3_1_5",
    THEME_PREFERENCE: "scbd_theme_preference_v3_1_5",
    PANEL_MINIMIZED: "scbd_panel_minimized_v3_1_5",
    AUTO_DELETION: "scbd_auto_deletion_v3_3_0", // Changed
    DELETION_SPEED: "scbd_deletion_speed_v3_2_0",
    HUMAN_LIKE_DELAYS: "scbd_human_like_delays_v3_3_0",
    // New keys are suffixed with the version introducing them; legacy keys above
    // are intentionally kept unchanged so existing users keep their preferences.
    UNSAVE_MODE: "scbd_unsave_mode_v3_4_0",
  },
  AUTO_SCROLL_DELAY: 5000,
  MAX_SCROLL_ATTEMPTS: 5,
  SCROLL_INTERVAL: 200,
  LOAD_WAIT_AFTER_SCROLL: 1000,
  UI_UPDATE_INTERVAL: 1000,
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
    // SVG path fingerprint of the "Unsave" context-menu button (contributed by @alexpapdi, PR #3).
    UNSAVE_BUTTON_SVG_PATH_D: "18.742 4.576",
    CHAT_SCROLL_CONTAINER_PARENT_SELECTOR: ".T1yt2",
    SNAPCHAT_ROOT_THEME_DARK: ':root[theme="dark"]',
    SNAPCHAT_ROOT_THEME_LIGHT: ':root[theme="light"]',
  },
  THEME_OPTIONS: ["auto", "light", "dark"],
  DEFAULT_THEME: "auto",
  SPEED_OPTIONS: ["slow", "normal", "fast", "insane", "insane_max"],
  DELETION_SPEEDS: {
    slow: { messageInteractionDelay: 1500, postDeleteDelay: 500 },
    normal: { messageInteractionDelay: 1000, postDeleteDelay: 300 },
    fast: { messageInteractionDelay: 600, postDeleteDelay: 150 },
    insane: { messageInteractionDelay: 300, postDeleteDelay: 75 },
    insane_max: { messageInteractionDelay: 0, postDeleteDelay: 0 },
  },
};

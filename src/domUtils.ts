// src/domUtils.ts
import { CONFIG } from './config';
import { STATE, handleError } from './state';
import type { AppliedTheme } from './types';

/**
 * Simulates mouse hover or leave events on an element.
 * @param element The element to simulate events on.
 * @param enter True for mouseenter/mouseover, false for mouseleave/mouseout.
 */
export function simulateHover(element: Element | null, enter: boolean): void {
  if (!element) return;
  const eventTypes = enter ? ["mouseenter", "mouseover"] : ["mouseleave", "mouseout"];
  eventTypes.forEach((type) => {
    const event = new MouseEvent(type, {
      bubbles: true,
      cancelable: true,
      view: window,
    });
    element.dispatchEvent(event);
    // Dispatch to parent as well, as some event listeners might be on parent elements
    // This was in the original script, keeping it for now.
    let parent = element.parentElement;
    while (parent) {
      parent.dispatchEvent(
        new MouseEvent(type, { bubbles: true, cancelable: true, view: window })
      );
      parent = parent.parentElement;
    }
  });
}

/**
 * Checks if a button is the intended delete button within a context menu.
 * @param button The button element to check.
 * @returns True if it's the delete button, false otherwise.
 */
export function isDeleteButton(button: HTMLButtonElement): boolean {
  try {
    if (!button.closest(CONFIG.SELECTORS.CONTEXT_MENU)) return false;
    const menu = button.closest(CONFIG.SELECTORS.CONTEXT_MENU);
    if (!menu) return false;

    // Check if it's the last button of its kind in the menu
    const buttonsInMenu = menu.querySelectorAll<HTMLButtonElement>(
      CONFIG.SELECTORS.DELETE_BUTTON_CANDIDATE
    );
    if (buttonsInMenu[buttonsInMenu.length - 1] !== button) return false;

    const svg = button.querySelector("svg");
    if (!svg) return false;
    const path = svg.querySelector("path");
    if (!path) return false;
    const pathData = path.getAttribute("d");
    return pathData ? pathData.includes(CONFIG.SELECTORS.DELETE_BUTTON_SVG_PATH_D) : false;
  } catch (error: any) {
    handleError(error, "isDeleteButton check");
    return false;
  }
}

/**
 * Gets the current theme of the Snapchat page ('dark' or 'light').
 * @returns The current theme.
 */
export function getSnapchatPageTheme(): AppliedTheme {
  if (document.documentElement.matches(CONFIG.SELECTORS.SNAPCHAT_ROOT_THEME_DARK)) {
    return 'dark';
  }
  if (document.documentElement.matches(CONFIG.SELECTORS.SNAPCHAT_ROOT_THEME_LIGHT)) {
    return 'light';
  }
  return 'light'; // Default if neither matches
}
// src/domUtils.ts
import { CONFIG } from "./config";
import { handleError } from "./state";
import type { AppliedTheme } from "./types";

/**
 * Simulates mouse hover or leave events on an element with enhanced realism.
 * @param element The element to simulate events on.
 * @param enter True for mouseenter/mouseover, false for mouseleave/mouseout.
 */
export function simulateHover(element: Element | null, enter: boolean): void {
  if (!element) return;
  // Get the correct window context from the element itself
  const eventView = element.ownerDocument.defaultView;
  if (!eventView) {
    handleError(
      new Error("Could not get window context from element"),
      "simulateHover",
    );
    return;
  }

  const eventTypes = enter
    ? ["mouseenter", "mouseover"]
    : ["mouseleave", "mouseout"];

  // Add random delay to simulate human behavior (optional)
  const useHumanDelays = (window as any).STATE?.humanLikeDelays !== false;
  const baseDelay =
    useHumanDelays && enter
      ? 100 + Math.random() * 200
      : useHumanDelays
        ? 20 + Math.random() * 40
        : 0;

  setTimeout(() => {
    eventTypes.forEach((type, index) => {
      const event = new MouseEvent(type, {
        bubbles: true,
        cancelable: true,
        view: eventView,
        clientX: Math.random() * eventView.innerWidth,
        clientY: Math.random() * eventView.innerHeight,
      });

      // Add slight delay between mouseenter and mouseover for realism
      setTimeout(() => {
        element.dispatchEvent(event);

        // Dispatch to parent as well, as some event listeners might be on parent elements
        let parent = element.parentElement;
        let depth = 0;
        while (parent && depth < 3) {
          // Limit depth to prevent infinite loops
          parent.dispatchEvent(
            new MouseEvent(type, {
              bubbles: true,
              cancelable: true,
              view: eventView,
              clientX: Math.random() * eventView.innerWidth,
              clientY: Math.random() * eventView.innerHeight,
            }),
          );
          parent = parent.parentElement;
          depth++;
        }
      }, index * 10); // Small delay between event types
    });
  }, baseDelay);
}

/**
 * Attempts to trigger context menu by simulating right-click on element.
 * @param element The element to trigger context menu on.
 * @returns Promise that resolves when context menu should be visible.
 */
export function triggerContextMenu(element: Element | null): Promise<boolean> {
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

    // Try right-click simulation
    const contextEvent = new MouseEvent("contextmenu", {
      bubbles: true,
      cancelable: true,
      view: eventView,
      clientX: Math.random() * eventView.innerWidth,
      clientY: Math.random() * eventView.innerHeight,
      button: 2, // Right mouse button
    });

    element.dispatchEvent(contextEvent);

    // Wait a bit and check if context menu appeared
    setTimeout(() => {
      const contextMenu =
        element.querySelector(".gFryU") || document.querySelector(".gFryU");
      resolve(!!contextMenu);
    }, 300);
  });
}

/**
 * Waits for DOM to stabilize after deletions by monitoring message count changes.
 * @param timeout Maximum time to wait in milliseconds.
 * @returns Promise that resolves when DOM is stable.
 */
export function waitForDOMStabilization(timeout = 5000): Promise<boolean> {
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
          // 3 consecutive stable readings
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

/**
 * Checks if a button is the intended delete button within a context menu.
 * @param button The button element to check.
 * @returns True if it's the delete button, false otherwise.
 */
export function isDeleteButton(button: HTMLButtonElement): boolean {
  try {
    // Check for context menu with current selector
    const contextMenu = button.closest(CONFIG.SELECTORS.CONTEXT_MENU);

    if (!contextMenu) {
      // Also check for any potential context menu containers
      button.closest(
        '[role="menu"], .menu, [class*="menu"], [class*="context"], .gFryU',
      );
      return false;
    }

    const menu = button.closest(CONFIG.SELECTORS.CONTEXT_MENU);
    if (!menu) return false;

    // Check if it's the last button in the last gPAXk container (delete button)
    const allContainers = menu.querySelectorAll(".gPAXk");
    const lastContainer = allContainers[allContainers.length - 1];
    if (!lastContainer) {
      return false;
    }

    const buttonsInLastContainer =
      lastContainer.querySelectorAll("button.NcaQH");
    if (buttonsInLastContainer[buttonsInLastContainer.length - 1] !== button) {
      return false;
    }

    const svg = button.querySelector("svg");
    if (!svg) return false;

    const path = svg.querySelector("path");
    if (!path) return false;

    const pathData = path.getAttribute("d");
    const isMatch = pathData
      ? pathData.includes(CONFIG.SELECTORS.DELETE_BUTTON_SVG_PATH_D)
      : false;

    return isMatch;
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
  if (
    document.documentElement.matches(CONFIG.SELECTORS.SNAPCHAT_ROOT_THEME_DARK)
  ) {
    return "dark";
  }
  if (
    document.documentElement.matches(CONFIG.SELECTORS.SNAPCHAT_ROOT_THEME_LIGHT)
  ) {
    return "light";
  }
  return "light"; // Default if neither matches
}

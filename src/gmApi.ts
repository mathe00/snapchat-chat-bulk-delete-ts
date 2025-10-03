// src/gmApi.ts
import { handleError } from "./state"; // handleError is imported from state.ts

/**
 * Sets the source of an image element to a base64 data URL.
 * @param imgElement The HTMLImageElement to set the source for.
 * @param base64DataUrl The base64 data URL string.
 * @param scriptName The name of the script, for logging purposes.
 * @param handleErrorFunction A function to call in case of an error.
 */
export function setLogoFromBase64( // Ensure this function is exported
  imgElement: HTMLImageElement,
  base64DataUrl: string,
  scriptName: string,
  handleErrorFunction: (error: Error, context: string) => void,
): void {
  if (!(imgElement instanceof HTMLImageElement)) {
    handleErrorFunction(
      new Error("Invalid element passed to setLogoFromBase64."),
      "Logo Init",
    );
    return;
  }

  imgElement.onerror = function () {
    handleErrorFunction(
      new Error(
        `Image failed to load from base64 data URL. Check if the data URL is correct.`,
      ),
      `Logo img.onerror (base64)`,
    );
    this.alt = "Error loading logo from base64";
  };

  try {
    imgElement.src = base64DataUrl;
    // console.log(`[${scriptName}] Logo set from base64 data URL.`); // Optional: uncomment for debugging
  } catch (error: any) {
    handleErrorFunction(error, `Logo Set Function (Outer Catch)`);
    imgElement.alt = "Exception loading logo from base64";
  }
}

// src/gmApi.ts

// GM_xmlhttpRequest declaration for Tampermonkey.Request type
declare const GM_xmlhttpRequest: (details: Tampermonkey.Request) => void;


export async function loadLogoViaGM(
  imgElement: HTMLImageElement,
  url: string,
  scriptName: string,
  handleError: (error: Error, context: string) => void,
): Promise<void> {
  if (!(imgElement instanceof HTMLImageElement)) {
    handleError(
      new Error("Invalid element passed to loadLogoViaGM."),
      "Logo Init",
    );
    return;
  }

  imgElement.onerror = function () {
    handleError(
      new Error(`Image failed to load from src: ${this.src}`),
      `Logo img.onerror (direct src or object URL)`,
    );
    this.alt = "Logo error (direct/object)";
  };

  try {
    // Check if the global GM_xmlhttpRequest function is actually available
    if (typeof GM_xmlhttpRequest === 'function') {
      console.log(`[${scriptName}] Attempting to load logo via GM_xmlhttpRequest.`);
      GM_xmlhttpRequest({
        method: "GET",
        url: url,
        responseType: "blob",
        timeout: 15000,
        headers: { Accept: "image/*" },
        onload: function (resp) {
          if (resp.status === 200 && resp.response) {
            const blob = resp.response as Blob;
            if (!blob.type || !blob.type.startsWith("image/")) {
              handleError(
                new Error(`GM_xmlhttpRequest: Response is not an image. Type: ${blob.type || 'unknown'}`),
                `Logo Type Check (GM_xmlhttpRequest)`,
              );
              imgElement.alt = `Logo !image (GM_xmlhttpRequest)`;
              return;
            }
            const objectURL = URL.createObjectURL(blob);
            if (imgElement.dataset.objectURL) {
              URL.revokeObjectURL(imgElement.dataset.objectURL);
            }
            imgElement.src = objectURL;
            imgElement.dataset.objectURL = objectURL;
            console.log(`[${scriptName}] Logo loaded successfully via GM_xmlhttpRequest.`);
          } else {
            handleError(
              new Error(`GM_xmlhttpRequest: HTTP ${resp.status} ${resp.statusText}`),
              `Logo HTTP Fail (GM_xmlhttpRequest)`,
            );
            imgElement.alt = `Logo HTTP ${resp.status} (GM_xmlhttpRequest)`;
            console.warn(`[${scriptName}] GM_xmlhttpRequest failed (HTTP ${resp.status}), falling back to direct src for logo: ${url}`);
            imgElement.src = url;
          }
        },
        onerror: function (resp) {
          handleError(
            new Error(`GM_xmlhttpRequest Error: ${resp.error || 'Unknown XHR error'}`),
            `Logo XHR Err (GM_xmlhttpRequest)`,
          );
          imgElement.alt = "Logo XHR error (GM_xmlhttpRequest)";
          console.warn(`[${scriptName}] GM_xmlhttpRequest failed (onerror), falling back to direct src for logo: ${url}`);
          imgElement.src = url;
        },
        ontimeout: function () {
          handleError(new Error("GM_xmlhttpRequest Timeout"), `Logo Timeout (GM_xmlhttpRequest)`);
          imgElement.alt = "Logo timeout (GM_xmlhttpRequest)";
          console.warn(`[${scriptName}] GM_xmlhttpRequest timed out, falling back to direct src for logo: ${url}`);
          imgElement.src = url;
        },
      });
    } else {
      // GM_xmlhttpRequest is not available, fallback to direct src
      console.warn(`[${scriptName}] GM_xmlhttpRequest is not available. Falling back to direct src for logo: ${url}`);
      imgElement.src = url;
    }
  } catch (error: any) {
    handleError(error, `Logo Load Function (Outer Catch)`);
    imgElement.alt = "Logo load exception (Outer Catch)";
    if (!imgElement.src) {
        console.warn(`[${scriptName}] Exception during logo load, falling back to direct src for logo: ${url}`);
        imgElement.src = url;
    }
  }
}
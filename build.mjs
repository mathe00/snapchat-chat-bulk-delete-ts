// build.mjs
import esbuild from "esbuild";
import fs from "fs/promises";
import path from "path";

// Read package.json to get metadata
const packageJson = JSON.parse(await fs.readFile("./package.json", "utf-8"));

const SCRIPT_NAME = "Snapchat Chat Bulk Delete";
const VERSION = packageJson.version;
const AUTHOR = packageJson.author; // "mathe00"
// Build "@contributor" metadata lines from the package.json contributors array.
// Each entry is prefixed with a newline so an empty list adds nothing to the header.
const CONTRIBUTORS = (packageJson.contributors ?? [])
  .map((c) => `\n// @contributor  ${c.name}${c.url ? ` (${c.url})` : ""}`)
  .join("");
const NAMESPACE = "https://github.com/mathe00/snapchat-chat-bulk-delete-ts";
const SUPPORT_URL =
  "https://github.com/mathe00/snapchat-chat-bulk-delete-ts/issues";
const HOMEPAGE_URL = "https://github.com/mathe00/snapchat-chat-bulk-delete-ts";

const entryPoint = "src/main.ts";
const outfile = "dist/snapchat-chat-bulk-delete.user.js";
const tempBundleFile = "build-temp.js";
const logoFilePath = "logo_64.png"; // Path to the logo file

async function getLogoAsBase64DataURL(filePath) {
  try {
    const imageBuffer = await fs.readFile(filePath);
    const base64Image = imageBuffer.toString("base64");
    // Determine mime type from file extension, default to png
    const ext = path.extname(filePath).toLowerCase();
    let mimeType = "image/png";
    if (ext === ".jpg" || ext === ".jpeg") {
      mimeType = "image/jpeg";
    } else if (ext === ".gif") {
      mimeType = "image/gif";
    } else if (ext === ".svg") {
      mimeType = "image/svg+xml";
    }
    return `data:${mimeType};base64,${base64Image}`;
  } catch (error) {
    console.warn(
      `Warning: Could not read logo file at ${filePath}. Using a placeholder. Error: ${error.message}`,
    );
    // Fallback placeholder if logo file is missing or unreadable
    return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABbSURBVHhe7cExAQAAAMKg9U9tCF8gAAAAAAAAAAAAAABg9gKAAACAAACAAACAAACAAACAAACAAACAAACAAACAAACAAACAAACAAACAAACAAACAAACAAACAAACAAACAAACAAADgB45UAAGyPjXjAAAAAElFTkSuQmCC";
  }
}

async function build() {
  try {
    await fs.mkdir(path.dirname(outfile), { recursive: true });

    const logoBase64DataURL = await getLogoAsBase64DataURL(logoFilePath);

    const metadata = `// ==UserScript==
// @name         ${SCRIPT_NAME}
// @namespace    ${NAMESPACE}
// @version      ${VERSION}
// @description  Advanced bulk message deletion and unsave tool for Snapchat Web. Features theme options, persistent settings, automatic message detection, efficient deletion, optional unsave mode, auto-scroll, configurable deletion order, and a sleek, modern, minimizable interface. Operates by simulating user interactions.
// @author       ${AUTHOR}${CONTRIBUTORS}
// @match        https://web.snapchat.com/*
// @match        https://www.snapchat.com/web/*
// @icon         ${logoBase64DataURL}
// @grant        GM_addStyle
// @grant        GM_setValue
// @grant        GM_getValue
// @run-at       document-idle
// @license      MIT
// @compatible   firefox Violentmonkey Tampermonkey
// @compatible   chrome Violentmonkey Tampermonkey
// @compatible   edge Violentmonkey Tampermonkey
// @supportURL   ${SUPPORT_URL}
// @homepageURL  ${HOMEPAGE_URL}
// ==/UserScript==
`;

    const result = await esbuild.build({
      entryPoints: [entryPoint],
      bundle: true,
      outfile: tempBundleFile,
      format: "esm",
      target: "esnext",
      charset: "utf8",
      minify: false,
      sourcemap: false,
      treeShaking: true,
    });

    if (result.errors.length > 0) {
      console.error("Build failed:", result.errors);
      process.exit(1);
    }

    const bundledCode = await fs.readFile(tempBundleFile, "utf-8");
    // Inject the base64 logo as a global constant within the IIFE
    const finalScript = `${metadata}\n\n(async function() {\n  'use strict';\nconst INJECTED_LOGO_BASE64 = "${logoBase64DataURL}";\n${bundledCode}\n})();\n`;

    await fs.writeFile(outfile, finalScript);
    await fs.unlink(tempBundleFile);

    console.log(`UserScript built successfully: ${outfile}`);
  } catch (error) {
    console.error("Build process error:", error);
    process.exit(1);
  }
}

const watchMode = process.argv.includes("--watch");

if (watchMode) {
  console.log("Watching for changes...");
  const watchFiles = ["src", logoFilePath]; // Watch src and the logo file
  for (const fileOrDir of watchFiles) {
    fs.watch(fileOrDir, { recursive: true }, async (eventType, filename) => {
      // Log more info for debugging watch
      // console.log(`Watch event: ${eventType} on ${filename || fileOrDir}`);
      if (
        (filename && (filename.endsWith(".ts") || filename === logoFilePath)) ||
        (!filename && fileOrDir === logoFilePath) // Direct change to logo file
      ) {
        console.log(
          `Detected change in ${filename || fileOrDir}, rebuilding...`,
        );
        await build();
      } else if (filename) {
        // For directory changes, check if a relevant file type was involved
        const changedPath = path.join(fileOrDir, filename); // Construct full path if filename is relative to watched dir
        if (
          changedPath.endsWith(".ts") ||
          path.basename(changedPath) === path.basename(logoFilePath)
        ) {
          console.log(`Detected change in ${changedPath}, rebuilding...`);
          await build();
        }
      }
    });
  }
}

build();

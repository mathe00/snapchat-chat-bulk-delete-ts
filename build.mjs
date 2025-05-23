import esbuild from 'esbuild';
import fs from 'fs/promises';
import path from 'path';

// Read package.json to get metadata, or define it directly
const packageJson = JSON.parse(await fs.readFile('./package.json', 'utf-8'));

const SCRIPT_NAME = "Snapchat Chat Bulk Delete"; // Or read from a source
const VERSION = packageJson.version; // Uses the version from package.json
const AUTHOR = packageJson.author;
const NAMESPACE = "https://github.com/mathe00/snapchat-chat-bulk-delete-ts"; // Adapt this
const ICON_URL = "https://i.imgur.com/bIsPedd.png";
const SUPPORT_URL = "https://github.com/mathe00/snapchat-chat-bulk-delete-ts/issues";
const HOMEPAGE_URL = "https://github.com/mathe00/snapchat-chat-bulk-delete-ts";

const metadata = `// ==UserScript==
// @name         ${SCRIPT_NAME}
// @namespace    ${NAMESPACE}
// @version      ${VERSION}
// @description  Advanced bulk message deletion tool for Snapchat Web. Features theme options, persistent settings, automatic message detection, efficient deletion, auto-scroll, configurable deletion order, and a sleek, modern, minimizable interface. Operates by simulating user interactions.
// @author       ${AUTHOR}
// @match        https://web.snapchat.com/*
// @match        https://www.snapchat.com/web/*
// @icon         ${ICON_URL}
// @grant        GM_addStyle
// @grant        GM_xmlhttpRequest
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

const entryPoint = 'src/main.ts';
const outfile = 'dist/snapchat-chat-bulk-delete.user.js';
const tempBundleFile = 'build-temp.js';

async function build() {
  try {
    await fs.mkdir(path.dirname(outfile), { recursive: true });

    const result = await esbuild.build({
      entryPoints: [entryPoint],
      bundle: true,
      outfile: tempBundleFile,
      format: 'esm', // Output as ES module, not IIFE
      target: 'esnext',
      charset: 'utf8',
      minify: false, // You can enable minification if desired
      sourcemap: false, // No sourcemap in the final .user.js
      treeShaking: true,
    });

    if (result.errors.length > 0) {
      console.error('Build failed:', result.errors);
      process.exit(1);
    }

    const bundledCode = await fs.readFile(tempBundleFile, 'utf-8');
    const finalScript = `${metadata}\n\n(async function() {\n  'use strict';\n${bundledCode}\n})();\n`;

    await fs.writeFile(outfile, finalScript);
    await fs.unlink(tempBundleFile); // Clean up temporary file

    console.log(`UserScript built successfully: ${outfile}`);
  } catch (error) {
    console.error('Build process error:', error);
    process.exit(1);
  }
}

const watchMode = process.argv.includes('--watch');

if (watchMode) {
  console.log('Watching for changes...');
  // Basic watch implementation (rebuild on any change in src)
  // For more sophisticated watching, consider tools like chokidar
  fs.watch('src', { recursive: true }, async (eventType, filename) => {
    if (filename && filename.endsWith('.ts')) {
      console.log(`Detected change in ${filename}, rebuilding...`);
      await build();
    }
  });
}

// Initial build
build();
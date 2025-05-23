<!-- README.md -->
# Snapchat Chat Bulk Delete (TypeScript Version)

**Version:** 3.1.5
**Author:** mathe00 (Original by Anonymous Contributor, Ported by T3 Chat & mathe00)
**License:** MIT
**Support URL:** [https://github.com/mathe00/snapchat-chat-bulk-delete-ts/issues](https://github.com/mathe00/snapchat-chat-bulk-delete-ts/issues)
**Homepage URL:** [https://github.com/mathe00/snapchat-chat-bulk-delete-ts](https://github.com/mathe00/snapchat-chat-bulk-delete-ts)

<!-- Using the local logo.png for README display if it's in the repo root -->
<!-- The script itself uses an absolute URL for reliability in the UI panel -->
<p align="center">
  <img src="logo.png" alt="Snapchat Chat Bulk Delete Logo" width="150">
</p>

An advanced UserScript for Snapchat Web (web.snapchat.com) designed to help you efficiently bulk delete **your own** chat messages. This script operates by **simulating normal user interactions** (like mouse hovers and clicks) on the Snapchat Web interface. It **does not interfere with network requests** or use any private APIs. Think of it as a helpful macro to automate a repetitive task that is otherwise tedious to perform manually.

The primary goal is to provide a user-friendly way to manage your chat history and remove sensitive data, a process that Snapchat's native interface does not easily facilitate for bulk actions.

This is a TypeScript rewrite of the original JavaScript UserScript, offering improved maintainability, type safety, and a modular project structure.

## Features

*   **Bulk Message Deletion:** Deletes your own messages from the currently open chat.
*   **User-Friendly Interface:**
    *   Sleek, modern, and minimizable control panel.
    *   Draggable panel to position it anywhere on the screen.
*   **Configurable Deletion Order:**
    *   Delete messages from **Newest to Oldest** (default).
    *   Delete messages from **Oldest to Newest**.
*   **Automatic Message Detection:** Identifies user's own messages based on their unique appearance in the chat.
*   **Efficient Deletion Process:** Simulates hovers and clicks to reveal and use the delete option.
*   **Auto-Scroll (Configurable):**
    *   Automatically scrolls up the chat to load older messages when no more messages are found in the current view.
    *   Can be toggled on/off.
*   **Theme Options:**
    *   **Auto:** Panel theme automatically matches Snapchat's page theme (Light/Dark).
    *   **Light:** Forces a light theme for the panel.
    *   **Dark:** Forces a dark theme for the panel.
*   **Persistent Settings:** User preferences (deletion order, auto-scroll, theme, panel position, minimized state) are saved and loaded across sessions.
*   **Deletion Counter:** Displays the number of messages deleted in the current chat and in total for the session.
*   **Status Indicators:** Provides visual feedback for active deletion and auto-scrolling.

## How it Works (Non-Intrusive)

This script is designed to be as non-intrusive and transparent as possible:

*   **Simulates User Actions:** It programmatically performs actions you could do manually: hovering over a message to reveal options, then clicking the "Delete" button, and confirming the deletion.
*   **No Network Manipulation:** The script **does not** intercept, modify, or send any custom network requests to Snapchat's servers. All actions are performed through the existing web interface.
*   **Client-Side Only:** All operations occur within your browser.
*   **Time-Saving Utility:** Its purpose is to save you the time and effort of manually clicking "delete" on hundreds or thousands of messages one by one, which is a permitted action.
*   **Data Privacy Focused:** The script helps users exercise their ability to remove their own data and conversations from the platform more efficiently.

Essentially, it automates a series of legitimate clicks that you are entitled to make.

## Installation

1.  **Install a UserScript Manager:**
    *   [Tampermonkey](https://www.tampermonkey.net/) (Recommended for Chrome, Edge, Safari, Opera)
    *   [Violentmonkey](https://violentmonkey.github.io/) (Recommended for Firefox, also works on Chrome/Edge)
2.  **Install the Script:**
    *   **From a UserScript hosting site (e.g., GreasyFork, OpenUserJS):** Click the "Install" button on the script's page.
    *   **From GitHub (using the `.user.js` file):**
        1.  Navigate to the `dist/snapchat-chat-bulk-delete.user.js` file in this repository (or the release page).
        2.  Click the "Raw" button.
        3.  Your UserScript manager should automatically detect the script and prompt you for installation. Confirm the installation.

## Usage

1.  Open [Snapchat Web](https://web.snapchat.com/) and log in.
2.  Open the chat from which you want to delete messages.
3.  The script's control panel should appear on the page (usually top-left by default, or its last saved position).
4.  **Configure Settings (Optional):**
    *   Click the **Gear icon (⚙️)** to open the settings section.
    *   **Order:** Choose "Newest → Oldest" or "Oldest → Newest".
    *   **Auto-Scroll:** Toggle the switch to enable/disable automatic scrolling to load older messages.
    *   Click the **Palette icon (🎨)** in the header to cycle through panel themes (Auto, Light, Dark).
5.  **Start Deletion:**
    *   Click the **"START"** button on the panel.
    *   The button will change to "PAUSE", and the script will begin hovering over your messages and clicking the delete option.
6.  **Pause Deletion:**
    *   Click the **"PAUSE"** button to stop the deletion process.
7.  **Panel Management:**
    *   **Drag:** Click and drag the top bar of the panel (where the title is) to move it.
    *   **Minimize:** Click the **Close icon (✕)** in the panel header to minimize it to a small button (usually bottom-right). Click the minimized button to restore.
    *   **Information:** Click the **Info icon (ℹ️)** for script details.

**Important Notes:**

*   **Snapchat UI Changes:** Snapchat frequently updates its web interface. These updates can break the script if CSS selectors for messages, buttons, or menus change. If the script stops working, it likely needs its selectors updated. Please check for updates or report an issue.
*   **Rate Limiting & Fair Use:** While this script simulates human-like clicks with delays, deleting an extremely large number of messages very rapidly *could* theoretically trigger Snapchat's automated systems designed to prevent abuse or bot-like activity. The script includes delays to be considerate, but it's always wise to use such tools responsibly. Deleting messages is a permitted action; this script just helps you do it more efficiently for your own data.
*   **Only Your Messages:** This script is designed to identify and delete *your own* messages. It relies on specific visual cues in the DOM that differentiate your messages from others.
*   **No Guarantees:** This script is provided as-is, without any warranty. Use it at your own risk. The author is not responsible for any unintended consequences.

## For Developers

This project is built with TypeScript and uses `esbuild` for bundling.

### Project Structure
```tree
snapchat-chat-bulk-delete-ts/
├── dist/                     # Output directory for the built .user.js script
│   └── snapchat-chat-bulk-delete.user.js
├── src/                      # TypeScript source files
│   ├── main.ts               # Main entry point, initialization
│   ├── config.ts             # Configuration, constants, selectors
│   ├── domUtils.ts           # DOM manipulation utilities
│   ├── gmApi.ts              # Utilities for GM_* functions (e.g., loading logo)
│   ├── state.ts              # Global state management and error handling
│   ├── ui.ts                 # UI panel creation and management
│   ├── deleteCounter.ts      # Logic for counting deleted messages
│   ├── themeManager.ts       # Panel theme management
│   └── types.ts              # TypeScript type definitions
├── .gitignore
├── README.md                 # This file
├── build.mjs                 # esbuild build script
├── logo.png                  # Script logo image file
├── package-lock.json         # Exact versions of dependencies
├── package.json              # Project dependencies and scripts
└── tsconfig.json             # TypeScript compiler configuration
```
### Building from Source

1.  **Prerequisites:**
    *   [Node.js](https://nodejs.org/) (which includes npm)
2.  **Clone the repository:**
    ```bash
    git clone https://github.com/mathe00/snapchat-chat-bulk-delete-ts.git # Or your specific repo URL
    cd snapchat-chat-bulk-delete-ts
    ```
3.  **Install dependencies:**
    ```bash
    npm install
    ```
4.  **Build the script:**
    *   For a single build:
        ```bash
        npm run build
        ```
    *   To watch for changes and rebuild automatically:
        ```bash
        npm run watch
        ```
    The built UserScript will be located in the `dist/` folder.

## Contributing

Contributions, bug reports, and feature requests are welcome! Please feel free to open an issue or submit a pull request.

When reporting issues, please include:
*   Your browser and version.
*   Your UserScript manager (Tampermonkey/Violentmonkey) and version.
*   Steps to reproduce the issue.
*   Any error messages from the browser console (F12 > Console).

## Disclaimer

This script is an independent project and is not affiliated with, endorsed by, or sponsored by Snap Inc. It is a tool designed to assist users in managing their own data on the platform by automating actions they could perform manually. Use of this script is at your own risk. The developers assume no liability for any actions taken by the script or any consequences thereof.
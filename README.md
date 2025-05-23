<!-- README.md -->
# 👻 Snapchat Chat Bulk Delete (TypeScript Version)

<p align="center">
  <img src="logo.png" alt="Snapchat Chat Bulk Delete Logo" width="150">
</p>

## **🧹 Effortlessly bulk delete your Snapchat messages!**

Tired of manually deleting Snapchat messages one by one? This UserScript is your ultimate solution to reclaim your chat history with ease! 🚀 Automate the deletion of **your own** messages on Snapchat Web with a user-friendly interface, configurable options, and a non-intrusive approach.

<p align="center">
  <strong>🚀 <a href="https://update.greasyfork.org/scripts/536981/Snapchat%20Chat%20Bulk%20Delete.user.js" title="Click to install the UserScript from Greasy Fork">Install the Script Now (from Greasy Fork)!</a> 🚀</strong>
</p>

---

<p align="center">
  <strong>✨ See it in Action! ✨</strong>
  <br>
  Watch a quick demonstration of the script:
  <br>
  <video controls width="720" src="https://github.com/user-attachments/assets/f14d8935-bd72-48d3-a28b-52d5b0d3302a">
    Sorry, your browser doesn't support embedded videos, but you can <a href="https://github.com/user-attachments/assets/f14d8935-bd72-48d3-a28b-52d5b0d3302a">download it</a>
    and watch it with your favorite video player!
  </video>
  <br>
  <em>(If the video doesn't load, you can also <a href="https://github.com/user-attachments/assets/f14d8935-bd72-48d3-a28b-52d5b0d3302a" target="_blank" rel="noopener noreferrer">open it directly</a>.)</em>
</p>

---

<a id="tldr"></a>
## TL;DR (Too Long; Didn't Read)

*   **What is this?** A UserScript to bulk delete **your own** messages on Snapchat Web.
*   **Why?** To save time, enhance privacy, and finally get rid of messages from people who *never* let them auto-delete 😒.
*   **How?** Simulates user actions (hovers, clicks) – no API hacking.
*   **Install:** [Click here to install from Greasy Fork!](https://update.greasyfork.org/scripts/536981/Snapchat%20Chat%20Bulk%20Delete.user.js) (or see [full installation steps](#installation)).
*   **Cool Features:** Sleek UI ✨, auto-scroll 📜, light/dark themes 🎨, persistent settings 💾, deletion order control, message counter.
*   **Basically:** Automate tedious clicks to clean up your Snapchat chats.

---

**Table of Contents**

-   [TL;DR](#tldr)
-   [📜 Description](#description)
-   [🕵️‍♂️ Why This Script? The Origin Story](#origin-story)
-   [✨ Key Features](#key-features)
-   [🤔 How it Works (Non-Intrusive)](#how-it-works)
-   [🛠️ Installation](#installation)
-   [🚀 Usage](#usage)
-   [⚠️ Important Notes](#important-notes)
-   [🚀 Future Features (Roadmap)](#roadmap)
-   [👨‍💻 For Developers](#for-developers)
    -   [Project Structure](#project-structure)
    -   [Building from Source](#building-from-source)
-   [🤝 Contributing](#contributing)
-   [💖 Support the Project](#support-the-project)
-   [⭐ Show Your Support](#support-star)
-   [👨‍💻 A Note from the Author (Kind Of)](#author-note)
-   [📜 License](#license)
-   [⚖️ Disclaimer](#disclaimer)

---

<a id="description"></a>
## 📜 Description

**Snapchat Chat Bulk Delete (TypeScript Version)** is an advanced UserScript for Snapchat Web ([www.snapchat.com/web](https://www.snapchat.com/web/)) designed to help you efficiently bulk delete **your own** chat messages. This script operates by **simulating normal user interactions** (like mouse hovers and clicks) on the Snapchat Web interface. It **does not interfere with network requests** or use any private APIs. Think of it as a helpful macro to automate a repetitive task that is otherwise tedious to perform manually.

The primary goal is to provide a user-friendly way to manage your chat history and remove sensitive data, a process that Snapchat's native interface does not easily facilitate for bulk actions. This is a TypeScript rewrite of the original JavaScript UserScript, offering improved maintainability, type safety, and a modular project structure.

<a id="origin-story"></a>
## 🕵️‍♂️ Why This Script? The Origin Story

Privacy is a big deal, right? Ever thought about those Snapchat messages you sent, like, 10 years ago? Yeah, me too. It'd be nice to clean those up, especially since some folks *insist* on disabling auto-delete after 24 hours and hoarding messages for ages. Seriously, who does that? 😒 It just triggers me! If you're one of those message-hoarders, we're probably not on the same team here. 😉

If you've got hundreds, or even thousands, of messages to delete, doing it manually is a soul-crushing nightmare. I wanted something like the awesome [undiscord](https://github.com/victornpb/undiscord) tool, but for Snapchat. The moment Snapchat Web dropped, this idea sparked. I even remember seeing someone else, somewhere on the vast internet (OpenUserJS, Greasy Fork, Reddit? The post is lost to time, sadly 😩), asking for pretty much the same thing – a bulk delete for Snapchat Web. While I couldn't find that specific original plea, the sentiment is widespread. For instance, among many similar complaints, this [Reddit user back in 2020](https://www.reddit.com/r/jailbreak/comments/fx0z4e/help_snapchat_ways_to_mass_delete/) was already looking for ways to mass delete messages, even considering modified APKs before Snapchat Web was a thing. I really hope that original person, and others like them, stumble upon this project! If that's you, hello!

Let's be real, Snapchat not having this feature natively in 2025 is just... not cool and frankly, quite annoying. So many articles and Reddit threads are filled with people asking how to do this. It's a pain point for many. Now, thanks to this project, there's a solution for Snapchat Web.

My UserScript aims to ease that pain. Currently, it's pretty respectful of Snapchat's setup – less "aggressive" and automated than tools like `undiscord`. You still need to move your mouse over your messages, but once you do, *zap!* They're gone, without you needing to hunt for the tiny delete icon and confirm. I might explore a more automated version down the line, `undiscord`-style. It feels doable, a bit more challenging, but if I put my mind to it, I'm sure I can get there!

<a id="key-features"></a>
## ✨ Key Features

*   🗑️ **Bulk Message Deletion:** Deletes your own messages from the currently open chat.
*   🖥️ **User-Friendly Interface:**
    *   Sleek, modern, and minimizable control panel.
    *   Draggable panel to position it anywhere on the screen.
*   ⚙️ **Configurable Deletion Order:**
    *   Delete messages from **Newest to Oldest** (default).
    *   Delete messages from **Oldest to Newest**.
*   🎯 **Automatic Message Detection:** Identifies user's own messages based on their unique appearance in the chat.
*   🖱️ **Efficient Deletion Process:** Simulates hovers and clicks to reveal and use the delete option.
*   📜 **Auto-Scroll (Configurable):**
    *   Automatically scrolls up the chat to load older messages when no more messages are found in the current view.
    *   Can be toggled on/off.
*   🎨 **Theme Options:**
    *   **Auto:** Panel theme automatically matches Snapchat's page theme (Light/Dark).
    *   **Light:** Forces a light theme for the panel.
    *   **Dark:** Forces a dark theme for the panel.
*   💾 **Persistent Settings:** User preferences (deletion order, auto-scroll, theme, panel position, minimized state) are saved and loaded across sessions.
*   📊 **Deletion Counter:** Displays the number of messages deleted in the current chat and in total for the session.
*   🚦 **Status Indicators:** Provides visual feedback for active deletion and auto-scrolling.

<a id="how-it-works"></a>
## 🤔 How it Works (Non-Intrusive)

This script is designed to be as non-intrusive and transparent as possible:

*   **Simulates User Actions:** It programmatically performs actions you could do manually: hovering over a message to reveal options, then clicking the "Delete" button, and confirming the deletion.
*   **No Network Manipulation:** The script **does not** intercept, modify, or send any custom network requests to Snapchat's servers. All actions are performed through the existing web interface.
*   **Client-Side Only:** All operations occur within your browser.
*   **Time-Saving Utility:** Its purpose is to save you the time and effort of manually clicking "delete" on hundreds or thousands of messages one by one, which is a permitted action.
*   **Data Privacy Focused:** The script helps users exercise their ability to remove their own data and conversations from the platform more efficiently.

Essentially, it automates a series of legitimate clicks that you are entitled to make.

<a id="installation"></a>
## 🛠️ Installation

1.  **Install a UserScript Manager:**
    *   [Tampermonkey](https://www.tampermonkey.net/) (Recommended for Chrome, Edge, Safari, Opera)
    *   [Violentmonkey](https://violentmonkey.github.io/) (Recommended for Firefox, also works on Chrome/Edge)
2.  **Install the Script:**
    *   **From Greasy Fork (Recommended - Easiest!):**
        *   ➡️ **[Click here to install from Greasy Fork](https://update.greasyfork.org/scripts/536981/Snapchat%20Chat%20Bulk%20Delete.user.js)** ⬅️
        *   Your UserScript manager should prompt you to install.
        *   You can also visit the script's page on [Greasy Fork](https://greasyfork.org/fr/scripts/536981-snapchat-chat-bulk-delete).
    *   **From GitHub (Alternative):**
        *   [Click here to install directly from GitHub](https://github.com/mathe00/snapchat-chat-bulk-delete-ts/raw/main/dist/snapchat-chat-bulk-delete.user.js)
        *   Alternatively, go to the [Releases page](https://github.com/mathe00/snapchat-chat-bulk-delete-ts/releases) and download the `.user.js` file from the latest release.
    *   **From OpenUserJS:**
        *   ⏳ Publication pending. (Currently facing technical difficulties with their icon handling. Will revisit later if the `data:URL` method for the icon doesn't work.)

<a id="usage"></a>
## 🚀 Usage

1.  Open [Snapchat Web](https://www.snapchat.com/web/) and log in.
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

<a id="important-notes"></a>
## ⚠️ Important Notes

*   **Snapchat UI Changes:** Snapchat frequently updates its web interface. These updates can break the script if CSS selectors for messages, buttons, or menus change. If the script stops working, it likely needs its selectors updated. Please check for updates or report an issue.
*   **Rate Limiting & Fair Use:** While this script simulates human-like clicks with delays, deleting an extremely large number of messages very rapidly *could* theoretically trigger Snapchat's automated systems designed to prevent abuse or bot-like activity. The script includes delays to be considerate, but it's always wise to use such tools responsibly. Deleting messages is a permitted action; this script just helps you do it more efficiently for your own data.
*   **Only Your Messages:** This script is designed to identify and delete *your own* messages. It relies on specific visual cues in the DOM that differentiate your messages from others.
*   **No Guarantees:** This script is provided as-is, without any warranty. Use it at your own risk. The author is not responsible for any unintended consequences.

<a id="roadmap"></a>
## 🚀 Future Features (Roadmap)

-   📦 **Publish on UserScript Hosting Sites**:
    -   [x] Publish on [Greasy Fork](https://greasyfork.org/fr/scripts/536981-snapchat-chat-bulk-delete) for easier installation.
    -   [ ] Publish on [OpenUserJS.org](https://openuserjs.org/) for wider availability. (Status: ⏳ Pending - icon issues. Next attempt will be with a `data:URL` for the icon if current 64x64px icon fails.)
-   🤖 **More Automated Deletion Mode (Undiscord-style)**: Investigate and potentially implement a mode that requires less manual mouse movement, similar to how `undiscord` operates, while still respecting Snapchat's interface.
-   🛠️ **Refinements & Optimizations**: Continuously improve message detection, deletion speed (within safe limits), and UI responsiveness.
-   🌍 **Localization**: Add support for more languages in the UI panel if there's demand.

<a id="for-developers"></a>
## 👨‍💻 For Developers

This project is built with TypeScript and uses `esbuild` for bundling.

### Project Structure

```tree
snapchat-chat-bulk-delete-ts/
├── dist/                     # Output directory for the built .user.js script
│   └── snapchat-chat-bulk-delete.user.js
├── src/                      # TypeScript source files
│   ├── config.ts             # Configuration, constants, selectors
│   ├── deleteCounter.ts      # Logic for counting deleted messages
│   ├── domUtils.ts           # DOM manipulation utilities
│   ├── gmApi.ts              # Utilities for GM_* functions (e.g., loading logo)
│   ├── main.ts               # Main entry point, initialization
│   ├── state.ts              # Global state management and error handling
│   ├── themeManager.ts       # Panel theme management
│   ├── types.ts              # TypeScript type definitions
│   └── ui.ts                 # UI panel creation and management
├── .gitignore
├── LICENSE                   # MIT License file
├── README.md                 # This file
├── build.mjs                 # esbuild build script
├── example_video_v3.1.5.mp4  # Demo video file
├── logo.png                  # Original script logo image file (e.g., 512x512)
├── logo_64.png               # Resized script logo for UserScript icon (64x64)
├── package-lock.json         # Exact versions of dependencies
├── package.json              # Project dependencies and scripts
└── tsconfig.json             # TypeScript compiler configuration
```

### Building from Source

1.  **Prerequisites:**
    *   [Node.js](https://nodejs.org/) (which includes npm)
2.  **Clone the repository:**
    ```bash
    git clone https://github.com/mathe00/snapchat-chat-bulk-delete-ts.git
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

<a id="contributing"></a>
## 🤝 Contributing

Contributions, bug reports, and feature requests are welcome! Please feel free to open an issue or submit a pull request.

When reporting issues, please include:
*   Your browser and version.
*   Your UserScript manager (Tampermonkey/Violentmonkey) and version.
*   Steps to reproduce the issue.
*   Any error messages from the browser console (F12 > Console).

<a id="support-the-project"></a>
## 💖 Support the Project

If you find this script valuable, especially if it saves you the headache of manual deletions or helps you reclaim your digital privacy, please consider showing some love.

Developing and maintaining this, even as a "vibe coded" project, takes time and effort – all provided for free to the community. A small contribution is greatly appreciated and helps fuel future updates and more "vibe coding" sessions!

I currently accept donations through:

**Bitcoin (BTC)**
`zpub6nL6JpeLNPiK44KpPbBxQc8emSar7ZsbvLf1vbQsYmUAaHNj289i9q2XtE4H5cYLiFCxWSpWP88HBf7F75n34998LDutyHkdzKBJYxyMDoQ`

**Ethereum (ETH) & ERC20 Tokens**
`0xe0b8007dca71940ab09a2e025f111216f0eb1c4e`

If you have any questions about donations or encounter any issues, please feel free to open a GitHub issue.

<a id="support-star"></a>
## ⭐ Show Your Support

If you find this script useful, please consider giving it a **star** on GitHub! It helps others discover the project and motivates further development. 😊

<a id="author-note"></a>
## 👨‍💻 A Note from the Author (Kind Of)

Quick heads-up: I'm not exactly a pro developer. I navigate by feel and intuition quite a bit, and a lot of my projects on GitHub (including this one) are what you might call "vibe coded." 😅 This means they often come together through experimentation and following the flow, rather than strict plans.

But hey, as long as it works, doesn't introduce security risks, and gets the job done, that's what counts for me, and hopefully for you too! I think the code isn't *too* messy, so if any actual developers want to jump in and contribute, you're more than welcome!

<a id="license"></a>
## 📜 License

This project is licensed under the **MIT License**. You can find the full license text in the `LICENSE` file at the root of this repository.

<a id="disclaimer"></a>
## ⚖️ Disclaimer

This script is an independent project and is not affiliated with, endorsed by, or sponsored by Snap Inc. It is a tool designed to assist users in managing their own data on the platform by automating actions they could perform manually. Use of this script is at your own risk. The developers assume no liability for any actions taken by the script or any consequences thereof.

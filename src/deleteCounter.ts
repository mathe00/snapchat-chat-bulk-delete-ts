// src/deleteCounter.ts
import { CONFIG } from './config';
import { STATE } from './state'; // For UI updates

interface Counters {
  total: number;
  chats: { [chatId: string]: number };
}

export class DeleteCountManager {
  private counters: Counters;
  private currentChatId: string;

  constructor() {
    this.counters = { total: 0, chats: {} };
    this.currentChatId = this.extractChatId();
    this.setupUrlMonitoring();
    this.updateDisplay(); // Initial display
  }

  private extractChatId(): string {
    const match = window.location.pathname.match(/\/([^\/]+)$/);
    return match ? match[1] : "unknown_chat";
  }

  private setupUrlMonitoring(): void {
    // Use a more robust way to detect URL changes if possible,
    // e.g., observing navigation events if Snapchat uses History API.
    // For now, interval is kept from original.
    setInterval(() => {
      const newChatId = this.extractChatId();
      if (newChatId !== this.currentChatId) {
        this.currentChatId = newChatId;
        this.updateDisplay();
      }
    }, CONFIG.UI_UPDATE_INTERVAL);
  }

  public async increment(): Promise<void> {
    if (!this.counters.chats[this.currentChatId]) {
      this.counters.chats[this.currentChatId] = 0;
    }
    this.counters.chats[this.currentChatId]++;
    this.counters.total++;
    this.updateDisplay();
  }

  public updateDisplay(): void {
    if (STATE.ui.counterDisplay) {
      const currentChatCount = this.counters.chats[this.currentChatId] || 0;
      const timeUntilScroll =
        STATE.autoScrollEnabled && STATE.observerActive
          ? Math.max(
              0,
              Math.ceil(
                (CONFIG.AUTO_SCROLL_DELAY - (Date.now() - STATE.lastDeleteTime)) / 1000
              )
            )
          : "-";
      STATE.ui.counterDisplay.innerHTML = `<div>Chat: ${currentChatCount}</div><div>Total: ${this.counters.total}</div><div>Next scroll: ${timeUntilScroll}s</div>`;
    }
  }

  public resetCurrentChatCounter(): void {
    this.counters.chats[this.currentChatId] = 0;
    this.updateDisplay();
  }

  public resetAllCounters(): void {
    this.counters = { total: 0, chats: {} };
    this.updateDisplay();
  }
}
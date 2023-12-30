import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export abstract class QueueService<T> {

  private queue: T[] = [];
  private isProcessing = false;

  protected constructor() { }

  add(item: T) {
    this.queue.push(item);
    !this.isProcessing && this.processQueue();
  }

  private processQueue() {
    if (!this.queue.length) {
      this.isProcessing = false;
      return;
    }

    this.isProcessing = true;
    const item: T | undefined = this.queue.shift();

    if (!item) {
      this.isProcessing = false;
      return;
    }

    this.processItem(item, () => {
      this.processQueue();
    })
  }

  abstract processItem(item: T, callback: () => void): void;
}

import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class SseService {
  private eventSource: EventSource | null = null;

  constructor(private zone: NgZone) {}

  openConnection(url: string): void {
    console.log('Opening SSE connection to', url);
    this.eventSource = new EventSource(url);
  }

  listen(): Observable<any> {
    console.log('Listening for SSE events');
    return new Observable(observer => {
      if (!this.eventSource) {
        observer.error('Connection not open');
        return;
      }

      this.eventSource.onmessage = event => {
        console.log('Received SSE event', event);
        this.zone.run(() => {
          observer.next(JSON.parse(event.data));
        });
      };

      this.eventSource.onerror = error => {
        console.error('SSE connection error', error);
        this.zone.run(() => {
          observer.error('SSE connection error');
          this.eventSource?.close();
        });
      };
    });
  }

  closeConnection(): void {
    console.log('Closing SSE connection');
    this.eventSource?.close();
    this.eventSource = null;
  }

  isConnected(): boolean {
    return this.eventSource !== null;
  }
}

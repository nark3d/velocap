import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class SSEService<T> {
  constructor(protected eventEmitter: EventEmitter2) {}

  createEventStream(eventName: string): Observable<T> {
    return new Observable(observer => {
      // Emit initial event
      observer.next();

      this.eventEmitter.on(eventName, (data: T) => observer.next(data));
    });
  }

  updateEventStream(eventName: string, data: T): void {
    this.eventEmitter.emit(eventName, JSON.stringify(data));
  }
}

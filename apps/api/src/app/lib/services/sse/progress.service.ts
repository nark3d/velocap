import { Injectable } from '@nestjs/common';
import { SSEService } from '../sse.service';
import { Observable } from 'rxjs';

export interface ProgressData {
  progress: number;
}

@Injectable()
export class ProgressService extends SSEService<ProgressData> {
  reportProgress(progress: number): void {
    console.log('Reporting progress', progress);
    this.updateEventStream('progress', { progress });
  }
}

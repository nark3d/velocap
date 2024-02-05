import { ProgressService } from '../services/sse/progress.service';

export default class ChunkGenerator {
  public async chunk<ReturnType>(
    fetchMethod: (start: number, maxResults: number) => Promise<ReturnType[]>,
    processMethod: (items: ReturnType[]) => Promise<void>,
    total: number,
    maxResults: number,
    progressService?: ProgressService,
  ): Promise<void> {
    for await (const { chunk, start} of this.generate(fetchMethod, maxResults, total)) {
      await processMethod(chunk);
      progressService?.reportProgress( Math.floor((start / total) * 100));
    }
  }

  private async *generate<ReturnType>(
    fetchMethod: (start: number, maxResults: number) => Promise<ReturnType[]>,
    maxResults: number,
    total: number,
    start = 0
  ): AsyncGenerator<{ chunk: ReturnType[], start: number }, void, unknown> {
    while (start < total) {
      yield { chunk: await fetchMethod(start, maxResults), start };
      start += maxResults;
    }
  }
}

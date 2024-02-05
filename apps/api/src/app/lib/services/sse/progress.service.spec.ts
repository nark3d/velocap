import ProgressSSeService from './progress.service';

describe('ProgressSSeService', () => {
  let service: ProgressSSeService;
  let eventsSpy: jest.SpyInstance;

  beforeEach(() => {
    service = new ProgressSSeService();
    eventsSpy = jest.spyOn(service['events'], 'next');
  });

  it('should calculate progress as 100 when totalProcessed equals total', () => {
    service.updateProgress(100, 100);
    expect(eventsSpy).toHaveBeenCalledWith({ data: { progress: 100 } });
  });

  it('should calculate progress as 0 when totalProcessed is less than total', () => {
    service.updateProgress(30, 100);
    expect(eventsSpy).toHaveBeenCalledWith({ data: { progress: 30 } });
  });

  it('should emit an event when updateProgress is called', () => {
    service.updateProgress(50, 100);
    expect(eventsSpy).toHaveBeenCalled();
  });
});

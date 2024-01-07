import { FileSystem } from './drivers';
import { Factory } from './factory';

describe('Factory create', () => {
  it('returns a driver if defined', () => {
    expect(Factory.create('fileSystem')).toBeInstanceOf(FileSystem)
  });
  it('throws error if driver not defined', () => {
    expect(() => {
      Factory.create('notADriver')
    }).toThrow()
  });
});

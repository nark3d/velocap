import { File } from './file';

describe('File', () => {
  describe('splitPath', () => {
    it('correctly splits a normal path', () => {
      const result = File.splitPath('/path/to/file.txt');
      expect(result).toEqual({ path: '/path/to', filename: 'file', extension: 'txt' });
    });

    it('handles a path without an extension', () => {
      const result = File.splitPath('/path/to/file');
      expect(result).toEqual({ path: '/path/to', filename: 'file', extension: '' });
    });

    it('handles a path with multiple dots', () => {
      const result = File.splitPath('/path/to/file.tar.gz');
      expect(result).toEqual({ path: '/path/to', filename: 'file.tar', extension: 'gz' });
    });

    it('handles a path without a filename', () => {
      const result = File.splitPath('/path/to/');
      expect(result).toEqual({ path: '/path/to', filename: '', extension: '' });
    });

    it('handles a path with only a filename', () => {
      const result = File.splitPath('file.txt');
      expect(result).toEqual({ path: '', filename: 'file', extension: 'txt' });
    });

    it('handles an empty path', () => {
      const result = File.splitPath('');
      expect(result).toEqual({ path: '', filename: '', extension: '' });
    });
  });
});

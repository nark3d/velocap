import { unlinkSync, readFileSync, copyFileSync, existsSync } from 'fs';
import { FileSystem } from './file-system';

jest.mock('fs');

const mockReadFileSync = readFileSync as jest.Mock;
const mockCopyFileSync = copyFileSync as jest.Mock;
const mockUnlinkSync = unlinkSync as jest.Mock;
const mockExistsSync = existsSync as jest.Mock;

const testLocation = 'some/location/or/other';

beforeEach(() => {
  jest.clearAllMocks();
});
describe('FileSystem class methods', () => {
  it('tests the get method runs readFileSync', async () => {
    mockReadFileSync.mockReturnValue(true);
    expect(await new FileSystem().get(testLocation)).toBeTruthy();
    expect(mockReadFileSync).toHaveBeenCalledTimes(1);
    expect(mockReadFileSync).toHaveBeenCalledWith(
      `${process.cwd()}/public/${testLocation}`
    );
  });
  it('tests the put method runs move and rename with the correct parameters', async () => {
    mockCopyFileSync.mockReturnValue(true);
    expect(await new FileSystem().put('/tmp/something', testLocation)).toBeTruthy();
    expect(mockCopyFileSync).toHaveBeenCalledTimes(1);
    expect(mockCopyFileSync).toHaveBeenCalledWith(
      '/tmp/something',
      `${process.cwd()}/public/${testLocation}`
    );
  });
  it('tests the delete method runs unlinkSync', async () => {
    mockUnlinkSync.mockReturnValue(true)
    expect(await new FileSystem().delete(testLocation)).toBeTruthy();
    expect(mockUnlinkSync).toHaveBeenCalledTimes(1);
    expect(mockUnlinkSync).toHaveBeenCalledWith(
      `${process.cwd()}/public/${testLocation}`
    );
  });
  it('tests the exists method runs existsSync', async () => {
    mockExistsSync.mockReturnValue(true);
    expect(await new FileSystem().exists(testLocation)).toBeTruthy();
    expect(mockExistsSync).toHaveBeenCalledTimes(1);
    expect(mockExistsSync).toHaveBeenCalledWith(
      `${process.cwd()}/public/${testLocation}`
    );
  });
  it('tests that the getters return the right strings', () => {
    process.env.PORT = '9999';
    expect(new FileSystem().getBaseLink()).toEqual('http://localhost:9999/');
    expect(new FileSystem().getBaseFolder()).toEqual('public/');
  });
});

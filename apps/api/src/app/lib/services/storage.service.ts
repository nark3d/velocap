import { Factory } from './storage/factory';
import AbstractDriver from '../abstract/abstract-driver';
import { Readable } from 'stream';
import { join } from 'path';
import { File } from '../utils/file';

export default class StorageService {
  private client: AbstractDriver;
  private path = join(__dirname, '../../../dist');

  constructor() {
    // @todo make this configurable
    this.client = Factory.create('fileSystem');
  }

  async get(location: string) {
    return this.client.get(location);
  }

  async mkdir(location: string, recursive = true): Promise<string> {
    return this.client.mkdir(location, recursive);
  }

  private async mkTmpPath(): Promise<string> {
    const tmpPath = join(this.path, '/tmp');
    !(await this.exists(tmpPath)) && await this.mkdir(tmpPath);
    return tmpPath;
  }

  private async mkTmpFile(): Promise<string> {
    return `${await this.mkTmpPath()}/${Date.now()}${Math.floor(Math.random() * 1000)}`;
  }

  // @todo this needs some work.  Do we even need to save to tmp these days?
  async saveBuffer(origin: ArrayBuffer, destination: string) {
    const { path} = File.splitPath(destination);
    !(await this.exists(path)) && await this.mkdir(path);
    const tmpFile = await this.mkTmpFile();
    await this.client.writeBuffer(Buffer.from(origin), tmpFile);
    await this.put(tmpFile, destination);
    await this.delete(tmpFile);
  }

  async ls(dir: string): Promise<string[]> {
    return this.client.ls(dir);
  }

  async findByBaseName(dir: string, baseName: string): Promise<string> {
      const files = await this.ls(dir);
      return files.filter((file: string) => File.splitPath(file).filename === baseName)[0];
  }

  async stream(location: string): Promise<Readable> {
    return await this.client.stream(location);
  }

  async put(file: string, location: string, mimetype?: string): Promise<string | void> {
    return this.client.put(file, location, mimetype);
  }

  async delete(location: string) {
    return this.client.delete(location);
  }

  async exists(location: string): Promise<boolean> {
    return this.client.exists(location);
  }
}

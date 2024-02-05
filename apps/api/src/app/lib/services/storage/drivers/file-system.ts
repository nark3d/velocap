import AbstractDriver from '../../../abstract/abstract-driver';
import {
  unlinkSync,
  readFileSync,
  copyFileSync,
  existsSync,
  createReadStream,
  mkdirSync,
  writeFileSync,
  readdirSync
} from 'fs';
import { Readable } from 'stream';

export class FileSystem extends AbstractDriver {
  private baseFolder = '';
  private baseLink = '/';

  async get(location: string): Promise<Buffer> {
    return readFileSync(location);
  }

  async stream(location: string): Promise<Readable> {
    return createReadStream(location);
  }

  async put(tmp: string, location: string): Promise<void> {
    return copyFileSync(tmp, location);
  }

  async delete(location: string): Promise<void> {
    return unlinkSync(location);
  }

  async exists(location: string): Promise<boolean> {
    return existsSync(location);
  }

  getBaseFolder(): string {
    return this.baseFolder;
  }

  getBaseLink(): string {
    return `http://localhost:${process.env.PORT}${this.baseLink}`;
  }

  async mkdir(location: string, recursive: boolean): Promise<string> {
    return mkdirSync(location, { recursive: recursive });
  }

  async writeBuffer(buffer: Buffer, location: string): Promise<void> {
    return writeFileSync(location, buffer);
  }

  async ls(dir: string): Promise<string[]> {
    return readdirSync(dir);
  }
}

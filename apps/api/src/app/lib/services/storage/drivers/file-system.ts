import AbstractDriver from '../../abstract/abstract-driver';
import {
  unlinkSync,
  readFileSync,
  copyFileSync,
  existsSync,
  createReadStream,
} from 'fs';
import { Readable } from 'stream';
export class FileSystem extends AbstractDriver {
  private baseFolder = '';
  private baseLink = '/';

  async get(location: string): Promise<Buffer> {
    return readFileSync(this.prefix(location));
  }

  async stream(location: string): Promise<Readable> {
    return createReadStream(location);
  }

  async put(tmp: string, location: string): Promise<void> {
    return copyFileSync(tmp, location);
  }

  async delete(location: string): Promise<void> {
    return unlinkSync(this.prefix(location));
  }

  async exists(location: string): Promise<boolean> {
    return existsSync(this.prefix(location));
  }

  getBaseFolder(): string {
    return this.baseFolder;
  }

  getBaseLink(): string {
    return `http://localhost:${process.env.PORT}${this.baseLink}`;
  }

  private prefix(location: string): string {
    return `${process.cwd()}/${this.getBaseFolder()}${location}`;
  }
}

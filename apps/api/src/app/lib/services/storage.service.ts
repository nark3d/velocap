import { Factory } from './storage/factory';
import AbstractDriver from './abstract/abstract-driver';
import { Readable } from 'stream';

export default class StorageService {
  private client: AbstractDriver;

  constructor() {
    this.client = Factory.create('fileSystem');
  }

  async get(location: string) {
    return this.client.get(location);
  }

  async stream(location: string): Promise<Readable> {
    const stream = await this.client.stream(location);
    if (!stream) {
      throw new Error('Stream not found');
    }

    return stream;
  }

  async put(file: string, location: string, mimetype?: string) {
    return this.client.put(file, location, mimetype);
  }

  async delete(location: string) {
    return this.client.delete(location);
  }

  async exists(location: string) {
    return this.client.exists(location);
  }
}

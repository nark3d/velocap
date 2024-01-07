import AbstractDriver from '../abstract/abstract-driver';
import { FileSystem } from './drivers';
export class Factory {
  private static drivers = {
    fileSystem: FileSystem
  };

  public static create(driver: string): AbstractDriver {
    if (!Object.prototype.hasOwnProperty.call(this.drivers, driver)) {
      throw new Error(`Driver [${driver}] does not exist`);
    }
    return new this.drivers[driver]();
  }

}

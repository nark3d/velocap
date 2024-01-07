
import { Readable } from 'stream';

export default abstract class AbstractDriver {
    abstract getBaseFolder(): string;
    abstract getBaseLink(): string;
    abstract get(location: string): Promise<Buffer | false>;
    abstract stream(location: string): Promise<Readable>;
    abstract exists(location: string): Promise<boolean>;
    abstract put(tmp: string, location: string, mimeType: string | undefined): Promise<string | void>;
    abstract delete(location: string): Promise<boolean | void>;
}

import * as pathLib from 'path';

const mimeTypes: Record<string, string> = {
  'jpg': 'image/jpeg',
  'jpeg': 'image/jpeg',
  'png': 'image/png',
  'gif': 'image/gif',
  'svg': 'image/svg+xml',
  'pdf': 'application/pdf',
  'doc': 'application/msword',
  'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'xls': 'application/vnd.ms-excel',
  'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'ppt': 'application/vnd.ms-powerpoint',
  'pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'zip': 'application/zip',
  'tar': 'application/x-tar',
  'gz': 'application/gzip',
  'mp3': 'audio/mpeg',
  'wav': 'audio/wav',
  'ogg': 'audio/ogg',
  'midi': 'audio/midi',
  'mp4': 'video/mp4',
  'webm': 'video/webm',
  'avi': 'video/x-msvideo',
  'mpeg': 'video/mpeg',
  'txt': 'text/plain',
  'html': 'text/html',
  'css': 'text/css',
  'csv': 'text/csv',
  'json': 'application/json',
  'xml': 'application/xml',
  'js': 'application/javascript',
  'ts': 'application/typescript',
  'tsx': 'application/typescript',
  'jsx': 'application/javascript',
  'md': 'text/markdown',
  'markdown': 'text/markdown',
  'yml': 'text/yaml',
  'yaml': 'text/yaml',
  '': 'application/octet-stream'
};

export class File {
  static splitPath(location: string) {
    const extension = pathLib.extname(location);
    const filename = location.endsWith('/') ? '' : pathLib.basename(location, extension);
    const dir = location.endsWith('/') ? location.slice(0, -1) : pathLib.dirname(location);
    const path = dir === '.' ? '' : dir;
    return { path, filename, extension: extension.slice(1) };
  }

  static getMimeType(extension: string): string | null{
    return mimeTypes[extension.toLowerCase()] || null;
  }
}

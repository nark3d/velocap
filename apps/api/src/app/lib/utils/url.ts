type URLComponents = {
  protocol: string;
  hostname: string;
  segments: string[];
  pathname: string;
  searchParams: Record<string, string>;
};

import { URL as NodeURL } from 'url';
export class URL {

  public static getNative(url: string): NodeURL {
    return new NodeURL(url);
  }

  public static splitUrl(url: string): URLComponents {
    const native = this.getNative(url);
    return {
      protocol: native.protocol,
      hostname: native.hostname,
      pathname: native.pathname,
      segments: this.splitPathname(native.pathname),
      searchParams: this.splitSearchParams(native.searchParams),
    };
  }

  public static getFinalSegment(url: string): string {
    const { segments } = this.splitUrl(url);
    return segments[segments.length - 1];
  }

  public static getSegment(url: string, index: number): string {
    const { segments } = this.splitUrl(url);
    return segments[index];
  }

  private static splitPathname(pathname: string): string[] {
    return pathname.split('/').filter(Boolean);
  }

  private static splitSearchParams(searchParams: URLSearchParams): Record<string, string> {
    return Array.from(searchParams.entries()).reduce((acc, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {} as Record<string, string>);
  }
}

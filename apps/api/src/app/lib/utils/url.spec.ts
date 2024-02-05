import { URL } from './url';

describe('URL', () => {
  const url
    = 'https://littlestar.atlassian.net/rest/api/3/universal_avatar/view/type/project/avatar/10413?bob=billy&joe=jack';
  describe('splitUrl', () => {
    it('should split a URL into segments', () => {
      expect(URL.splitUrl(url)).toEqual({
        protocol: 'https:',
        hostname: 'littlestar.atlassian.net',
        pathname: '/rest/api/3/universal_avatar/view/type/project/avatar/10413',
        segments: ['rest', 'api', '3', 'universal_avatar', 'view', 'type', 'project', 'avatar', '10413'],
        searchParams: {
          bob: 'billy',
          joe: 'jack',
        },
      });
    });
    it('should return an error if the URL is an empty string', () => {
      expect(() => URL.splitUrl('')).toThrow('Invalid URL');
    });
  });
  describe('getFinalSegment', () => {
    it('should return the final segment of a URL', () => {
      expect(URL.getFinalSegment(url)).toEqual('10413');
    });
  });
  describe('getSegment', () => {
    it('should return the final segment of a URL', () => {
      expect(URL.getSegment(url, 3)).toEqual('universal_avatar');
    });
  });
});

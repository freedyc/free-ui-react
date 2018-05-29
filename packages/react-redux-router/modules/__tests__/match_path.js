import matchPath from '../match_path';

describe('matchPath', () => {

  it('should match', () => {
    const path = '/views/:view_id';
    const url = '/views/default/zones/com/rrs';
    const match = matchPath(url, path);
    expect(match).not.toBeNull();
  });

  it('should not match when exact is true', () => {
    const path = '/views/:view_id';
    const url = '/views/default/zones/com/rrs';
    const match = matchPath(url, { path, exact: true });
    expect(match).toBeNull();
  });

  it('should match params *name', () => {
    const path = '/views/:view_id';
    const url = '/views/default/zones/com/rrs';
    const match = matchPath(url, path);
    expect(match.params.view_id).toEqual('default');
  });

  it('should match params *name', () => {
    const path = '/views/*name';
    const url = '/views/default/zones/com/rrs';
    // default match is not greed mode, so `*name` is ''
    const match = matchPath(url, { path, exact: true });
    expect(match.params.name).toEqual('default/zones/com/rrs');
  });
});

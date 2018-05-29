const optionalParam = /\((.*?)\)/g;
const namedParam = /(\(\?)?:\w+/g;
const splatParam = /\*\w+/g;
const escapeRegExp = /[\-{}\[\]+?.,\\\^$|#\s]/g;

const pathToRegExp = (path, exact) => {
  const regPath = path.replace(escapeRegExp, '\\$&')
        .replace(optionalParam, '(?:$1)?')
        .replace(namedParam, function(match, optional) {
          return optional ? match : '([^/?]+)';
        })
        .replace(splatParam, '([^?]*?)');
  return new RegExp('^' + regPath + (exact ? '$' : ''));
};

/**
 * Public API for matching a URL pathname to a path pattern.
 */
const matchPath = (pathname, options = {}, parent) => {
  if (typeof options === "string") options = { path: options };

  const { path, exact = false } = options;

  if (path == null) return {
    path, // the path pattern used to match
    url: pathname, // the matched portion of the URL
    isExact: true, // whether or not we matched exactly
    params: {},
    values: []
  };

  const re = pathToRegExp(path, exact);
  const match = re.exec(pathname);

  if (!match) return null;

  const [url, ...values] = match;
  const isExact = pathname === url;

  if (exact && !isExact) return null;

  const keys = [].slice.call((path.match(/(?:\*|:)\w+/g) || []).map((p) => p.slice(1)));

  return {
    path, // the path pattern used to match
    url: path === "/" && url === "" ? "/" : url, // the matched portion of the URL
    isExact, // whether or not we matched exactly
    params: keys.reduce((memo, key, index) => {
      memo[key] = values[index];
      return memo;
    }, {}),
    values
  };
};

export default matchPath;

const coffee = require('coffeescript');
const babelJest = require('babel-jest');

module.exports = {
  process: (src, path, ...rest) => {
    // CoffeeScript files can be .coffee, .litcoffee, or .coffee.md
    if (coffee.helpers.isCoffee(path)) {
      if (coffee.helpers.invertLiterate(src)) src = coffee.helpers.invertLiterate(src);
      return coffee.compile(src, {
        bare: true,
        transpile: {
          presets: ['jest', 'es2015', 'stage-1']
        }
      });
    }
    if (!/node_modules/.test(path)) {
      return babelJest.process(src, path, ...rest);
    }
    return src;
  }
};

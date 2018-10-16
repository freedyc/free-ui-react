const BABEL_ENV = process.env.BABEL_ENV;
const building = BABEL_ENV != undefined && BABEL_ENV !== "cjs";

const plugins = [
  'transform-es3-property-literals',
  'transform-es3-member-expression-literals',
  'transform-proto-to-assign',
  'transform-class-properties',
  ['transform-es2015-classes', { loose: true }],
];

if (BABEL_ENV !== 'umd') {
  plugins.push(['transform-es2015-modules-commonjs', { loose: true }]);
}

if (process.env.NODE_ENV === "production") {
  plugins.push("dev-expression", "transform-react-remove-prop-types");
}

module.exports = {
  presets: [
    [
      "env",
      {
        loose: true,
        modules: building ? false : "commonjs"
      }
    ],
    "stage-1",
  ],
  plugins: plugins
};

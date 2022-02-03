module.exports = {
  presets: [
    ['@babel/preset-env', {
      useBuiltIns: 'usage',
      corejs: { version: 3 },
      // If modules is set to false, import and export do not change to require
      // and module.exports. (Tree Shaking Condition)
      modules: false,
      targets: {
        edge: "17",
        firefox: "60",
        chrome: "67",
        safari: "11.1",
      },
    }],
    ['@babel/preset-react', { runtime: 'automatic' }],
    ['@babel/preset-typescript'],
  ],
  plugins: [
    ['@emotion/babel-plugin', {
      sourceMap: true,
      autoLabel: 'always',
      labelFormat: '[filename]__[local]',
    }],
  ],
};

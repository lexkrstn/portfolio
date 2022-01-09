module.exports = {
  presets: [
    ['@babel/preset-env', { useBuiltIns: 'usage', corejs: { version: 3 } }],
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

module.exports = {
  rootDir: 'src/browser',
  verbose: true,
  preset: 'ts-jest',
  globals: {
    NODE_ENV: 'test',
    'ts-jest': {
      tsConfig: 'tsconfig.test.json',
    },
  },
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  moduleDirectories: ['node_modules'],
};

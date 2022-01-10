module.exports = {
  rootDir: 'src',
  verbose: true,
  preset: 'ts-jest',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.[tj]sx?$': 'ts-jest',
  },
  collectCoverageFrom: [
    "**/*.[tj]sx?",
  ],
  coverageDirectory: '../reports/coverage',
  testEnvironment: 'jsdom',
  globals: {
    NODE_ENV: 'test',
    // 'ts-jest': {
    //   tsConfig: 'tsconfig.test.json',
    // },
  },
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json'],
  moduleDirectories: ['node_modules'],
};

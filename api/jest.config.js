module.exports = {
  rootDir: 'src',
  verbose: true,
  preset: 'ts-jest',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: [
    "**/*.[tj]s",
  ],
  coverageDirectory: '../reports/coverage',
  testEnvironment: 'node',
  globals: {
    NODE_ENV: 'test',
  },
  moduleFileExtensions: ['js', 'ts', 'json'],
  moduleDirectories: ['node_modules'],
};

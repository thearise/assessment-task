import type { Config } from 'jest';

const config: Config = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup.jest.ts'],
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/dist/'
  ],
  globals: {
    'ts-jest': {
      useESM: true,
      stringifyContentPathRegex: '\\.(html|svg)$',
      tsconfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  // An array of file extensions your modules use
  // moduleFileExtensions: ['ts', 'js', 'html', 'svg', 'json', 'mjs'],
  // // A map from regular expressions to module names that allow to stub out resources with a single module
  // moduleNameMapper: {'^(\\.{1,2}/.*)\\.js$': '$1'},
  // // A map from regular expressions to paths to transformers
  // transform: { '^.+\\.(ts|tsx|js|html|svg|mjs)$': 'jest-preset-angular'},
  // An array of regexp pattern strings that are matched against all source file paths, matched files will skip transformation
  // transformIgnorePatterns: [`<rootDir>/node_modules/(?!.*\\.mjs$|${esModules.join('|')})`],
};

export default config;

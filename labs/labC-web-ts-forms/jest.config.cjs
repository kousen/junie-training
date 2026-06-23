/** @type {import('jest').Config} */
const config = {
  preset: 'ts-jest',
  testEnvironment: '<rootDir>/tests/JestJsdomEnvironment.cjs',
  testPathIgnorePatterns: ['<rootDir>/tests/e2e/'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};

module.exports = config;

module.exports = {
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  setupFiles: ['./src/__tests__/clientMethods.ts'],
  testPathIgnorePatterns: ['<rootDir>/src/__tests__/clientMethods.ts'],
};

module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: [
    '@testing-library/react-native/extend-expect',
    './jest-setup.ts',
  ],
  transformIgnorePatterns: ['/node_modules/(?!@firebase)/'],
  modulePathIgnorePatterns: ['<rootDir>/__tests__/__mocks__'],
  coveragePathIgnorePatterns: ['<rootDir>/src/API/__generated__'],
};

module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: [
    '@testing-library/react-native/extend-expect',
    './jest-setup.ts',
    './__mocks__/@react-native-firebase.ts',
  ],
  transformIgnorePatterns: ['/node_modules/(?!@firebase)/'],
  modulePathIgnorePatterns: ['<rootDir>/__tests__/__mocks__'],
};

module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['@testing-library/react-native/extend-expect', './jest-setup.ts'],
  transformIgnorePatterns: ["/node_modules/(?!@firebase)/"],
};

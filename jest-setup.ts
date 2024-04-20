import '@testing-library/react-native/extend-expect';
import {jest} from '@jest/globals';
import 'react-native-gesture-handler/jestSetup';

require('@shopify/flash-list/jestSetup');

jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');

jest.mock('react-native-webview', () => ({
  default: () => jest.fn(), // or any mocked component instead of native view,
}));

jest.mock('react-native-youtube-iframe', () => 'YoutubePlayer');

// jest.mock('react-native-reanimated', () => {
//   const Reanimated = require('react-native-reanimated/mock');
//
//   // The mock for `call` immediately calls the callback which is incorrect
//   // So we override it with a no-op
//   Reanimated.default.call = () => {};
//
//   return Reanimated;
// });

// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

jest.mock('@react-native-firebase/auth', () => {
  return {
    auth: jest.fn(() => {
      return {
        createUserWithEmailAndPassword: jest.fn(),
        signInWithEmailAndPassword: jest.fn(),
        signOut: jest.fn(),
      };
    }),
  };
});

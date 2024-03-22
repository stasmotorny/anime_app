import {jest} from '@jest/globals';

jest.mock('@react-native-firebase/firestore', () =>
  jest.fn().mockReturnValue({
    collection: jest.fn().mockReturnValue({
      doc: jest.fn().mockReturnValue({
        collection: [101922, 1535, 105778, 105398, 30002],
      }),
    }),
  }),
);

import {jest} from '@jest/globals';
import analytics from '@react-native-firebase/analytics';

jest.mock('@react-native-firebase/firestore', () => {
  const mockFirestore: any = jest.fn().mockReturnValue({
    collection: jest.fn().mockReturnValue({
      doc: jest.fn().mockReturnValue({
        collection: [101922, 1535, 105778, 105398, 30002],
        update: jest.fn(() => Promise.resolve('Success')),
      }),
    }),
  });

  mockFirestore.FieldValue = {
    arrayUnion: jest.fn(() => Promise.resolve('Success')),
    arrayRemove: jest.fn(() => Promise.resolve('Success')),
  };

  return mockFirestore;
});

jest.mock('@react-native-firebase/analytics', () => {
  const mockAnalytics: any = jest.fn().mockReturnValue({
    logEvent: jest.fn(() => Promise.resolve('Success')),
  });

  return mockAnalytics;
});

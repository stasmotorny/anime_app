import {jest} from '@jest/globals';

jest.mock('@react-native-firebase/firestore', () => {
  const mockFirestore: any = jest.fn().mockReturnValue({
    collection: jest.fn().mockReturnValue({
      doc: jest.fn().mockReturnValue({
        collection: [101922, 1535, 105778, 105398, 30002],
        update: jest.fn(),
      }),
    }),
  });

  mockFirestore.FieldValue = {
    arrayUnion: jest.fn(),
    arrayRemove: jest.fn(),
  };

  return mockFirestore;
});

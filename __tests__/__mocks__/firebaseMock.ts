import {jest} from '@jest/globals';

// jest.mock('react-native-firebase', () => ({
//   messaging: jest.fn(() => ({
//     hasPermission: jest.fn(() => Promise.resolve(true)),
//     subscribeToTopic: jest.fn(),
//     unsubscribeFromTopic: jest.fn(),
//     requestPermission: jest.fn(() => Promise.resolve(true)),
//     getToken: jest.fn(() => Promise.resolve('myMockToken')),
//   })),
//   notifications: jest.fn(() => ({
//     onNotification: jest.fn(),
//     onNotificationDisplayed: jest.fn(),
//   })),
//   analytics: jest.fn(() => ({
//     logEvent: jest.fn(),
//   })),
//   firestore: jest.fn().mockReturnValue({
//     collection: jest.fn().mockReturnValue({
//       doc: jest.fn().mockReturnValue({
//         "collection": [101922, 1535, 105778, 105398, 30002],
//       }),
//     }),
//   }),
// }));

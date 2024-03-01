import {jest} from '@jest/globals';

// const mockFirebase = jest.fn(() => ({
//   auth: () => ({
//     createUserWithEmailAndPassword: jest.fn(),
//     signInWithEmailAndPassword: jest.fn(),
//     signOut: jest.fn(),
//   }),
// }));
//
// export default mockFirebase;

const mockAuth = jest.fn(() => ({
  createUserWithEmailAndPassword: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
  signOut: jest.fn(),
}));

const mockFirebase = jest.fn(() => ({
  auth: mockAuth,
}));

export default mockFirebase;

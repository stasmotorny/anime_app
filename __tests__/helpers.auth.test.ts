import {
  signupWithEmailAndPassword,
  loginWithEmailAndPassword,
  signOut,
} from '../src/helpers/auth.ts';
import {test, expect, describe, jest} from '@jest/globals';
import mockFirebase from '../__mocks__/@react-native-firebase';
import auth from '@react-native-firebase/auth';

describe('Authentication Functions', () => {
  test('signupWithEmailAndPassword should create user account', async () => {
    const setError = jest.fn();
    await signupWithEmailAndPassword(
      'test@example.com',
      'password123',
      setError,
    );

    // Add your assertions based on the mocked Firebase methods
    expect(auth().createUserWithEmailAndPassword).toHaveBeenCalledWith(
      'test@example.com',
      'password123',
    );
    // You may want to add more assertions based on your use case
  });

  test('loginWithEmailAndPassword should sign in user', async () => {
    const setError = jest.fn();
    await loginWithEmailAndPassword(
      'test@example.com',
      'password123',
      setError,
    );

    // Add your assertions based on the mocked Firebase methods
    expect(
      mockFirebase().auth().signInWithEmailAndPassword,
    ).toHaveBeenCalledWith('test@example.com', 'password123');
    // You may want to add more assertions based on your use case
  });

  test('signOut should sign out user', async () => {
    await signOut();

    // Add your assertions based on the mocked Firebase methods
    expect(mockFirebase().auth().signOut).toHaveBeenCalled();
    // You may want to add more assertions based on your use case
  });
});

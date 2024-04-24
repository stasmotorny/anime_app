import {waitFor} from '@testing-library/react-native';
import {it, expect, jest, beforeEach} from '@jest/globals';
import {
  addNewItemToDB,
  changeItemGroup,
  removeItemFromDB,
} from '../src/reactiveVariablesStore/userCollection.ts';
import firestore from '@react-native-firebase/firestore';

beforeEach(() => {
  jest.clearAllMocks();
});

it('test changeItemGroup', () => {
  // const spy = jest.spyOn(@react-native-firebase/firestore, 'update');
  changeItemGroup(1, 'test group');

  expect(
    firestore().collection('userCollection').doc().update,
  ).toHaveBeenCalled();
  expect(firestore.FieldValue.arrayRemove).toHaveBeenCalled();
  waitFor(() => expect(firestore.FieldValue.arrayUnion).toHaveBeenCalled());
});

it('test removeItemFromDB', () => {
  // const spy = jest.spyOn(@react-native-firebase/firestore, 'update');
  removeItemFromDB(1);

  expect(
    firestore().collection('userCollection').doc().update,
  ).toHaveBeenCalled();
  expect(firestore.FieldValue.arrayRemove).toHaveBeenCalled();
});

it('test addNewItemToDB', () => {
  // const spy = jest.spyOn(@react-native-firebase/firestore, 'update');
  addNewItemToDB({itemGroup: 'test group', itemId: 123});

  expect(
    firestore().collection('userCollection').doc().update,
  ).toHaveBeenCalled();
  expect(firestore.FieldValue.arrayUnion).toHaveBeenCalled();
});

it('test addNewItemToDB with array', () => {
  // const spy = jest.spyOn(@react-native-firebase/firestore, 'update');
  addNewItemToDB([
    {itemGroup: 'test group', itemId: 123},
    {itemGroup: 'test group', itemId: 456},
  ]);

  expect(
    firestore().collection('userCollection').doc().update,
  ).toHaveBeenCalled();
  expect(firestore.FieldValue.arrayUnion).toHaveBeenCalled();
});

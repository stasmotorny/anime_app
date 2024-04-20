import {makeVar} from '@apollo/client';
import {CollectionItem} from '../types/navigation.ts';
import firestore from '@react-native-firebase/firestore';
import {UserData} from './userAuthState.ts';

const user = UserData();

const firebase = firestore().collection('userCollection').doc(user?.user.uid);

export const userCollection = makeVar<CollectionItem[]>([]);

export const findInUserCollectionById = (id: number): CollectionItem => {
  return userCollection().find(item => item.itemId === id)!;
};

export const changeItemGroup = (id: number, newGroup: string) => {
  const itemToChange = findInUserCollectionById(id);
  const changedItem = {...itemToChange, itemGroup: newGroup};

  firebase
    .update({
      collection: firestore.FieldValue.arrayRemove(itemToChange),
    })
    .then(() => {
      firebase
        .update({
          collection: firestore.FieldValue.arrayUnion(changedItem),
        })
        .then(() => console.log('Item group was successfully changed'))
        .catch(error => console.log('Inserting updated item error.', error));
    })
    .catch(error => console.log('Item remove while updating error', error));
};

export const removeItemFromDB = (itemId: number) => {
  firebase
    .update({
      collection: firestore.FieldValue.arrayRemove(
        findInUserCollectionById(itemId),
      ),
    })
    .then(() => console.log('Item was successfully removed'))
    .catch(error => console.log('Item remove error', error));
};

export const addNewItemToDB = (item: CollectionItem | CollectionItem[]) => {
  if (Array.isArray(item)) {
    firebase
      .update({
        collection: firestore.FieldValue.arrayUnion(...item),
      })
      .then(() => console.log('Items were successfully added.'))
      .catch(error => console.log('Items add error', error));
  } else {
    firebase
      .update({
        collection: firestore.FieldValue.arrayUnion(item),
      })
      .then(() => console.log('Item was successfully added.'))
      .catch(error => console.log('Item add error', error));
  }
};

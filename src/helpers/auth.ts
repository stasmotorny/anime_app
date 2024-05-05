import auth from '@react-native-firebase/auth';
import {Errors} from '../types/registrationErros.ts';
import {
  AdditionalUserData,
  UserData,
} from '../reactiveVariablesStore/userAuthState.ts';
import firestore from '@react-native-firebase/firestore';
import {isAdditionalDataGathered} from '../reactiveVariablesStore/isAdditionalDataGatered.ts';
import analytics from '@react-native-firebase/analytics';
import moment from 'moment';

// TODO add password reset functionality auth().sendPasswordResetEmail

export const signupWithEmailAndPassword = (
  email: string,
  password: string,
  setError: (val: Errors) => void,
) => {
  auth()
    .createUserWithEmailAndPassword(email, password)
    .then(response => {
      console.log('User account created & signed in!', response);
      UserData(response);
      firestore()
        .collection('userCollection')
        .doc(response.user.uid)
        .set({collection: []})
        .then(() => {
          console.log('User added!');
        })
        .catch(err => console.log('CREATE_NEW_COLLECTION_ERROR', err));
    })
    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!'); // EMAIL
        setError({
          emailErrors: 'That email address is already in use!',
          passwordErrors: null,
          passwordConfirmationError: null,
        });
      }

      if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!'); // EMAIL
        setError({
          emailErrors: 'That email address is invalid!',
          passwordErrors: null,
          passwordConfirmationError: null,
        });
      }

      console.error(error);
    });
};

export const loginWithEmailAndPassword = (
  email: string,
  password: string,
  setError: (val: Errors) => void,
) => {
  auth()
    .signInWithEmailAndPassword(email, password)
    .then(response => {
      console.log('User signed in!', response);
      UserData(response);
    })
    .catch(error => {
      console.log(error.code);
      if (error.code === 'auth/invalid-credential') {
        console.log('User with this email not found!'); // EMAIL || Password
        setError({
          emailErrors: null,
          passwordErrors: 'Email or/and password are wrong',
          passwordConfirmationError: null,
        });
      }
      if (error.code === 'auth/user-not-found') {
        console.log('User with this email not found!'); // EMAIL
        setError({
          emailErrors: 'User with this email not found!',
          passwordErrors: null,
          passwordConfirmationError: null,
        });
      }

      if (error.code === 'auth/wrong-password') {
        console.log('The password is wrong'); // Password
        setError({
          emailErrors: null,
          passwordErrors: 'The password is wrong',
          passwordConfirmationError: null,
        });
      }

      console.error(error);
    });
};

export const signOut = () => {
  auth()
    .signOut()
    .then(() => {
      console.log('User signed out!');
      UserData(null);
      isAdditionalDataGathered(false);
    });
};

export const gatherAdditionalUserData = (
  uid: string,
  gender: string | null,
  birthDate: Date | null,
) => {
  const userData = {
    gender,
    birthDate,
  };

  firestore()
    .collection('users')
    .doc(uid)
    .set(userData)
    .then(() => {
      console.log('User data added!');
    })
    .catch(err => console.log('ADD_USER_DATA_ERROR', err));
};

export const getAdditionalUserData = async (uid: string) => {
  const additionalData = await firestore()
    .collection('users')
    .doc(uid)
    .get()
    .then(data => data.data());

  AdditionalUserData(additionalData as AdditionalUserData);
  console.log('USER_DATA', AdditionalUserData());
  const userbirthday = additionalData?.birthDate.toDate();
  console.log('years', moment().diff(userbirthday, 'years'));
  analytics()
    .setUserProperties({
      gender: additionalData?.gender,
      age: moment().diff(userbirthday, 'years').toString(),
    })
    .then(() => console.log('ADDITIONAL_DATA_SETTED_TO_ANALYTICS'));
};

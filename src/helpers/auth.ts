import auth from '@react-native-firebase/auth';
import {Errors} from '../types/registrationErros.ts';
import {UserData} from '../reactiveVariablesStore/userAuthState.ts';
import firestore from '@react-native-firebase/firestore';

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
        });
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
    });
};

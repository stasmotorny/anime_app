import {makeVar} from '@apollo/client';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';

type User = FirebaseAuthTypes.UserCredential | null;

export const UserData = makeVar<User>(null);

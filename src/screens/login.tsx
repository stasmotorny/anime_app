import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import validator from 'validator';
// @ts-ignore
import type {StackScreenProps} from '@react-navigation/native-stack';
import {StackParamList} from '../types/navigation.ts';
import {Errors} from '../types/registrationErros.ts';
import {loginWithEmailAndPassword, resetPassword} from '../helpers/auth.ts';
import {Colors} from '../colors/colors.ts';
import { useSignInUser } from '../API/signIn.ts';

type Props = StackScreenProps<StackParamList, 'Login'>;

const Login = (props: Props): React.JSX.Element => {
  const {navigation} = props;
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errors, setErrors] = useState<Errors>({
    emailErrors: null,
    passwordErrors: null,
  });

  const { mutate, isLoading, isError } = useSignInUser();

  const isButtonDisabled: boolean =
    email === '' ||
    password === '' ||
    errors.emailErrors !== null ||
    errors.passwordErrors !== null;

  return (
    <>
      <View style={styles.container}>
        <TextInput
          testID="EmailInput"
          label="Email"
          onChangeText={val => {
            if (validator.isEmail(val)) {
              setErrors(e => ({...e, emailErrors: null}));
              setEmail(val);
            } else {
              setErrors(e => ({...e, emailErrors: 'Invalid email.'}));
            }
          }}
        />
        {errors.emailErrors ? (
          <Text testID="EmailInputError" style={styles.errorMsg}>
            {errors.emailErrors}
          </Text>
        ) : null}
        <TextInput
          testID="PasswordInput"
          label="Password"
          style={styles.secondInput}
          onChangeText={val => {
            if (val.length > 5) {
              setErrors(e => ({...e, passwordErrors: null}));
              setPassword(val);
            } else {
              setErrors(e => ({
                ...e,
                passwordErrors: 'Password is too short.',
              }));
            }
          }}
        />
        {errors.passwordErrors ? (
          <Text testID="PasswordInputError" style={styles.errorMsg}>
            {errors.passwordErrors}
          </Text>
        ) : null}
        <Button
          testID="LoginBtn"
          mode="elevated"
          style={styles.loginBtn}
          onPress={() => {
            console.log('BTN_WAS_PRESSED');
            // loginWithEmailAndPassword(email, password, setErrors);
            mutate({email, password});
          }}
          disabled={isButtonDisabled}>
          Login
        </Button>
        <Button
          testID="SignupBtn"
          onPress={() => navigation.navigate('Sign_up')}>
          Sign up
        </Button>
        {email ? (
          <Button
            testID="ResetPasswordBtn"
            onPress={() => resetPassword(email)}>
            Reset Password
          </Button>
        ) : null}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.white,
  },
  errorMsg: {
    color: Colors.red800,
  },
  loginBtn: {
    marginTop: 48,
    width: '45%',
    alignSelf: 'center',
  },
  secondInput: {marginTop: 16},
});

export default Login;

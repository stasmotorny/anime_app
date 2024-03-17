import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import validator from 'validator';
import {Errors} from '../types/registrationErros.ts';
import {signupWithEmailAndPassword} from '../helpers/auth.ts';
import {Colors} from '../colors/colors.ts';

const SignUp = (): React.JSX.Element => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isPasswordConfirmed, setIsPasswordConfirmed] =
    useState<boolean>(false);
  const [errors, setErrors] = useState<Errors>({
    emailErrors: null,
    passwordErrors: null,
    passwordConfirmationError: null,
  });

  const isButtonDisabled: boolean =
    email === '' ||
    password === '' ||
    errors.emailErrors !== null ||
    errors.passwordErrors !== null ||
    errors.passwordConfirmationError !== null ||
    !isPasswordConfirmed;

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
        <TextInput
          testID="ConfirmPasswordInput"
          label="Confirm password"
          style={styles.secondInput}
          onChangeText={val => {
            if (val === password) {
              setErrors(e => ({...e, passwordConfirmationError: null}));
              setPassword(val);
              setIsPasswordConfirmed(true);
            } else {
              setIsPasswordConfirmed(false);
              setErrors(e => ({
                ...e,
                passwordConfirmationError: 'Password is wrong.',
              }));
            }
          }}
        />
        {errors.passwordConfirmationError ? (
          <Text testID="ConfirmPasswordInputError" style={styles.errorMsg}>
            {errors.passwordConfirmationError}
          </Text>
        ) : null}
        <Button
          testID="LoginBtn"
          mode="elevated"
          style={styles.loginBtn}
          onPress={() => {
            console.log('BTN_WAS_PRESSED');
            signupWithEmailAndPassword(email, password, setErrors);
          }}
          disabled={isButtonDisabled}>
          Sign Up
        </Button>
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
  secondInput: {
    marginTop: 16,
  },
});

export default SignUp;

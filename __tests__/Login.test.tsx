import 'react-native';
import React from 'react';
import App from '../App';
import Login from '../src/screens/login.tsx';
import {render, cleanup, fireEvent, waitFor, screen, userEvent} from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';

// Note: import explicitly to use the types shipped with jest.
import {it, expect, afterEach, describe, jest} from '@jest/globals';

// Screen should contain two inputs, one btn and link to signup screen
// ++++ Test of invalid email (should show error msg)
// ++++ Test of invalid password (should show error msg)
// Test of empty password (should show error msg)
// Test of empty email (should show error msg)
// ++++ Test of proper email (shouldn't display error msg)
// ++++ Test of proper password (shouldn't display error msg)
// If there's email or password errors Login btn should be disabled
// If there's no email or password errors Login btn should be enabled

describe('Login', () => {
  afterEach(cleanup);
  jest.useFakeTimers();

  it('renders email input', () => {
    const {getAllByTestId} = render(<Login />);
    expect(getAllByTestId('EmailInput').length).toBe(1);
  });
  it('renders password input', () => {
    const {getAllByTestId} = render(<Login />);
    expect(getAllByTestId('PasswordInput').length).toBe(1);
  });
  it('error should NOT be displayed if email is VALID', () => {
    const {getByTestId, queryByTestId} = render(<Login />);
    fireEvent.changeText(getByTestId('EmailInput'), 'sf@gt.com');
    expect(queryByTestId('EmailInputError')).toBe(null);
  });
  it('error SHOULD be displayed if email is INVALID', () => {
    const {getByTestId, getAllByTestId} = render(<Login />);
    fireEvent.changeText(getByTestId('EmailInput'), 'sfgt.com');
    expect(getAllByTestId('EmailInputError').length).toBe(1);
  });
  it('error should NOT be displayed if password is VALID', () => {
    const {getByTestId, queryByTestId} = render(<Login />);
    fireEvent.changeText(getByTestId('PasswordInput'), '123456');
    expect(queryByTestId('PasswordInputError')).toBe(null);
  });
  it('error SHOULD be displayed if password is INVALID', () => {
    const {getByTestId, getAllByTestId} = render(<Login />);
    fireEvent.changeText(getByTestId('PasswordInput'), '1234');
    expect(getAllByTestId('PasswordInputError').length).toBe(1);
  });
  it('Button should navigate user to signup screen', () => {
    const navigation = {
      navigate: jest.fn()
    }
    render(
      <Login navigation={navigation} />
    );
    expect(screen.getByText('Login')).toBeOnTheScreen();
    fireEvent.press(screen.getByTestId('SignupBtn'));
    expect(navigation.navigate).toHaveBeenCalledWith('Sign_up');
  });

  // Button enabled/disabled state tests
  // it('Login button should be ENABLED if email and password are VALID', async () => {
  //   const user = userEvent.setup();
  //
  //   const {getByTestId} = render(<App />);
  //   // fireEvent.changeText(getByTestId('EmailInput'), 'sd@gmail.cvom');
  //   // fireEvent.changeText(getByTestId('PasswordInput'), '123456');
  //   await user.type(getByTestId('EmailInput'), 'sd@gmail.cvom');
  //   await user.type(getByTestId('PasswordInput'), '12345');
  //   const button = await screen.findByTestId('LoginBtn');
  //   expect(button.props).toHaveProperty('disabled', false);
  // });
  // it('Login button SHOULD be disabled if password is INVALID', () => {
  //   const {getByTestId} = render(<App />);
  //   fireEvent.changeText(getByTestId('EmailInput'), 'sd@gmail.com');
  //   fireEvent.changeText(getByTestId('PasswordInput'), '123456');
  //   const button = getByTestId('LoginBtn');
  //   expect(button.props).toHaveProperty('accessibilityState.disabled', true);
  // });
});

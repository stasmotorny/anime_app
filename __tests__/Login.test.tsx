import 'react-native';
import React from 'react';
import Login from '../src/screens/login.tsx';
import {
  render,
  cleanup,
  fireEvent,
  screen,
} from '@testing-library/react-native';
import {it, expect, afterEach, describe, jest} from '@jest/globals';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {Provider} from 'react-native-paper';

const testClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const WrapWithProvider = (InnerComponent: React.FC) => {
  return (
    <QueryClientProvider client={testClient}>
      <Provider>
        <InnerComponent />
      </Provider>
    </QueryClientProvider>
  );
};

jest.useFakeTimers();
describe('Login', () => {
  afterEach(cleanup);
  jest.useFakeTimers();

  it('renders email input', () => {
    const {getAllByTestId} = render(WrapWithProvider(Login));
    expect(getAllByTestId('EmailInput').length).toBe(1);
  });
  it('renders password input', () => {
    const {getAllByTestId} = render(WrapWithProvider(Login));
    expect(getAllByTestId('PasswordInput').length).toBe(1);
  });
  it('error should NOT be displayed if email is VALID', () => {
    const {getByTestId, queryByTestId} = render(WrapWithProvider(Login));
    fireEvent.changeText(getByTestId('EmailInput'), 'sf@gt.com');
    expect(queryByTestId('EmailInputError')).toBe(null);
  });
  it('error SHOULD be displayed if email is INVALID', () => {
    const {getByTestId, getAllByTestId} = render(WrapWithProvider(Login));
    fireEvent.changeText(getByTestId('EmailInput'), 'sfgt.com');
    expect(getAllByTestId('EmailInputError').length).toBe(1);
  });
  it('error should NOT be displayed if password is VALID', () => {
    const {getByTestId, queryByTestId} = render(WrapWithProvider(Login));
    fireEvent.changeText(getByTestId('PasswordInput'), '123456');
    expect(queryByTestId('PasswordInputError')).toBe(null);
  });
  it('error SHOULD be displayed if password is INVALID', () => {
    const {getByTestId, getAllByTestId} = render(WrapWithProvider(Login));
    fireEvent.changeText(getByTestId('PasswordInput'), '1234');
    expect(getAllByTestId('PasswordInputError').length).toBe(1);
  });
  it('Button should navigate user to signup screen', () => {
    const navigation = {
      navigate: jest.fn(),
    };
    const LoginWithNav = () => <Login navigation={navigation} />;
    render(WrapWithProvider(LoginWithNav));
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

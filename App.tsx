import React from 'react';
import Login from './src/screens/login.tsx';
import Signup from './src/screens/signup.tsx';
import Home from './src/screens/home.tsx';
import {NavigationContainer} from '@react-navigation/native';
import 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';
import {StackParamList} from './src/types/navigation.ts';

const Stack = createStackNavigator<StackParamList>();

function App(): React.JSX.Element {
  const isLoggedIn = false;
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!isLoggedIn ? (
          <Stack.Group>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Sign_up" component={Signup} />
          </Stack.Group>
        ) : (
          <Stack.Group>
            <Stack.Screen name="Home" component={Home} />
            {/*<Stack.Screen name="Profile" component={Profile} />*/}
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

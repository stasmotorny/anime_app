import {MockedProvider} from '@apollo/client/testing';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

type Args = {
  component: any;
  params?: {};
  mocks?: any;
};

type StackParamList = {
  MockedScreen: any;
};

const Stack = createStackNavigator<StackParamList>();

export const MockedNavigator = ({component, params = {}, mocks}: Args) => {
  return mocks ? (
    <MockedProvider mocks={mocks}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="MockedScreen"
            component={component}
            initialParams={params}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </MockedProvider>
  ) : (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="MockedScreen"
          component={component}
          initialParams={params}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

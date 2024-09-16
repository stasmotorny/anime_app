// import {MockedProvider} from '@apollo/client/testing';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Provider} from 'react-native-paper';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

type Args = {
  component: any;
  params?: {};
  mocks?: any;
};

type StackParamList = {
  MockedScreen: any;
};

const Stack = createStackNavigator<StackParamList>();
export const testClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

export const MockedNavigator = ({component, params = {}, mocks}: Args) => {
  return (
    // <Provider>
    //   <NavigationContainer>
    //     <Stack.Navigator>
    //       <Stack.Screen
    //         name="MockedScreen"
    //         component={component}
    //         initialParams={params}
    //       />
    //     </Stack.Navigator>
    //   </NavigationContainer>
    // </Provider>
    <QueryClientProvider client={testClient}>
      <Provider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="MockedScreen"
              component={component}
              initialParams={params}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </QueryClientProvider>
  );
  // return mocks ? (
  //   <QueryClientProvider client={queryClient}>
  //     <Provider>
  //       <NavigationContainer>
  //         <Stack.Navigator>
  //           <Stack.Screen
  //             name="MockedScreen"
  //             component={component}
  //             initialParams={params}
  //           />
  //         </Stack.Navigator>
  //       </NavigationContainer>
  //     </Provider>
  //   </QueryClientProvider>
  // ) : (
  //   <NavigationContainer>
  //     <Stack.Navigator>
  //       <Stack.Screen
  //         name="MockedScreen"
  //         component={component}
  //         initialParams={params}
  //       />
  //     </Stack.Navigator>
  //   </NavigationContainer>
  // );
};

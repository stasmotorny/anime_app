import React from 'react';
import Login from './src/screens/login.tsx';
import Signup from './src/screens/signup.tsx';
import {NavigationContainer} from '@react-navigation/native';
import 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';
import {StackParamList} from './src/types/navigation.ts';
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import {useReactiveVar} from '@apollo/client';
import {UserData} from './src/reactiveVariablesStore/userAuthState.ts';
import PaperBottomNavigation from './src/navigators/paperBottomNavigation.tsx';
import {Details} from './src/screens/details.tsx';
import 'react-native-devsettings';
import {Calendar} from './src/screens/calendar.tsx';

const Stack = createStackNavigator<StackParamList>();

// TODO try to set unique Page id and merge media from different queries or
//  reset store on screen change client.resetStore()

const client = new ApolloClient({
  uri: 'https://graphql.anilist.co',
  // cache: new InMemoryCache()
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          Page: {merge: true},
        },
      },
    },
  }),
});

function App(): React.JSX.Element {
  const isLoggedIn = useReactiveVar(UserData);
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator>
          {!isLoggedIn ? (
            <Stack.Group>
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Sign_up" component={Signup} />
            </Stack.Group>
          ) : (
            <Stack.Group>
              <Stack.Screen
                name="Home"
                component={PaperBottomNavigation}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="Details"
                component={Details}
                options={{headerShown: true}}
              />
              <Stack.Screen name="Calendar" component={Calendar} />
            </Stack.Group>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}

export default App;

import {AgendaSchedule} from 'react-native-calendars';

export type StackParamList = {
  Login: undefined;
  Sign_up: undefined;
  Home: undefined;
  Details: {itemId: number};
  Calendar: {items: AgendaSchedule};
};

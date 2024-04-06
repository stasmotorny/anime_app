import {AgendaSchedule} from 'react-native-calendars';
import {Media} from '../API/__generated__/graphql.ts';

export type StackParamList = {
  Login: undefined;
  Sign_up: undefined;
  Home: undefined;
  Details: {itemId: number};
  Calendar: {items: AgendaSchedule};
  Choose_related_items: {
    relatedItems: Media[];
    mainItemId: number;
  };
};

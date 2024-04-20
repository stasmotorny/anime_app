import {Media} from '../API/__generated__/graphql.ts';
import {FormattedSchedule} from './schedule.ts';

export type StackParamList = {
  Login: undefined;
  Sign_up: undefined;
  Home: undefined;
  Details: {itemId: number};
  Calendar: {items: FormattedSchedule};
  Choose_related_items: {
    relatedItems: Media[];
    mainItem: CollectionItem;
  };
};

export type CollectionItem = {
  itemId: number;
  itemGroup: string;
};

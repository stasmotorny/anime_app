import {MediaStatus} from '../API/__generated__/graphql.ts';

export type Filter = {
  [key: string]: string | number | null;
  name: string;
  genre: string;
  startDate_greater: number | null;
  status: MediaStatus | null;
  startDate_lesser: number | null;
};

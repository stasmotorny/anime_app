import {Filter} from '../types/filter.ts';
import {MediaSort} from '../API/__generated__/graphql.ts';

export const updateQueryVariable = (
  searchQuery: Filter,
  sortType: MediaSort,
) => {
  return {
    page: 1,
    perPage: 50,
    sortType: sortType,
    ...(searchQuery.name && {name: searchQuery.name}),
    ...(searchQuery.genre && {genre: searchQuery.genre}),
    ...(searchQuery.status && {status: searchQuery.status}),
    ...(searchQuery.startDate_greater && {
      startDate_greater: Number(`${searchQuery.startDate_greater}0000`),
    }),
    ...(searchQuery.startDate_lesser && {
      startDate_lesser: Number(`${searchQuery.startDate_lesser}0000`),
    }),
  };
};

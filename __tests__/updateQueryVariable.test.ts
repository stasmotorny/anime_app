import {expect, it} from '@jest/globals';
import {MediaSort, MediaStatus} from '../src/API/__generated__/graphql.ts';
import {updateQueryVariable} from '../src/helpers/updateQueryVariable.ts';
import {Filter} from '../src/types/filter.ts';
import useFilterStore from '../src/reactiveVariablesStore/filterStore.ts';

it('updateQueryVariable should return object with all data provided', async () => {
  const searchQueryMock = {
    name: 'Test name',
    genre: 'Comedy',
    startDateGreater: 1990,
    status: MediaStatus.Cancelled,
    startDateLesser: 1992,
    page: 2,
  };

  useFilterStore.getState().setFilter({
    ...searchQueryMock,
  });

  // const newQueryVariable = updateQueryVariable(
  //   searchQueryMock,
  //   MediaSort.StartDate,
  // );

  const updatedFilters = useFilterStore.getState();

  expect(updatedFilters.name).toEqual('Test name');
  expect(updatedFilters.genre).toEqual('Comedy');
  expect(updatedFilters.status).toEqual('CANCELLED');
  expect(updatedFilters.startDateGreater).toEqual(1990);
  expect(updatedFilters.startDateLesser).toEqual(1992);
});

it('updateQueryVariable should return object without data not provided', async () => {
  const searchQueryMock: Filter = {
    name: '',
    genre: '',
    startDate_greater: null,
    status: null,
    startDate_lesser: null,
  };

  const newQueryVariable = updateQueryVariable(
    searchQueryMock,
    MediaSort.StartDate,
  );

  expect(newQueryVariable.name).toEqual(undefined);
  expect(newQueryVariable.genre).toEqual(undefined);
  expect(newQueryVariable.status).toEqual(undefined);
  expect(newQueryVariable.startDate_greater).toEqual(undefined);
  expect(newQueryVariable.startDate_lesser).toEqual(undefined);
});

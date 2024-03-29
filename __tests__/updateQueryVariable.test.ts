import {expect, it} from '@jest/globals';
import {MediaSort, MediaStatus} from '../src/API/__generated__/graphql.ts';
import {updateQueryVariable} from '../src/helpers/updateQueryVariable.ts';
import {Filter} from '../src/types/filter.ts';

it('updateQueryVariable should return object with all data provided', async () => {
  const searchQueryMock: Filter = {
    name: 'Test name',
    genre: 'Comedy',
    startDate_greater: 1990,
    status: MediaStatus.Cancelled,
    startDate_lesser: 1992,
  };

  const newQueryVariable = updateQueryVariable(
    searchQueryMock,
    MediaSort.StartDate,
  );

  expect(newQueryVariable.name).toEqual('Test name');
  expect(newQueryVariable.genre).toEqual('Comedy');
  expect(newQueryVariable.status).toEqual('CANCELLED');
  expect(newQueryVariable.startDate_greater).toEqual(19900000);
  expect(newQueryVariable.startDate_lesser).toEqual(19920000);
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

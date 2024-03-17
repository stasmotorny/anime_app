import {makeVar} from '@apollo/client';
import {Filter} from '../types/filter.ts';

export const initialFilterState: Filter = {
  name: '',
  genre: '',
  startDate_greater: null,
  status: null,
  startDate_lesser: null,
};

export const filterState = makeVar<Filter>(initialFilterState);

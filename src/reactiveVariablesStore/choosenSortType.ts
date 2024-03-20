import {makeVar} from '@apollo/client';
import {MediaSort} from '../API/__generated__/graphql.ts';

export const chosenSortType = makeVar<MediaSort>(MediaSort.PopularityDesc);

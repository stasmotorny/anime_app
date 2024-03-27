import React from 'react';
import {Media, useGetMangaListQuery} from '../API/__generated__/graphql.ts';
import {useReactiveVar} from '@apollo/client';
import {filterState} from '../reactiveVariablesStore/filterState.ts';
import {currentScreen} from '../reactiveVariablesStore/currentScreen.ts';
import {updateQueryVariable} from '../helpers/updateQueryVariable.ts';
import {chosenSortType} from '../reactiveVariablesStore/choosenSortType.ts';
import {ScreenScroll} from '../components/screenScroll.tsx';

export const Manga = () => {
  const searchQuery = useReactiveVar(filterState);
  const sortType = useReactiveVar(chosenSortType);
  const screen = useReactiveVar(currentScreen);

  const {data, loading, error, fetchMore} = useGetMangaListQuery({
    variables: updateQueryVariable(searchQuery, sortType),
    skip: screen !== 'Manga',
  });

  return (
    <ScreenScroll
      data={data?.Page?.media as Media[]}
      fetchMore={fetchMore}
      error={error}
      loading={loading}
    />
  );
};

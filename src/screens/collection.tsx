import React from 'react';
import {
  Media,
  useGetUserCollectionQuery,
} from '../API/__generated__/graphql.ts';
import {updateQueryVariable} from '../helpers/updateQueryVariable.ts';
import {useReactiveVar} from '@apollo/client';
import {filterState} from '../reactiveVariablesStore/filterState.ts';
import {chosenSortType} from '../reactiveVariablesStore/choosenSortType.ts';
import {currentScreen} from '../reactiveVariablesStore/currentScreen.ts';
import {userCollection} from '../reactiveVariablesStore/userCollection.ts';
import {ScreenScroll} from '../components/screenScroll.tsx';

export const Collection = () => {
  const searchQuery = useReactiveVar(filterState);
  const sortType = useReactiveVar(chosenSortType);
  const screen = useReactiveVar(currentScreen);
  const userCollectionFromStore = useReactiveVar(userCollection);

  const {data, loading, error} = useGetUserCollectionQuery({
    variables: {
      ...updateQueryVariable(searchQuery, sortType),
      ...(userCollectionFromStore.length && {ids: userCollectionFromStore}),
    },
    skip: screen !== 'Collection' || !userCollectionFromStore.length,
  });

  return (
    <ScreenScroll
      data={data?.Page?.media as Media[]}
      error={error}
      loading={loading}
    />
  );
};

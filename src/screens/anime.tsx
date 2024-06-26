import React, {useState} from 'react';
import {Media, useGetAnimeListQuery} from '../API/__generated__/graphql.ts';
import {useReactiveVar} from '@apollo/client';
import {filterState} from '../reactiveVariablesStore/filterState.ts';
import {currentScreen} from '../reactiveVariablesStore/currentScreen.ts';
import {updateQueryVariable} from '../helpers/updateQueryVariable.ts';
import {chosenSortType} from '../reactiveVariablesStore/choosenSortType.ts';
import {ScreenScroll} from '../components/screenScroll.tsx';
import {UserData} from '../reactiveVariablesStore/userAuthState.ts';
import GatherAdditionalUserData from './gatherAdditionalUserData.tsx';
import {isAdditionalDataGathered} from '../reactiveVariablesStore/isAdditionalDataGatered.ts';

export const Anime = (): React.JSX.Element => {
  const searchQuery = useReactiveVar(filterState);
  const sortType = useReactiveVar(chosenSortType);
  const screen = useReactiveVar(currentScreen);
  const user = useReactiveVar(UserData);
  const isGathered = useReactiveVar(isAdditionalDataGathered);

  const {data, loading, error, fetchMore} = useGetAnimeListQuery({
    variables: updateQueryVariable(searchQuery, sortType),
    skip: screen !== 'Anime',
  });

  // return user?.additionalUserInfo?.isNewUser && !isGathered ? (
  //   <GatherAdditionalUserData />
  // ) : (
  //   <ScreenScroll
  //     data={data?.Page?.media as Media[]}
  //     fetchMore={fetchMore}
  //     error={error}
  //     loading={loading}
  //   />
  // );
  return (
    <ScreenScroll
      data={data?.Page?.media as Media[]}
      fetchMore={fetchMore}
      error={error}
      loading={loading}
    />
  );
};

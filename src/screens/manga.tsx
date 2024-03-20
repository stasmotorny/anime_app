import React from 'react';
import {useGetMangaListQuery} from '../API/__generated__/graphql.ts';
import {FlatList, View} from 'react-native';
import {ListItem} from '../components/listItem.tsx';
import {ScreenError} from '../components/screenError.tsx';
import {GlobalStyles} from '../globalStyles/globalStyles.ts';
import {ScreenLoadingSpinner} from '../components/screenLoadingSpinner.tsx';
import {useReactiveVar} from '@apollo/client';
import {filterState} from '../reactiveVariablesStore/filterState.ts';
import {currentScreen} from '../reactiveVariablesStore/currentScreen.ts';
import {updateQueryVariable} from '../helpers/updateQueryVariable.ts';
import {chosenSortType} from '../reactiveVariablesStore/choosenSortType.ts';

export const Manga = () => {
  const searchQuery = useReactiveVar(filterState);
  const sortType = useReactiveVar(chosenSortType);
  const screen = useReactiveVar(currentScreen);

  const {data, loading, error} = useGetMangaListQuery({
    variables: updateQueryVariable(searchQuery, sortType),
    skip: screen !== 'Manga',
  });

  if (loading) {
    return <ScreenLoadingSpinner />;
  }

  if (error || !data?.Page?.media) {
    return <ScreenError />;
  }

  return (
    <View style={GlobalStyles.screenContainer}>
      <FlatList
        data={data?.Page?.media}
        renderItem={({item}) => <ListItem item={item!} />}
        style={GlobalStyles.screenFlatList}
      />
    </View>
  );
};

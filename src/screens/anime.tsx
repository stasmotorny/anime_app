import React from 'react';
import {FlatList, View} from 'react-native';
import {useGetAnimeListQuery} from '../API/__generated__/graphql.ts';
import {ListItem} from '../components/listItem.tsx';
import {useReactiveVar} from '@apollo/client';
import {filterState} from '../reactiveVariablesStore/filterState.ts';
import {ScreenError} from '../components/screenError.tsx';
import {GlobalStyles} from '../globalStyles/globalStyles.ts';
import {ScreenLoadingSpinner} from '../components/screenLoadingSpinner.tsx';
import {currentScreen} from '../reactiveVariablesStore/currentScreen.ts';
import {updateQueryVariable} from '../helpers/updateQueryVariable.ts';
import {chosenSortType} from '../reactiveVariablesStore/choosenSortType.ts';
export const Anime = (): React.JSX.Element => {
  const searchQuery = useReactiveVar(filterState);
  const sortType = useReactiveVar(chosenSortType);
  const screen = useReactiveVar(currentScreen);

  const {data, loading, error} = useGetAnimeListQuery({
    variables: updateQueryVariable(searchQuery, sortType),
    skip: screen !== 'Anime',
  });

  if (loading) {
    return <ScreenLoadingSpinner />;
  }

  if (error || !data?.Page?.media || !data?.Page?.media.length) {
    console.log(error);
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

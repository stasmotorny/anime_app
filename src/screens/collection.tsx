import React from 'react';
import {useGetUserCollectionQuery} from '../API/__generated__/graphql.ts';
import {updateQueryVariable} from '../helpers/updateQueryVariable.ts';
import {useReactiveVar} from '@apollo/client';
import {filterState} from '../reactiveVariablesStore/filterState.ts';
import {chosenSortType} from '../reactiveVariablesStore/choosenSortType.ts';
import {currentScreen} from '../reactiveVariablesStore/currentScreen.ts';
import {GlobalStyles} from '../globalStyles/globalStyles.ts';
import {FlatList, View} from 'react-native';
import {ListItem} from '../components/listItem.tsx';
import {userCollection} from '../reactiveVariablesStore/userCollection.ts';
import {ScreenLoadingSpinner} from '../components/screenLoadingSpinner.tsx';
import {ScreenError} from '../components/screenError.tsx';

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

  if (loading) {
    return <ScreenLoadingSpinner />;
  }

  if (error) {
    console.log(error);
    return <ScreenError />;
  }

  return (
    <View style={GlobalStyles.screenContainer}>
      <FlatList
        data={data?.Page?.media}
        renderItem={({item}) => (
          <ListItem
            item={item!}
            isInCollection={userCollectionFromStore.includes(item!.id)}
          />
        )}
        style={GlobalStyles.screenFlatList}
      />
    </View>
  );
};

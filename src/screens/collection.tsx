import React, {useEffect} from 'react';
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
import {FAB} from 'react-native-paper';
import {StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {StackParamList} from '../types/navigation.ts';

export const Collection = () => {
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();
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

  const schedule: any = {};

  useEffect(() => {
    if (data?.Page?.media) {
      data.Page.media.forEach(item => {
        if (item?.nextAiringEpisode) {
          const date = new Date(item.nextAiringEpisode.airingAt * 1000);
          const year = date.getFullYear();
          const month = date.getMonth() + 1;
          const day = date.getDate();
          const scheduleItem = `${year}-${
            month.toString().length > 1 ? month : `0${month}`
          }-${day.toString().length > 1 ? day : `0${day}`}`;
          schedule[scheduleItem]
            ? schedule[scheduleItem].push({
                name: item.title?.english ? item.title.english : 'Unknown',
                episode: item.nextAiringEpisode.episode || 'Unknown',
                id: item.id,
              })
            : (schedule[scheduleItem] = [
                {
                  name: item.title?.english ? item.title.english : 'Unknown',
                  episode: item.nextAiringEpisode.episode || 'Unknown',
                  id: item.id,
                },
              ]);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <>
      <ScreenScroll
        data={data?.Page?.media as Media[]}
        error={error}
        loading={loading}
      />
      <FAB
        icon="calendar"
        style={styles.fab}
        onPress={() => navigation.navigate('Calendar', {items: schedule})}
      />
    </>
  );
};

const styles = StyleSheet.create({
  fab: {
    opacity: 0.8,
    position: 'absolute',
    margin: 16,
    right: 10,
    bottom: 10,
  },
});

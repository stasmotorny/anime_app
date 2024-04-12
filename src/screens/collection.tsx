import React, {useEffect, useState} from 'react';
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
import {Text, Divider, FAB, List} from 'react-native-paper';
import {ScrollView, StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {StackParamList} from '../types/navigation.ts';
import {groupItems} from '../helpers/groupingItems.ts';
import {GroupedItems} from '../types/groupedItems.ts';
import {Colors} from '../colors/colors.ts';

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

  const [groupedItems, setGroupedItems] = useState<GroupedItems>({
    anime: [],
    manga: [],
  });

  const schedule: any = {};

  useEffect(() => {
    if (data?.Page?.media && data.Page.media.length) {
      setGroupedItems(groupItems(data.Page.media as Media[]));
    }
  }, [data]);

  useEffect(() => {
    console.log('GROUPED_ITEMS', groupedItems);
  }, [groupedItems]);

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
    <View style={styles.container}>
      <ScrollView style={styles.scrollview}>
        <List.Accordion
          title="Anime"
          titleStyle={{color: Colors.white}}
          id="1"
          style={{backgroundColor: Colors.grey900}}>
          {groupedItems.anime.length ? (
            <ScreenScroll
              data={groupedItems.anime}
              error={error}
              loading={loading}
            />
          ) : (
            <Text>No items in collection</Text>
          )}
        </List.Accordion>
        <Divider style={styles.divider} />
        <List.Accordion
          title="Manga"
          id="2"
          titleStyle={{color: Colors.white}}
          style={{backgroundColor: Colors.grey900}}>
          <ScreenScroll
            data={groupedItems.manga}
            error={error}
            loading={loading}
          />
        </List.Accordion>
      </ScrollView>
      <FAB
        icon="calendar"
        style={styles.fab}
        onPress={() => navigation.navigate('Calendar', {items: schedule})}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  scrollview: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  fab: {
    opacity: 0.8,
    position: 'absolute',
    margin: 16,
    right: 10,
    bottom: 10,
  },
  divider: {
    marginVertical: 8,
  },
});

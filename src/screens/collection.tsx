import React, {useEffect, useState} from 'react';
import {
  Media
} from '../API/__generated__/graphql.ts';
import {useReactiveVar} from '@apollo/client';
import {ActivityIndicator, FAB, Text} from 'react-native-paper';
import {ScrollView, StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {StackParamList} from '../types/navigation.ts';
import {groupItemsWithUserGroups} from '../helpers/groupingItems.ts';
import {Colors} from '../colors/colors.ts';
import {Groups} from '../components/groupedItems.tsx';
import {GroupedObject} from '../types/groupedObject.ts';
import {FormattedSchedule} from '../types/schedule.ts';
import useUserCollectionStore from '../store/userCollectionStore.ts';
import {useGetDetailedCollection} from '../API/getDetailedCollection.ts';
import useFilterStore from '../store/filterStore.ts';
import useCurrentScreenStore from '../store/currentScreenStore.ts';
import useSortTyperStore from '../store/sortingTypeStore.ts';

export const Collection = () => {
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();
  const {sortType} = useSortTyperStore();
  const {collection: userCollectionFromStore} = useUserCollectionStore();
  const {name, genre, startDateGreater, status, startDateLesser, page } = useFilterStore();

  let params: any = {
    page,
    sortType,
    ...(name && {name}),
    ...(genre && {genre}),
    ...(startDateGreater && {startDateGreater}),
    ...(status && {status}),
    ...(startDateLesser && {startDateLesser}),
    ids: userCollectionFromStore.map(
      collectionItem => collectionItem.item_id,
    ),
  };

  const {data, isLoading, error} = useGetDetailedCollection(params);

  const [groupedItems, setGroupedItems] = useState<GroupedObject>({
    anime: [],
    manga: [],
  });
  const [schedule, setSchedule] = useState<FormattedSchedule>({});

  useEffect(() => {
    if (data?.Page?.media && data.Page.media.length) {
      setGroupedItems(
        groupItemsWithUserGroups(
          data.Page.media as Media[],
          userCollectionFromStore,
        ),
      );
    }
  }, [data, userCollectionFromStore]);

  useEffect(() => {
    if (data?.Page?.media && data.Page.media.length) {
      groupItemsWithUserGroups(
        data.Page.media as Media[],
        userCollectionFromStore,
      );
    }
  }, [data, userCollectionFromStore]);

  useEffect(() => {
    if (data?.Page?.media) {
      const formattedSchedule: FormattedSchedule = {};

      data.Page.media.forEach((item: Media) => {
        if (item?.nextAiringEpisode) {
          const date = new Date(item.nextAiringEpisode.airingAt * 1000);
          const year = date.getFullYear();
          const month = date.getMonth() + 1;
          const day = date.getDate();

          const scheduleItem = `${year}-${
            month.toString().length > 1 ? month : `0${month}`
          }-${day.toString().length > 1 ? day : `0${day}`}`;

          formattedSchedule[scheduleItem]
            ? formattedSchedule[scheduleItem].push({
                name: item.title?.english ? item.title.english : 'Unknown',
                episode: item.nextAiringEpisode.episode || 'Unknown',
                id: item.id,
              })
            : (formattedSchedule[scheduleItem] = [
                {
                  name: item.title?.english ? item.title.english : 'Unknown',
                  episode: item.nextAiringEpisode.episode || 'Unknown',
                  id: item.id,
                },
              ]);

          setSchedule(formattedSchedule);
        }
      });
    }
  }, [data]);

  const onFABPress = (scheduleArg: FormattedSchedule) => {
    navigation.navigate('Calendar', {items: scheduleArg});
  };

  if (isLoading) {
    return (
      <ActivityIndicator
        testID="activity-indicator"
        animating={true}
        color={Colors.red800}
      />
    );
  }

  if (error || !data || !data.Page?.media) {
    return (
      <Text variant="headlineSmall" style={styles.error}>
        Failed to load data
      </Text>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollview}>
        {data?.Page?.media && data.Page.media.length ? (
          <Groups groupedItems={groupedItems} />
        ) : null}
      </ScrollView>
      <FAB
        icon="calendar"
        style={styles.fab}
        onPress={() => {
          onFABPress(schedule);
        }}
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
  error: {
    color: Colors.red800,
  },
});

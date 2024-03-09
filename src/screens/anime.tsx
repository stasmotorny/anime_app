import React from 'react';
import {FlatList, View, StyleSheet} from 'react-native';
import {MediaSort, useGetAnimeListQuery} from '../API/__generated__/graphql.ts';
import {ActivityIndicator, Text} from 'react-native-paper';
import {ListItem} from '../components/listItem.tsx';
import {Colors} from '../colors/colors.ts';

export const Anime = (): React.JSX.Element => {
  const {data, loading, error} = useGetAnimeListQuery({
    variables: {
      page: 1,
      perPage: 50,
      sortType: MediaSort.PopularityDesc,
      name: 'demon slayer',
    },
  });

  if (loading) {
    return (
      <ActivityIndicator
        testID="activity-indicator"
        animating={true}
        color={Colors.red800}
      />
    );
  }

  if (error || !data?.Page?.media) {
    return (
      <Text variant="headlineSmall" style={styles.error}>
        Failed to load data
      </Text>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data?.Page?.media}
        renderItem={({item}) => <ListItem item={item!} />}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    backgroundColor: Colors.black,
  },
  list: {
    backgroundColor: Colors.black,
    paddingTop: 12,
  },
  error: {
    color: Colors.red800,
  },
});

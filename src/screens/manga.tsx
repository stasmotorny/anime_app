import React from "react";
import { MediaSort, useGetMangaListQuery } from "../API/__generated__/graphql.ts";
import { ActivityIndicator, MD2Colors, Text } from "react-native-paper";
import { FlatList, StyleSheet, View } from "react-native";
import { ListItem } from "../components/listItem.tsx";

export const Manga = () => {
  const {data, loading, error} = useGetMangaListQuery({
    variables: {
      page: 1,
      perPage: 50,
      sortType: MediaSort.PopularityDesc,
      name: 'demon slayer',
    },
  });

  if (loading) {
    return <ActivityIndicator animating={true} color={MD2Colors.red800} />;
  }

  if (error) {
    return <Text variant="headlineSmall" style={styles.error}>Failed to load data</Text>
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
  },
  list: {
    backgroundColor: MD2Colors.white,
    paddingTop: 12
  },
  error: {
    color: MD2Colors.red800
  }
});

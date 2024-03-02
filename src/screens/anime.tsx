import React, {useEffect} from 'react';
import {FlatList, View} from 'react-native';
import {MediaSort, useGetAnimeListQuery} from '../API/__generated__/graphql.ts';
import {ActivityIndicator, MD2Colors} from 'react-native-paper';
import {ListItem} from '../components/listItem.tsx';

export const Anime = (): React.JSX.Element => {
  const {data, loading, error} = useGetAnimeListQuery({
    variables: {
      page: 1,
      perPage: 50,
      sortType: MediaSort.PopularityDesc,
      name: 'demon slayer',
    },
  });

  useEffect(() => {
    if (data && data.Page && data.Page.media) {
      console.log(data.Page.media[0]);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [error]);

  if (loading) {
    return <ActivityIndicator animating={true} color={MD2Colors.red800} />;
  }

  return (
    <View style={{paddingHorizontal: 12}}>
      <FlatList
        data={data?.Page?.media}
        renderItem={({item}) => <ListItem item={item!} />}
        style={{backgroundColor: '#ffffff', paddingTop: 12}}
      />
    </View>
  );
};

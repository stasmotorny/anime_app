import {Media} from '../API/__generated__/graphql.ts';
import {Card, Text} from 'react-native-paper';
import {View} from 'react-native';
import React from 'react';

export const ListItem = ({item}: {item: Media}) => {
  return (
    <Card
      contentStyle={{flexDirection: 'row'}}
      style={{paddingHorizontal: 12, marginBottom: 12}}>
      <Card.Cover
        source={{uri: item?.coverImage?.medium!}}
        resizeMode="contain"
        style={{width: 70, height: 120}}
      />
      <View style={{width: '60%'}}>
        <Card.Title
          title={item?.title?.english || 'Unknown'}
          titleNumberOfLines={2}
        />
        <Card.Content style={{width: '100%'}}>
          <Text variant="titleMedium">Status</Text>
          <Text variant="bodySmall">{item?.status}</Text>
        </Card.Content>
      </View>
    </Card>
  );
};

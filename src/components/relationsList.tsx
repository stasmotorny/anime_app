import React from 'react';
import {Colors} from '../colors/colors.ts';
import {Card, Text} from 'react-native-paper';
import {RelatedItem} from './relatedItem.tsx';
import {Media} from '../API/__generated__/graphql.ts';
import {StyleSheet} from 'react-native';

type Props = {
  data: (Media | null)[] | null | undefined;
};

export const RelationsList = (props: Props) => {
  const {data} = props;
  const relations = data ? data : 'Relations were not found.';
  return (
    <Card testID="relations-card" style={styles.cardStyle}>
      <Card.Title
        title="Relations:"
        titleNumberOfLines={1}
        titleStyle={styles.cardTitle}
      />
      <Card.Content>
        {typeof relations !== 'string' ? (
          data?.map(item => {
            if (item) {
              return <RelatedItem item={item} key={item.id} />;
            }
          })
        ) : (
          <Text style={styles.textStyle}>{relations}</Text>
        )}
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  cardStyle: {
    backgroundColor: Colors.grey900,
    marginTop: 16,
  },
  cardTitle: {
    color: Colors.white,
    fontWeight: 'bold',
  },
  textStyle: {
    color: Colors.white,
  },
});

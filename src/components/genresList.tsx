import React from 'react';
import {Colors} from '../colors/colors.ts';
import { Card, Chip, Text } from "react-native-paper";
import {StyleSheet, View} from 'react-native';

type Props = {
  data: (string | null)[] | null | undefined;
};

export const GenresList = (props: Props) => {
  const {data} = props;
  const genres = data ? data : 'Genres were not specified';

  return (
    <Card style={styles.cardStyle}>
      <Card.Title
        title="Genres:"
        titleNumberOfLines={1}
        titleStyle={styles.cardTitle}
      />
      <Card.Content>
        <View style={styles.genresContainer}>
          {typeof genres !== 'string' ? genres.map(item => {
            if (item) {
              return (
                <Chip
                  compact={true}
                  style={styles.chipStyle}
                  textStyle={styles.chipText}>
                  {item}
                </Chip>
              );
            }
          }) : <Text style={styles.textStyle}>{genres}</Text>}
        </View>
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
  genresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  chipStyle: {
    marginRight: 6,
    backgroundColor: Colors.black,
  },
  chipText: {
    color: Colors.white,
    fontSize: 12,
  },
  textStyle: {
    color: Colors.white
  },
});

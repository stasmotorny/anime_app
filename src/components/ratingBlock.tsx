import React from 'react';
import {Colors} from '../colors/colors.ts';
import {Avatar, Card} from 'react-native-paper';
import {StyleSheet} from 'react-native';

type Props = {
  score?: string;
};

export const RatingBlock = (props: Props) => {
  const {score} = props;
  return (
    <Card style={styles.cardStyle}>
      <Card.Title
        title="Rating:"
        style={styles.cardTitle}
        titleStyle={styles.cardTitleText}
      />
      <Card.Content style={styles.cardContent}>
        <Avatar.Text label={score || '??'} />
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
    width: '50%',
  },
  cardTitleText: {
    color: Colors.white,
    fontWeight: 'bold',
  },
  cardContent: {
    alignItems: 'center',
  },
});

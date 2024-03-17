import React from 'react';
import {Avatar, Card} from 'react-native-paper';
import {StyleSheet} from 'react-native';
import {GlobalStyles} from '../globalStyles/globalStyles.ts';

type Props = {
  score?: string;
};

export const RatingBlock = (props: Props) => {
  const {score} = props;
  return (
    <Card testID="card-rating" style={GlobalStyles.detailsCardStyle}>
      <Card.Title
        title="Rating:"
        titleStyle={GlobalStyles.detailsCardTitleText}
      />
      <Card.Content style={styles.cardContent}>
        <Avatar.Text label={score || '??'} />
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  cardContent: {
    alignItems: 'center',
  },
});

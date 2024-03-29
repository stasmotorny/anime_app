import React, {useEffect} from 'react';
import {Text, ActivityIndicator} from 'react-native-paper';
import {StackParamList} from '../types/navigation.ts';
import {StackScreenProps} from '@react-navigation/stack';
import {useGetDetailsQuery} from '../API/__generated__/graphql.ts';
import {StyleSheet, ScrollView} from 'react-native';
import {Colors} from '../colors/colors.ts';
import {RelationsList} from '../components/relationsList.tsx';
import {GenresList} from '../components/genresList.tsx';
import {RatingBlock} from '../components/ratingBlock.tsx';
import {Description} from '../components/description.tsx';
import {GradientImageWithText} from '../components/gradientImageWithText.tsx';

type Props = StackScreenProps<StackParamList, 'Details'>;

export const Details = (props: Props) => {
  const {itemId} = props.route.params;

  const {data, loading, error} = useGetDetailsQuery({
    variables: {
      id: itemId,
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

  if (error || !data || !data.Media) {
    return (
      <Text variant="headlineSmall" style={styles.error}>
        Failed to load data
      </Text>
    );
  }

  return (
    <ScrollView style={styles.scrollViewStyle}>
      <GradientImageWithText
        imgUrl={data?.Media?.coverImage?.large!}
        score={
          data?.Media?.averageScore
            ? data.Media.averageScore.toString()
            : undefined
        }
        title={data?.Media?.title?.english}
      />
      <GenresList data={data?.Media?.genres} />
      <RatingBlock
        score={
          data?.Media?.averageScore
            ? data.Media.averageScore.toString()
            : undefined
        }
      />
      <RelationsList data={data?.Media?.relations?.nodes} />
      <Description description={data?.Media?.description} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  error: {
    color: Colors.red800,
  },
  scrollViewStyle: {
    flex: 1,
    backgroundColor: Colors.black,
  },
});

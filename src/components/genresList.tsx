import React from 'react';
import {Card, Text} from 'react-native-paper';
import {GlobalStyles} from '../globalStyles/globalStyles.ts';
import {SurfaceWithChips} from './surfaceWithChips.tsx';

type Props = {
  data: (string | null)[] | null | undefined;
};

export const GenresList = (props: Props) => {
  const {data} = props;

  const cleanGenresFromNull = (arr: (string | null)[]): string[] => {
    return arr.filter((item): item is string => item !== null);
  };

  return (
    <Card testID="genres-card" style={GlobalStyles.detailsCardStyle}>
      <Card.Title
        title="Genres:"
        titleNumberOfLines={1}
        titleStyle={GlobalStyles.detailsCardTitleText}
      />
      <Card.Content>
        {data ? (
          <SurfaceWithChips
            isSelectedCheckParameter={null}
            itemsArray={cleanGenresFromNull(data)}
            isDark
          />
        ) : (
          <Text style={GlobalStyles.darkSchemeTextStyle}>
            Genres were not specified
          </Text>
        )}
      </Card.Content>
    </Card>
  );
};

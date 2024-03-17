import React from 'react';
import {Card, Text} from 'react-native-paper';
import {GlobalStyles} from '../globalStyles/globalStyles.ts';

type Props = {
  description: string | null | undefined;
};

export const Description = (props: Props) => {
  const {description} = props;
  const regex = /(<([^>]+)>)/gi;
  const descriptionText = description
    ? description.replace(regex, '')
    : 'Description was not found';

  return (
    <Card testID="description-card" style={GlobalStyles.detailsCardStyle}>
      <Card.Title
        title="Description:"
        titleNumberOfLines={1}
        titleStyle={GlobalStyles.detailsCardTitleText}
      />
      <Card.Content>
        <Text variant="bodySmall" style={GlobalStyles.darkSchemeTextStyle}>
          {descriptionText}
        </Text>
      </Card.Content>
    </Card>
  );
};

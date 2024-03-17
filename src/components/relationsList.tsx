import React from 'react';
import {Card, Text} from 'react-native-paper';
import {RelatedItem} from './relatedItem.tsx';
import {Media} from '../API/__generated__/graphql.ts';
import {GlobalStyles} from '../globalStyles/globalStyles.ts';

type Props = {
  data: (Media | null)[] | null | undefined;
};

export const RelationsList = (props: Props) => {
  const {data} = props;
  const relations = data ? data : 'Relations were not found.';
  return (
    <Card testID="relations-card" style={GlobalStyles.detailsCardStyle}>
      <Card.Title
        title="Relations:"
        titleNumberOfLines={1}
        titleStyle={GlobalStyles.detailsCardTitleText}
      />
      <Card.Content>
        {typeof relations !== 'string' ? (
          data?.map(item => {
            if (item) {
              return <RelatedItem item={item} key={item.id} />;
            }
          })
        ) : (
          <Text style={GlobalStyles.darkSchemeTextStyle}>{relations}</Text>
        )}
      </Card.Content>
    </Card>
  );
};

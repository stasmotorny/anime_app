import React from 'react';
import {Card, Text, List, Icon} from 'react-native-paper';
import {RelatedItem} from './relatedItem.tsx';
import {Media} from '../API/__generated__/graphql.ts';
import {GlobalStyles} from '../globalStyles/globalStyles.ts';
import {Colors} from '../colors/colors.ts';
import {StyleSheet} from 'react-native';

type Props = {
  data: (Media | null)[] | null | undefined;
};

export const RelationsList = (props: Props) => {
  const {data} = props;
  const relations = data ? data : 'Relations were not found.';
  return (
    <Card testID="relations-card" style={GlobalStyles.detailsCardStyle}>
      <Card.Content>
        {typeof relations !== 'string' ? (
          <List.Accordion
            testID="relations-accordion"
            title="Relations:"
            titleStyle={{...GlobalStyles.detailsCardTitleText}}
            right={(accordionProps: {isExpanded: boolean}) =>
              accordionProps.isExpanded ? (
                <Icon source="chevron-up" color={Colors.white} size={24} />
              ) : (
                <Icon source="chevron-down" color={Colors.white} size={24} />
              )
            }
            style={styles.accordion}>
            {data?.map(item => {
              if (item) {
                return <RelatedItem item={item} key={item.id} />;
              }
            })}
          </List.Accordion>
        ) : (
          <Text style={GlobalStyles.darkSchemeTextStyle}>{relations}</Text>
        )}
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  accordion: {
    backgroundColor: Colors.grey900,
    margin: -12,
  },
});

import {Media} from '../API/__generated__/graphql.ts';
import {Divider, List, Text} from 'react-native-paper';
import {Colors} from '../colors/colors.ts';
import {ScreenScroll} from './screenScroll.tsx';
import React from 'react';
import {StyleSheet} from 'react-native';

type Props = {
  accordionData: Media[];
  title: string;
};

export const GroupAccordion = (props: Props) => {
  const {accordionData, title} = props;
  return (
    <>
      <List.Accordion
        title={title}
        titleStyle={{color: Colors.white}}
        id="1"
        style={{backgroundColor: Colors.grey900}}>
        {accordionData.length ? (
          <ScreenScroll data={accordionData} />
        ) : (
          <Text>No items in collection</Text>
        )}
      </List.Accordion>
      <Divider style={styles.divider} />
    </>
  );
};

const styles = StyleSheet.create({
  divider: {
    marginVertical: 8,
  },
});

import React from 'react';
import {Chip, Surface, Text} from 'react-native-paper';
import {StyleSheet} from 'react-native';
import {MediaSort, MediaStatus} from '../API/__generated__/graphql.ts';
import {statusTitles, sortTypes} from '../helpers/enumFormatters.ts';
import {GlobalStyles} from '../globalStyles/globalStyles.ts';
import {Colors} from '../colors/colors.ts';

type Props = {
  itemsArray: string[] | MediaStatus[] | MediaSort[];
  onPress?: (item: string) => void;
  isSelectedCheckParameter: string | MediaStatus | null;
  title?: string;
  isDark?: boolean;
};

// TODO Add genres to genres list

export const SurfaceWithChips = (props: Props) => {
  const {itemsArray, onPress, isSelectedCheckParameter, title, isDark} = props;

  return (
    <Surface elevation={0}>
      {title ? <Text style={GlobalStyles.sectionHeader}>{title}</Text> : null}
      <Surface elevation={0} style={styles.chipSurfaceStyle}>
        {itemsArray.map(item => {
          return (
            <Chip
              testID="chip"
              key={item}
              compact={true}
              {...(isDark && {style: {backgroundColor: Colors.black}})}
              {...(isDark && {textStyle: {color: Colors.white}})}
              {...(onPress && {onPress: () => onPress(item)})}
              selected={item === isSelectedCheckParameter}>
              {sortTypes[item] || statusTitles[item] || item}
            </Chip>
          );
        })}
      </Surface>
    </Surface>
  );
};

const styles = StyleSheet.create({
  chipSurfaceStyle: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    gap: 8,
  },
});

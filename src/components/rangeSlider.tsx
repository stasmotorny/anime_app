import React, {useCallback} from 'react';
import Thumb from './sliderThumb.tsx';
import Rail from './sliderRail.tsx';
import RailSelected from './sliderRailSelected.tsx';
import Label from './sliderLabel.tsx';
import Notch from './sliderNotch.tsx';
import RangeSlider from 'rn-range-slider';
import {Surface, Text} from 'react-native-paper';
import {StyleSheet} from 'react-native';
import {GlobalStyles} from '../globalStyles/globalStyles.ts';

type Props = {
  handleValueChange: (low: number, high: number) => void;
  low: number;
  high: number;
  min: number;
  max: number;
  title: string;
};

export const RangeSliderComponent = (props: Props) => {
  const {handleValueChange, low, high, title, min, max} = props;
  const renderThumb = useCallback(() => <Thumb />, []);
  const renderRail = useCallback(() => <Rail />, []);
  const renderRailSelected = useCallback(() => <RailSelected />, []);
  const renderLabel = useCallback(
    (value: number) => <Label text={value} />,
    [],
  );
  const renderNotch = useCallback(() => <Notch />, []);

  return (
    <Surface elevation={0}>
      <Text style={GlobalStyles.sectionHeader}>{title}</Text>
      <Text
        style={
          styles.selectedRangeStyle
        }>{`Select range is: ${low} - ${high}`}</Text>
      <RangeSlider
        min={min}
        max={max}
        minRange={1}
        step={1}
        low={low}
        high={high}
        floatingLabel
        renderThumb={renderThumb}
        renderRail={renderRail}
        renderRailSelected={renderRailSelected}
        renderLabel={renderLabel}
        renderNotch={renderNotch}
        onSliderTouchEnd={handleValueChange}
      />
      <Surface elevation={0} style={styles.sliderValuesStyle}>
        <Text>{min}</Text>
        <Text>{max}</Text>
      </Surface>
    </Surface>
  );
};

const styles = StyleSheet.create({
  sliderValuesStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  selectedRangeStyle: {
    marginBottom: 12,
  },
});

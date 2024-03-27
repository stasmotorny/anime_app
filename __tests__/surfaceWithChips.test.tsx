import {expect, it, jest} from '@jest/globals';
import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import {SurfaceWithChips} from '../src/components/surfaceWithChips.tsx';

const mockedData = {
  itemsArray: ['First', 'Second', 'Third'],
  onPress: jest.fn(),
  isSelectedCheckParameter: 'First',
  title: 'Test title',
  isDark: true,
};

it('Should increase page on scroll reached end', () => {
  const fetchMore = jest.fn();
  const wrapper = render(
    <SurfaceWithChips
      itemsArray={mockedData.itemsArray}
      onPress={mockedData.onPress}
      isSelectedCheckParameter={mockedData.isSelectedCheckParameter}
      title={mockedData.title}
      isDark={mockedData.isDark}
    />,
  );
  const chips = wrapper.getAllByTestId('chip');
  expect(chips).toHaveLength(3);
  expect(wrapper.getAllByText('First')).toHaveLength(1);
  expect(wrapper.getAllByText('Second')).toHaveLength(1);
  expect(wrapper.getAllByText('Third')).toHaveLength(1);
  fireEvent.press(chips[0]);
  expect(mockedData.onPress).toHaveBeenCalledTimes(1);
  expect(mockedData.onPress).toHaveBeenCalledWith('First');
});

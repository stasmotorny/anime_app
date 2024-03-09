import React from 'react';
import {render} from '@testing-library/react-native';
import {it, expect} from '@jest/globals';
import {GradientImageWithText} from '../src/components/gradientImageWithText.tsx';

it('renders without errors', () => {
  const wrapper = render(
    <GradientImageWithText title="Best title" imgUrl={null} score="87" />,
  );
  expect(wrapper.getAllByText('Best title')).toHaveLength(1);
  expect(wrapper.getAllByText('87')).toHaveLength(1);
  expect(wrapper.getAllByTestId('image-gradient')).toHaveLength(1);
});

it('renders Unknown text when theres no title and ?? when theres no score', () => {
  const wrapper = render(
    <GradientImageWithText title={null} imgUrl={null} score={undefined} />,
  );
  expect(wrapper.getAllByText('Unknown')).toHaveLength(1);
  expect(wrapper.getAllByText('??')).toHaveLength(1);
  expect(wrapper.getAllByTestId('image-gradient')).toHaveLength(1);
});

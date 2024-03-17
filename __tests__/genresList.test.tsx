import React from 'react';
import {render} from '@testing-library/react-native';
import {it, expect} from '@jest/globals';
import {GenresList} from '../src/components/genresList.tsx';

it('renders without genres', () => {
  const wrapper = render(<GenresList data={null} />);
  expect(wrapper.getAllByText('Genres were not specified')).toHaveLength(1);
});

it('renders with genres', () => {
  const wrapper = render(<GenresList data={['comedy', 'drama']} />);
  expect(wrapper.getAllByText('comedy')).toHaveLength(1);
  expect(wrapper.getAllByText('drama')).toHaveLength(1);
});

it('dont renders null if some genres are null', () => {
  const wrapper = render(<GenresList data={['comedy', null]} />);
  expect(wrapper.getAllByTestId('chip')).toHaveLength(1);
});

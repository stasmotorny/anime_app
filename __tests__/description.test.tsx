import React from 'react';
import {render} from '@testing-library/react-native';
import {it, expect} from '@jest/globals';
import {Description} from '../src/components/description.tsx';

it('renders without description', () => {
  const wrapper = render(<Description description={null} />);
  expect(wrapper.getAllByText('Description was not found')).toHaveLength(1);
});

it('renders with description', () => {
  const wrapper = render(<Description description="Best anime of all times" />);
  expect(wrapper.getAllByText('Best anime of all times')).toHaveLength(1);
});

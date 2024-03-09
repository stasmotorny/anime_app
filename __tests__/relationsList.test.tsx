import React from 'react';
import {render} from '@testing-library/react-native';
import {it, expect} from '@jest/globals';
import {RelationsList} from '../src/components/relationsList.tsx';
import {
  Media,
  MediaStatus,
  MediaType,
} from '../src/API/__generated__/graphql.ts';
import {MockedNavigator} from './__mocks__/mocks.tsx';

const items: Media[] = [
  {
    id: 1,
    type: MediaType.Anime,
    title: {
      english: 'Some title',
    },
    status: MediaStatus.Finished,
    seasonYear: 1996,
    coverImage: {
      medium: 'some link',
    },
    bannerImage: 'some link',
    genres: ['comedy'],
    popularity: 86,
    isFavourite: true,
    isFavouriteBlocked: false,
  },
  {
    id: 2,
    type: MediaType.Anime,
    title: {
      english: 'Some title',
    },
    status: MediaStatus.Finished,
    seasonYear: 1996,
    coverImage: {
      medium: 'some link',
    },
    bannerImage: 'some link',
    genres: ['comedy'],
    popularity: 86,
    isFavourite: true,
    isFavouriteBlocked: false,
  },
];

it('renders error text without data', () => {
  const wrapper = render(<RelationsList data={null} />);
  expect(wrapper.getAllByText('Relations were not found.')).toHaveLength(1);
});

it('renders two items if theres two items in data', () => {
  const ComponentWithProps = () => {
    return <RelationsList data={items} />;
  };
  const wrapper = render(<MockedNavigator component={ComponentWithProps} />);
  expect(wrapper.getAllByTestId('related-item')).toHaveLength(2);
});

it('renders two items if theres two items and null in data', () => {
  const ComponentWithProps = () => {
    return <RelationsList data={[...items, null]} />;
  };
  const wrapper = render(<MockedNavigator component={ComponentWithProps} />);
  expect(wrapper.getAllByTestId('related-item')).toHaveLength(2);
});

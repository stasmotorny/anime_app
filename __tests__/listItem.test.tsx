import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import {expect, it, jest} from '@jest/globals';
import {ListItem} from '../src/components/listItem.tsx';
import {
  Media,
  MediaStatus,
  MediaType,
} from '../src/API/__generated__/graphql.ts';

const item: Media = {
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
};

const noTitleItem: Media = {
  id: 1,
  type: MediaType.Anime,
  title: {
    english: null,
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
};

const mockedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: mockedNavigate,
  }),
}));
it('listItem navigation test', () => {
  const wrapper = render(<ListItem item={item} isInCollection={true} />);
  fireEvent.press(wrapper.getByTestId('item-card'));
  expect(mockedNavigate).toHaveBeenCalledWith('Details', {itemId: item.id});
});

it('should render item title', () => {
  const wrapper = render(<ListItem item={item} isInCollection={true} />);
  expect(wrapper.getAllByText('Some title')).toHaveLength(1);
});

it('should render unknown if theres no item title', () => {
  const wrapper = render(<ListItem item={noTitleItem} isInCollection={true} />);
  expect(wrapper.getAllByText('Unknown')).toHaveLength(1);
});

it('should render add button', () => {
  const wrapper = render(<ListItem item={item} isInCollection={false} />);
  expect(wrapper.getAllByText('Add')).toHaveLength(1);
});

it('should render remove button', () => {
  const wrapper = render(<ListItem item={item} isInCollection={true} />);
  expect(wrapper.getAllByText('Remove')).toHaveLength(1);
});

import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import {expect, it, jest} from '@jest/globals';
import {
  Media,
  MediaStatus,
  MediaType,
} from '../src/API/__generated__/graphql.ts';
import {RelatedItem} from '../src/components/relatedItem.tsx';

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

const itemWithoutImage: Media = {
  id: 1,
  type: MediaType.Anime,
  title: {
    english: 'Some title',
  },
  status: MediaStatus.Finished,
  seasonYear: 1996,
  coverImage: {
    medium: null,
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
it('relatedItem navigation test', () => {
  const wrapper = render(<RelatedItem item={item} />);
  fireEvent.press(wrapper.getByTestId('related-item-touchable'));
  expect(mockedNavigate).toHaveBeenCalledWith('Details', {itemId: item.id});
});

it('relatedItem should be rendered with image if theres coverimage', () => {
  const wrapper = render(<RelatedItem item={item} />);
  expect(wrapper.getAllByTestId('related-item-image')).toHaveLength(1);
});

it('relatedItem should be rendered without image if theres no coverimage', () => {
  const wrapper = render(<RelatedItem item={itemWithoutImage} />);
  expect(wrapper.queryAllByTestId('related-item-image')).not.toBe([]);
});

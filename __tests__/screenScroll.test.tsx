import {expect, it, jest} from '@jest/globals';
import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import {ScreenScroll} from '../src/components/screenScroll.tsx';
import {
  Media,
  MediaStatus,
  MediaType,
} from '../src/API/__generated__/graphql.ts';
import {FetchMoreType} from '../src/types/graphQL.ts';

const data: Media[] = [
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
  {
    id: 3,
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
    id: 4,
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
    id: 5,
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
    id: 6,
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
    id: 7,
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
    id: 8,
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
    id: 9,
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
    id: 10,
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

const mockedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: mockedNavigate,
  }),
}));

it('Should increase page on scroll reached end', () => {
  const fetchMore = jest.fn();
  const wrapper = render(
    <ScreenScroll fetchMore={fetchMore as FetchMoreType} data={data} />,
  );
  const flashlist = wrapper.getByTestId('flash_list');
  fireEvent.scroll(flashlist);
  expect(fetchMore).toHaveBeenCalledTimes(1);
});

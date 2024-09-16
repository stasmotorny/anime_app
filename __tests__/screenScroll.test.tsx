import {expect, it, jest} from '@jest/globals';
import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import {ScreenScroll} from '../src/components/screenScroll.tsx';
import {
  Media,
  MediaStatus,
  MediaType,
} from '../src/API/__generated__/graphql.ts';
import {Provider} from 'react-native-paper';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import useFilterStore from '../src/store/filterStore.ts';

jest.useFakeTimers();

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

const testClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

it('Should increase page on scroll reached end', () => {
  const page = useFilterStore.getState().page;
  const ScrollWrappedWithProvider = () => {
    return (
      <QueryClientProvider client={testClient}>
        <Provider>
          <ScreenScroll
            // fetchMore={fetchMore as FetchMoreType}
            data={data}
            error={null}
          />
        </Provider>
      </QueryClientProvider>
    );
  };
  const wrapper = render(<ScrollWrappedWithProvider />);
  expect(page).toEqual(1);
  const flashlist = wrapper.getByTestId('flash_list');
  fireEvent.scroll(flashlist);
  const pageAfterScroll = useFilterStore.getState().page;
  expect(pageAfterScroll).toEqual(2);
});

import React from 'react';
import {render, waitFor} from '@testing-library/react-native';
import {
  GetMangaListDocument,
  MediaSort,
} from '../src/API/__generated__/graphql.ts';
import {Manga} from '../src/screens/manga.tsx';
import {it, expect} from '@jest/globals';
import {MockedNavigator} from './__mocks__/mocks.tsx';
import {currentScreen} from '../src/reactiveVariablesStore/currentScreen.ts';
import {GraphQLError} from 'graphql/error';

const mocks = [
  {
    request: {
      query: GetMangaListDocument,
      variables: {
        page: 1,
        perPage: 50,
        sortType: MediaSort.PopularityDesc,
      },
    },
    result: {
      data: {
        Page: {
          media: [
            {
              id: 1,
              type: 'Manga',
              title: {
                english: 'Some title',
              },
              status: 'FINISHED',
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
          ],
        },
      },
    },
  },
];

it('renders without error', async () => {
  currentScreen('Manga');
  const wrapper = render(<MockedNavigator component={Manga} mocks={mocks} />);
  await waitFor(() => [
    expect(wrapper.getAllByText('Some title')).toHaveLength(1),
    expect(wrapper.queryByTestId('item-card')).toBeTruthy(),
    expect(wrapper.getAllByTestId('item-card')).toHaveLength(1),
  ]);
});

it('should render loading spinner while data is loading', async () => {
  currentScreen('Manga');
  const wrapper = render(<MockedNavigator component={Manga} mocks={mocks} />);
  await waitFor(() => [
    expect(wrapper.getAllByTestId('activity-indicator')).toHaveLength(1),
  ]);
});

it('should display error message if there was an error on loading data', async () => {
  const errorMock = [
    {
      request: {
        query: GetMangaListDocument,
        variables: {
          page: 1,
          perPage: 50,
          sortType: MediaSort.PopularityDesc,
        },
      },
      error: new GraphQLError('test error'),
    },
  ];
  currentScreen('Manga');
  const wrapper = render(
    <MockedNavigator component={Manga} mocks={errorMock} />,
  );
  await waitFor(() => [
    expect(wrapper.getAllByText('Failed to load data')).toHaveLength(1),
  ]);
});

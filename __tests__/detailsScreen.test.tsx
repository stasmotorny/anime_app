import React from 'react';
import {render, waitFor} from '@testing-library/react-native';
import {GetDetailsDocument} from '../src/API/__generated__/graphql.ts';
import {Details} from '../src/screens/details.tsx';
import {it, expect} from '@jest/globals';
import {MockedNavigator} from './__mocks__/mocks.tsx';

const mocks = [
  {
    request: {
      query: GetDetailsDocument,
      variables: {
        id: 12,
      },
    },
    result: {
      data: {
        Media: {
          description: 'Best item in the world',
          coverImage: {
            large: 'some link',
          },
          title: {
            english: 'Epic adventure',
          },
          genres: ['comedy', 'drama'],
          averageScore: 90,
          relations: {
            nodes: [
              {
                id: 13,
                title: {
                  english: 'sequel',
                },
                coverImage: {
                  medium: 'some link',
                },
                isFavourite: true,
                isFavouriteBlocked: false,
              },
              {
                id: 14,
                title: {
                  english: 'prequel',
                },
                coverImage: {
                  medium: 'some link',
                },
                isFavourite: true,
                isFavouriteBlocked: false,
              },
            ],
          },
          nextAiringEpisode: {
            id: 1,
            airingAt: '2021-03-02',
            episode: 12,
          },
        },
      },
    },
  },
];

const mocksWithNull = [
  {
    request: {
      query: GetDetailsDocument,
      variables: {
        id: 12,
      },
    },
    result: {
      data: {
        Media: {
          description: null,
          coverImage: {
            large: 'some link',
          },
          title: {
            english: null,
          },
          genres: ['comedy', 'drama'],
          averageScore: null,
          relations: {
            nodes: [
              {
                id: 13,
                title: {
                  english: null,
                },
                coverImage: {
                  medium: 'some link',
                },
                isFavourite: true,
                isFavouriteBlocked: false,
              },
              {
                id: 14,
                title: {
                  english: 'prequel',
                },
                coverImage: {
                  medium: 'some link',
                },
                isFavourite: true,
                isFavouriteBlocked: false,
              },
            ],
          },
          nextAiringEpisode: {
            id: 1,
            airingAt: '2021-03-02',
            episode: 12,
          },
        },
      },
    },
  },
];

const errorMock = [
  {
    request: {
      query: GetDetailsDocument,
      variables: {
        id: 12,
      },
    },
    error: new Error('test error'),
  },
];

it('renders without error', async () => {
  const wrapper = render(
    <MockedNavigator component={Details} mocks={mocks} params={{itemId: 12}} />,
  );
  await waitFor(() => [
    expect(wrapper.getAllByText('Epic adventure')).toHaveLength(1),
    expect(wrapper.getAllByText('90')).toHaveLength(2),
    expect(wrapper.queryByTestId('image-gradient')).toBeTruthy(),
    expect(wrapper.queryByTestId('genres-card')).toBeTruthy(),
    expect(wrapper.queryByTestId('card-rating')).toBeTruthy(),
    expect(wrapper.queryByTestId('relations-accordion')).toBeTruthy(),
    expect(wrapper.queryByTestId('description-card')).toBeTruthy(),
  ]);
});

it('?? should be displayed if theres no score and unknown if theres no title', async () => {
  const wrapper = render(
    <MockedNavigator
      component={Details}
      mocks={mocksWithNull}
      params={{itemId: 12}}
    />,
  );
  await waitFor(() => [
    expect(wrapper.getAllByText('Unknown')).toHaveLength(1),
    expect(wrapper.getAllByText('??')).toHaveLength(2),
  ]);
});

it('should render loading spinner while data is loading', async () => {
  const wrapper = render(
    <MockedNavigator component={Details} params={{itemId: 12}} mocks={mocks} />,
  );
  await waitFor(() => [
    expect(wrapper.getAllByTestId('activity-indicator')).toHaveLength(1),
  ]);
});

it('should error message there was an error on loading data', async () => {
  const wrapper = render(
    <MockedNavigator
      component={Details}
      mocks={errorMock}
      params={{itemId: 12}}
    />,
  );
  await waitFor(() => [
    expect(wrapper.getAllByText('Failed to load data')).toHaveLength(1),
  ]);
});

import React from 'react';
import {render, waitFor} from '@testing-library/react-native';
import {Manga} from '../src/screens/manga.tsx';
import {it, expect, jest, beforeAll, afterEach} from '@jest/globals';
import {MockedNavigator} from './__mocks__/mocks.tsx';
import useCurrentScreenStore from '../src/reactiveVariablesStore/currentScreenStore.ts';
import axiosInstance from '../src/API/axiosConfig.ts';
import MockAdapter from 'axios-mock-adapter';

let mock: MockAdapter;

jest.useFakeTimers();

beforeAll(() => {
  mock = new MockAdapter(axiosInstance, {onNoMatch: 'throwException'});
});

afterEach(() => {
  mock.reset();
});

const mocks = [
  {
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
              relations: {
                nodes: [
                  {
                    id: 1,
                    title: {
                      english: 'Some title 1',
                    },
                    type: 'MANGA',
                  },
                  {
                    id: 2,
                    title: {
                      english: 'Some title 2',
                    },
                    type: 'MANGA',
                  },
                ],
              },
            },
          ],
        },
      },
    },
  },
];

it('should render loading spinner while data is loading', async () => {
  useCurrentScreenStore.getState().setCurrentScreen('Manga');
  mock.onGet(`/anilist/mangas`).timeoutOnce();
  const wrapper = render(<MockedNavigator component={Manga} />);
  expect(wrapper.getAllByTestId('activity-indicator')).toHaveLength(1);
});

it('renders without error', async () => {
  useCurrentScreenStore.getState().setCurrentScreen('Manga');
  mock.onGet(`/anilist/mangas`).reply(200, mocks[0].result.data);
  const wrapper = render(<MockedNavigator component={Manga} />);
  await waitFor(() => [
    expect(wrapper.getAllByText('Some title')).toHaveLength(1),
    expect(wrapper.queryByTestId('item-card')).toBeTruthy(),
    expect(wrapper.getAllByTestId('item-card')).toHaveLength(1),
  ]);
});

it('should display error message if there was an error on loading data', async () => {
  useCurrentScreenStore.getState().setCurrentScreen('Manga');
  mock.onGet(`/anilist/mangas`).reply(400, 'bad request');
  const wrapper = render(<MockedNavigator component={Manga} />);
  await waitFor(() => [
    expect(wrapper.getAllByText('Failed to load data')).toHaveLength(1),
  ]);
});

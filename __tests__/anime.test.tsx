import React from 'react';
import {render, waitFor} from '@testing-library/react-native';
import {Anime} from '../src/screens/anime.tsx';
import {it, expect, jest, afterEach, beforeAll} from '@jest/globals';
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
              type: 'Anime',
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
                    type: 'ANIME',
                  },
                  {
                    id: 2,
                    title: {
                      english: 'Some title 2',
                    },
                    type: 'ANIME',
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
  useCurrentScreenStore.getState().setCurrentScreen('Anime');
  mock.onGet('/anilist/animes').timeoutOnce();
  const wrapper = render(<MockedNavigator component={Anime} />);
  expect(wrapper.getAllByTestId('activity-indicator')).toHaveLength(1);
});

it('renders without error', async () => {
  useCurrentScreenStore.getState().setCurrentScreen('Anime');
  mock.onGet(`/anilist/animes`).reply(200, mocks[0].result.data);
  const wrapper = render(<MockedNavigator component={Anime} />);
  await waitFor(() => [
    expect(wrapper.queryAllByText('Some title')).toHaveLength(1),
    expect(wrapper.queryByTestId('item-card')).toBeTruthy(),
    expect(wrapper.getAllByTestId('item-card')).toHaveLength(1),
  ]);
});

it('should error message there was an error on loading data', async () => {
  useCurrentScreenStore.getState().setCurrentScreen('Anime');
  mock.onGet('/anilist/animes').reply(400, 'bad request');
  const wrapper = render(<MockedNavigator component={Anime} />);
  await waitFor(() => [
    expect(wrapper.getAllByText('Failed to load data')).toHaveLength(1),
  ]);
});

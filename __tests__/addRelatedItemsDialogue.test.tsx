import React from 'react';
import {
  act,
  cleanup,
  fireEvent,
  render,
  waitFor,
} from '@testing-library/react-native';
import {afterEach, expect, it, jest, beforeAll} from '@jest/globals';
import {AddRelatedItemsDialogue} from '../src/components/addRelatedItemsDialogue.tsx';
import {
  Media,
  MediaStatus,
  MediaType,
} from '../src/API/__generated__/graphql.ts';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {Provider} from 'react-native-paper';
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

const testClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const WrapWithProvider = (InnerComponent: React.FC) => {
  return (
    <QueryClientProvider client={testClient}>
      <Provider>
        <InnerComponent />
      </Provider>
    </QueryClientProvider>
  );
};

jest.useFakeTimers();
afterEach(cleanup);

const mockedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: mockedNavigate,
  }),
}));

const mockedSetIsVisible = jest.fn();

const mediaItem: Media = {
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
  relations: {
    nodes: [
      {
        id: 2,
        title: {english: 'title'},
        isFavourite: false,
        isFavouriteBlocked: false,
      },
    ],
  },
};

const ChangeGroupDialogueFunc = () => {
  return (
    <AddRelatedItemsDialogue
      isVisible={true}
      setIsVisible={mockedSetIsVisible}
      item={mediaItem}
    />
  );
};

it('Renders correctly', () => {
  const wrapper = render(WrapWithProvider(ChangeGroupDialogueFunc));

  expect(wrapper.getByTestId('add-related-items-dialogue')).toBeTruthy();
  expect(wrapper.getAllByText('Add related items:')).toHaveLength(1);
  expect(wrapper.getByTestId('add-related-items-confirm-btn')).toBeTruthy();
  expect(wrapper.getByTestId('add-related-items-refuse-btn')).toBeTruthy();
});

it('on add related items function', () => {
  const wrapper = render(WrapWithProvider(ChangeGroupDialogueFunc));

  fireEvent.press(wrapper.getByTestId('add-related-items-confirm-btn'));

  expect(mockedNavigate).toHaveBeenCalledTimes(1);
});

it('dialogue should hide on refuse btn press', async () => {
  const wrapper = render(WrapWithProvider(ChangeGroupDialogueFunc));

  act(() =>
    fireEvent.press(wrapper.getByTestId('add-related-items-refuse-btn')),
  );

  await waitFor(() => expect(mockedSetIsVisible).toHaveBeenCalledWith(false));
});

it('dialogue should hide on confirm btn press', async () => {
  const wrapper = render(WrapWithProvider(ChangeGroupDialogueFunc));

  act(() =>
    fireEvent.press(wrapper.getByTestId('add-related-items-confirm-btn')),
  );

  await waitFor(() => expect(mockedSetIsVisible).toHaveBeenCalledWith(false));
});

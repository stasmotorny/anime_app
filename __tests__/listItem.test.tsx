import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import {expect, it, jest} from '@jest/globals';
import {ListItem} from '../src/components/listItem.tsx';
import {
  Media,
  MediaStatus,
  MediaType,
} from '../src/API/__generated__/graphql.ts';
import {Provider} from 'react-native-paper';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

jest.useFakeTimers();

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
  status: null,
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

const TruthyListItem = () => {
  return <ListItem item={item} isInCollection={true} />;
};

const FalsyListItem = () => {
  return <ListItem item={item} isInCollection={false} />;
};

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: mockedNavigate,
  }),
}));

it('listItem navigation test', () => {
  const wrapper = render(WrapWithProvider(TruthyListItem));
  fireEvent.press(wrapper.getByTestId('item-card'));
  expect(mockedNavigate).toHaveBeenCalledWith('Details', {itemId: item.id});
});

it('should render item title', () => {
  const wrapper = render(WrapWithProvider(TruthyListItem));
  expect(wrapper.getAllByText('Some title')).toHaveLength(1);
  expect(wrapper.getAllByText('Finished')).toHaveLength(1);
});

it('should render unknown if theres no item title', () => {
  const ItemWithoutTitle = () => {
    return <ListItem item={noTitleItem} isInCollection={true} />;
  };
  const wrapper = render(WrapWithProvider(ItemWithoutTitle));
  expect(wrapper.getAllByText('Unknown')).toHaveLength(2);
});

it('should render add button', () => {
  const wrapper = render(WrapWithProvider(FalsyListItem));
  expect(wrapper.getAllByText('Add')).toHaveLength(1);
});

it('should render remove button', () => {
  const wrapper = render(WrapWithProvider(TruthyListItem));
  expect(wrapper.getAllByText('Remove')).toHaveLength(1);
});

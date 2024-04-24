import React from 'react';
import {
  act,
  cleanup,
  fireEvent,
  render,
  waitFor,
} from '@testing-library/react-native';
import {afterEach, expect, it, jest} from '@jest/globals';
import {Provider} from 'react-native-paper';
import {AddRelatedItemsDialogue} from '../src/components/addRelatedItemsDialogue.tsx';
import {
  Media,
  MediaStatus,
  MediaType,
} from '../src/API/__generated__/graphql.ts';
import {MockedNavigator} from './__mocks__/mocks.tsx';
import {addNewItemToDB} from '../src/reactiveVariablesStore/userCollection.ts';
import * as handlers from '../src/reactiveVariablesStore/userCollection.ts';

jest.useFakeTimers();
afterEach(cleanup);

const mockedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: mockedNavigate,
  }),
}));

const WrapWithProvider = (InnerComponent: React.FC) => {
  return (
    <Provider>
      <InnerComponent />
    </Provider>
  );
};

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

it('addNewItemToDB should be called', async () => {
  const spy = jest.spyOn(handlers, 'addNewItemToDB');
  const wrapper = render(WrapWithProvider(ChangeGroupDialogueFunc));

  fireEvent.press(wrapper.getByTestId('add-related-items-refuse-btn'));

  await waitFor(() => expect(spy).toHaveBeenCalled());
});

it('dialogue should hide on refuse btn press', async () => {
  // const spy = jest.spyOn(handlers, 'addNewItemToDB');
  const wrapper = render(WrapWithProvider(ChangeGroupDialogueFunc));

  act(() =>
    fireEvent.press(wrapper.getByTestId('add-related-items-refuse-btn')),
  );

  await waitFor(() => expect(mockedSetIsVisible).toHaveBeenCalledWith(false));
});

it('dialogue should hide on confirm btn press', async () => {
  // const spy = jest.spyOn(handlers, 'addNewItemToDB');
  const wrapper = render(WrapWithProvider(ChangeGroupDialogueFunc));

  act(() =>
    fireEvent.press(wrapper.getByTestId('add-related-items-confirm-btn')),
  );

  await waitFor(() => expect(mockedSetIsVisible).toHaveBeenCalledWith(false));
});

import React from 'react';
import {
  act,
  cleanup,
  fireEvent,
  render,
  userEvent,
  waitFor,
} from '@testing-library/react-native';
import {afterEach, expect, it, jest} from '@jest/globals';
import {Provider} from 'react-native-paper';
import {ChangeGroupDialogue} from '../src/components/changeGroupDialogue.tsx';
import useUserCollectionStore from '../src/reactiveVariablesStore/userCollectionStore.ts';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

const mockedMutate = jest.fn();
jest.mock('../src/API/changeCollectionItemGroup', () => ({
  useChangeCollectionItemGroup: () => ({mutate: mockedMutate}),
}));

const testClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

jest.useFakeTimers();
afterEach(cleanup);

const WrapWithProvider = (InnerComponent: React.FC) => {
  return (
    <QueryClientProvider client={testClient}>
      <Provider>
        <InnerComponent />
      </Provider>
    </QueryClientProvider>
  );
};

const mockedSetIsVisible = jest.fn();

const ChangeGroupDialogueFunc = () => {
  return (
    <ChangeGroupDialogue
      isVisible={true}
      setIsVisible={mockedSetIsVisible}
      itemId={1}
    />
  );
};

it('Renders correctly', () => {
  const wrapper = render(WrapWithProvider(ChangeGroupDialogueFunc));

  expect(wrapper.getByTestId('ChangeGroupDialogue')).toBeTruthy();
  expect(wrapper.getAllByText('Change group:')).toHaveLength(1);
  expect(wrapper.getByTestId('GroupNameInput')).toBeTruthy();
  expect(wrapper.getByTestId('groupChangeConfirmBtn')).toBeTruthy();
  expect(wrapper.getByTestId('groupChangeRefuseBtn')).toBeTruthy();
  expect(wrapper.queryAllByTestId('radioBtnItem')).toHaveLength(0);
});

it('Confirm btn press calls setIsVisible', () => {
  const wrapper = render(WrapWithProvider(ChangeGroupDialogueFunc));

  fireEvent.press(wrapper.getByTestId('groupChangeRefuseBtn'));

  expect(mockedSetIsVisible).toHaveBeenCalledTimes(1);
  expect(mockedSetIsVisible).toHaveBeenCalledWith(false);
});

it('Renders groups', () => {
  useUserCollectionStore.getState().setCollection([
    {item_id: 1, item_group: 'Anime'},
    {item_id: 2, item_group: 'Manga'},
    {item_id: 3, item_group: 'Anime'},
    {item_id: 4, item_group: 'User group'},
  ]);

  const wrapper = render(WrapWithProvider(ChangeGroupDialogueFunc));

  expect(wrapper.queryAllByTestId('radioBtnItem')).toHaveLength(3);
});

it('On radio button press', () => {
  useUserCollectionStore.getState().setCollection([
    {item_id: 1, item_group: 'Anime'},
    {item_id: 2, item_group: 'Manga'},
    {item_id: 3, item_group: 'Anime'},
    {item_id: 4, item_group: 'User group'},
  ]);

  const wrapper = render(WrapWithProvider(ChangeGroupDialogueFunc));

  const radioButtons = wrapper.queryAllByTestId('radioBtnItem');
  const textInput = wrapper.getByTestId('GroupNameInput');

  fireEvent.changeText(textInput, 'Hello');

  expect(wrapper.getByTestId('GroupNameInput')).toHaveDisplayValue('Hello');

  fireEvent.press(radioButtons[1]);

  expect(radioButtons[0]).not.toBeChecked();
  expect(radioButtons[1]).toBeChecked();
  expect(radioButtons[2]).not.toBeChecked();
  waitFor(() =>
    expect(wrapper.getByTestId('GroupNameInput')).toHaveDisplayValue(''),
  );
});

it('Input focus should reset radio btn state', async () => {
  useUserCollectionStore.getState().setCollection([
    {item_id: 1, item_group: 'Anime'},
    {item_id: 2, item_group: 'Manga'},
    {item_id: 3, item_group: 'Anime'},
    {item_id: 4, item_group: 'User group'},
  ]);

  const user = userEvent.setup();

  const wrapper = render(WrapWithProvider(ChangeGroupDialogueFunc));

  const radioButtons = wrapper.queryAllByTestId('radioBtnItem');
  const textInput = wrapper.getByTestId('GroupNameInput');

  fireEvent.press(radioButtons[1]);

  expect(radioButtons[0]).not.toBeChecked();
  expect(radioButtons[1]).toBeChecked();
  expect(radioButtons[2]).not.toBeChecked();

  await user.type(textInput, 'Hello');

  expect(radioButtons[1]).not.toBeChecked();
});

it('On confirm press', async () => {
  useUserCollectionStore.getState().setCollection([
    {item_id: 1, item_group: 'Anime'},
    {item_id: 2, item_group: 'Manga'},
    {item_id: 3, item_group: 'Anime'},
    {item_id: 4, item_group: 'User group'},
  ]);

  const wrapper = render(WrapWithProvider(ChangeGroupDialogueFunc));
  const confirmBtn = wrapper.getByTestId('groupChangeConfirmBtn');
  const radioButtons = wrapper.queryAllByTestId('radioBtnItem');

  act(() => fireEvent.press(confirmBtn));
  await waitFor(() => expect(mockedMutate).not.toHaveBeenCalled());

  fireEvent.press(radioButtons[1]);
  act(() => fireEvent.press(confirmBtn));
  await waitFor(() => expect(mockedMutate).toHaveBeenCalled());
});

it('Confirm btn should be disabled if theres no group', async () => {
  useUserCollectionStore.getState().setCollection([
    {item_id: 1, item_group: 'Anime'},
    {item_id: 2, item_group: 'Manga'},
    {item_id: 3, item_group: 'Anime'},
    {item_id: 4, item_group: 'User group'},
  ]);

  const wrapper = render(WrapWithProvider(ChangeGroupDialogueFunc));
  const confirmBtn = wrapper.getByTestId('groupChangeConfirmBtn');
  const radioButtons = wrapper.queryAllByTestId('radioBtnItem');

  expect(confirmBtn).toBeDisabled();

  act(() => fireEvent.press(radioButtons[1]));

  expect(confirmBtn).not.toBeDisabled();
});

import React, {useCallback, useMemo, useState} from 'react';
import {StyleSheet} from 'react-native';
import {Button, Dialog, Portal, Searchbar, Divider} from 'react-native-paper';
import {Colors} from '../colors/colors.ts';
import {MediaStatus} from '../API/__generated__/graphql.ts';
import {filterState} from '../reactiveVariablesStore/filterState.ts';
import {useReactiveVar} from '@apollo/client';
import {RangeSliderComponent} from './rangeSlider.tsx';
import {SurfaceWithChips} from './surfaceWithChips.tsx';
import debounce from 'lodash.debounce';
import { currentScreen } from "../reactiveVariablesStore/currentScreen.ts";

type Props = {
  isDialogueVisible: boolean;
  hideDialog: Function;
};

export const Search = (props: Props) => {
  const {isDialogueVisible, hideDialog} = props;
  const searchQuery = useReactiveVar(filterState);
  const [searchValue, setSearchValue] = useState('');

  const handleSliderValueChange = useCallback(
    (low: number, high: number) => {
      if (
        high !== new Date().getFullYear() &&
        high !== searchQuery.startDate_lesser
      ) {
        return filterState({...searchQuery, startDate_lesser: high});
      }
      if (low !== 1990 && low !== searchQuery.startDate_greater) {
        return filterState({...searchQuery, startDate_greater: low});
      }
      if (high === new Date().getFullYear() && searchQuery.startDate_lesser) {
        return filterState({...searchQuery, startDate_lesser: null});
      }
      if (low === 1990 && searchQuery.startDate_greater) {
        return filterState({...searchQuery, startDate_greater: null});
      }
    },
    [searchQuery],
  );

  const genres = [
    'Action',
    'Adventure',
    'Fantasy',
    'Supernatural',
    'Drama',
    'Comedy',
    'Romance',
  ];

  const statuses: MediaStatus[] = Object.values(MediaStatus);

  const changeHandler = (value: string) => {
    filterState({...searchQuery, name: value});
  };

  const debouncedChangeHandler = useMemo(
    () => debounce(changeHandler, 300),
    [],
  );

  return (
    <Portal>
      <Dialog visible={isDialogueVisible} onDismiss={() => hideDialog()}>
        <Dialog.Title>Search</Dialog.Title>
        <Dialog.Content>
          <Searchbar
            placeholder="Search"
            onChangeText={value => {
              setSearchValue(value);
              debouncedChangeHandler(value);
            }}
            value={searchValue}
          />
          <Divider style={styles.dividerStyle} />
          <SurfaceWithChips
            isSelectedCheckParameter={searchQuery.genre}
            itemsArray={genres}
            onPress={item => {
              if (item === searchQuery.genre) {
                filterState({...searchQuery, genre: ''});
              } else {
                filterState({...searchQuery, genre: item});
              }
            }}
            title="Choose genre:"
          />
          <Divider style={styles.dividerStyle} />
          <RangeSliderComponent
            handleValueChange={handleSliderValueChange}
            high={
              searchQuery.startDate_lesser
                ? searchQuery.startDate_lesser
                : new Date().getFullYear()
            }
            low={
              searchQuery.startDate_greater
                ? searchQuery.startDate_greater
                : 1990
            }
            max={new Date().getFullYear()}
            min={1990}
            title="Select start year range:"
          />
          <Divider style={styles.dividerStyle} />
          <SurfaceWithChips
            isSelectedCheckParameter={searchQuery.status}
            itemsArray={statuses}
            onPress={item => {
              if (item === searchQuery.status) {
                filterState({...searchQuery, status: null});
              } else {
                filterState({...searchQuery, status: item as MediaStatus});
              }
            }}
            title="Choose genre:"
          />
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={() => hideDialog()}>Done</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    backgroundColor: Colors.black,
  },
  dividerStyle: {
    marginVertical: 12,
  },
});

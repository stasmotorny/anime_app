import React, {useEffect, useMemo, useState} from 'react';
import {StyleSheet} from 'react-native';
import {Button, Dialog, Portal, Searchbar, Divider} from 'react-native-paper';
import {Colors} from '../colors/colors.ts';
import {MediaStatus} from '../API/__generated__/graphql.ts';
import {useReactiveVar} from '@apollo/client';
import {RangeSliderComponent} from './rangeSlider.tsx';
import {SurfaceWithChips} from './surfaceWithChips.tsx';
import debounce from 'lodash.debounce';
import {currentScreen} from '../store/currentScreen.ts';
import useFilterStore from '../store/filterStore.ts';
import useCurrentScreenStore from '../store/currentScreenStore.ts';

type Props = {
  isDialogueVisible: boolean;
  hideDialog: Function;
};

export const Search = (props: Props) => {
  const {isDialogueVisible, hideDialog} = props;
  const {name, genre, startDateGreater, status, startDateLesser, setName, setGenre, setStartDateGreater, setStatus, setStartDateLesser, resetFilter} = useFilterStore();
  const {currentScreen: screen} = useCurrentScreenStore();

  useEffect(() => {
    resetFilter();
    setName('');
  }, [screen]);

  const handleSliderValueChange = (low: number, high: number) => {
    if (
      high !== new Date().getFullYear() &&
      high !== startDateLesser
    ) {
      return setStartDateLesser(high);
    }
    if (low !== 1990 && low !== startDateGreater) {
      return setStartDateGreater(low);
    }
    if (high === new Date().getFullYear() && startDateLesser) {
      setStartDateLesser(null);
    }
    if (low === 1990 && startDateGreater) {
      setStartDateGreater(null);
    }
  };

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
    setName(value);
  };

  const debouncedChangeHandler = useMemo(
    () => debounce(changeHandler, 300),
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
              setName(value);
              debouncedChangeHandler(value);
            }}
            value={name}
          />
          <Divider style={styles.dividerStyle} />
          <SurfaceWithChips
            isSelectedCheckParameter={genre}
            itemsArray={genres}
            onPress={item => {
              if (item === genre) {
                setGenre('');
              } else {
                setGenre(item);
              }
            }}
            title="Choose genre:"
          />
          <Divider style={styles.dividerStyle} />
          <RangeSliderComponent
            handleValueChange={handleSliderValueChange}
            high={
              startDateLesser
                ? startDateLesser
                : new Date().getFullYear()
            }
            low={
              startDateGreater
                ? startDateGreater
                : 1990
            }
            max={new Date().getFullYear()}
            min={1990}
            title="Select start year range:"
          />
          <Divider style={styles.dividerStyle} />
          <SurfaceWithChips
            isSelectedCheckParameter={status}
            itemsArray={statuses}
            onPress={item => {
              if (item === status) {
                setStatus('');
              } else {
                setStatus(item)
              }
            }}
            title="Choose status:"
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

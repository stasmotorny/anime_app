import React from 'react';
import {Banner} from 'react-native-paper';
import {MediaSort} from '../API/__generated__/graphql.ts';
import {SurfaceWithChips} from './surfaceWithChips.tsx';
import {chosenSortType} from '../reactiveVariablesStore/choosenSortType.ts';
import {useReactiveVar} from '@apollo/client';
import useSortTyperStore from '../reactiveVariablesStore/sortingTypeStore.ts';

type Props = {
  isBannerVisible: boolean;
  hideBanner: () => void;
};

export const Sort = (props: Props) => {
  const {isBannerVisible, hideBanner} = props;
  const {sortType: chosen, setSortType} = useSortTyperStore();
  // const chosen = useReactiveVar(chosenSortType);

  const sortParameter: MediaSort[] = [
    MediaSort.Score,
    MediaSort.ScoreDesc,
    MediaSort.StartDate,
    MediaSort.StartDateDesc,
    MediaSort.Popularity,
    MediaSort.PopularityDesc,
  ];

  return (
    <Banner
      visible={isBannerVisible}
      actions={[
        {
          label: 'Done',
          onPress: () => hideBanner(),
          mode: 'contained',
          textColor: 'white',
          style: {paddingHorizontal: 12},
        },
      ]}>
      <SurfaceWithChips
        isSelectedCheckParameter={chosen}
        itemsArray={sortParameter}
        title="Choose sort type:"
        onPress={val => {
          // chosenSortType(val as MediaSort);
          setSortType(val as MediaSort);
        }}
        isDark={false}
      />
    </Banner>
  );
};

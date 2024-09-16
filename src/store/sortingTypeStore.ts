import { create } from "zustand";
import {MediaSort} from '../API/__generated__/graphql.ts';

export type SortType = {
    sortType: MediaSort;
};

type SortTypeActions = {
    setSortType: (sortType: MediaSort) => void;
    resetSortType: () => void;
};

const useSortTyperStore = create<SortType & SortTypeActions>((set) => ({
  sortType: MediaSort.PopularityDesc,
  setSortType: (sortType) => {
    set(() => ({
        sortType
    }));
  },
  resetSortType: () => {
    set(() => ({
      sortType: MediaSort.PopularityDesc
    }));
  }
}));

export default useSortTyperStore;
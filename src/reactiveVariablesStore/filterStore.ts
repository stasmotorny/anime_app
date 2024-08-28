import { create } from "zustand";

export type Filter = {
  name: string;
  genre: string;
  startDateGreater: any;
  status: any;
  startDateLesser: any;
  page: number;
};

type FiletrActions = {
    setFilter: (filterData: Filter) => void;
    setName: (name: string) => void;
    setGenre: (genre: string) => void;
    setStartDateGreater: (startDateGreater: any) => void;
    setStatus: (status: string) => void;
    setStartDateLesser: (startDateLesser: any) => void;
    setPage: (page: number) => void;
    resetFilter: () => void;
};

const useFilterStore = create<Filter & FiletrActions>((set) => ({
  name: '',
  genre: '',
  startDateGreater: null,
  status: null,
  startDateLesser: null,
  page: 1,
  setFilter: (filterData: Filter) => {
    const { name, genre, startDateGreater, status, startDateLesser } = filterData;
    set(() => ({
      name,
      genre,
      startDateGreater,
      status,
      startDateLesser
    }));
  },
  setName: (name: string) => {
    set(() => ({
      name
    }));
  },
  setGenre: (genre: string) => {
    set(() => ({
      genre
    }));
  },
  setStartDateGreater: (startDateGreater: any) => {
    set(() => ({
      startDateGreater
    }));
  },
  setStatus: (status) => {
    set(() => ({
      status
    }));
  },
  setStartDateLesser: (startDateLesser) => {
    set(() => ({
      startDateLesser
    }));
  },
  setPage: (page) => {
    set(() => ({
      page
    }));
  },
  resetFilter: () => {
    set(() => ({
      name: '',
      genre: '',
      startDate_greater: null,
      status: null,
      startDate_lesser: null,
      page: 1
    }));
  }, 
}));

export default useFilterStore;
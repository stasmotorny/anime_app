import { create } from "zustand";

export type CurrentScreen = {
    currentScreen: 'Anime' | 'Manga' | 'Collection';
};

type CurrentScreenActions = {
    setCurrentScreen: (screen: 'Anime' | 'Manga' | 'Collection') => void;
};

const useCurrentScreenStore = create<CurrentScreen & CurrentScreenActions>((set) => ({
    currentScreen: 'Anime',
    setCurrentScreen: (screen) => {
      set(() => ({
          currentScreen: screen
      }));
    },
  }));
  
  export default useCurrentScreenStore;
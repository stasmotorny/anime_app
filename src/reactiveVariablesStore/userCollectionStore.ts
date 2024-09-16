import {create} from 'zustand';

export type CollectionItem = {
  item_group: string;
  item_id: number;
};

type Collection = {
  collection: CollectionItem[];
};

type CollectionActions = {
  setCollection: (collection: CollectionItem[]) => void;
  resetCollection: () => void;
};

const useUserCollectionStore = create<Collection & CollectionActions>(set => ({
  collection: [],
  setCollection: collection => {
    set(() => ({
      collection,
    }));
  },
  resetCollection: () => {
    set(() => ({
      collection: [],
    }));
  },
}));

export default useUserCollectionStore;

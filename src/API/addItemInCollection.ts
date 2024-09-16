import axiosInstance from './axiosConfig';
import {useMutation} from '@tanstack/react-query';
import useUserStore from '../store/userStore';
import useUserCollectionStore from '../store/userCollectionStore';
import {CollectionItem} from '../types/navigation';
import {isArray} from 'lodash';

const addItemInCollection = async (
  params: CollectionItem | CollectionItem[],
) => {
  const {userTokenId, userId} = useUserStore.getState();
  try {
    axiosInstance.defaults.headers.common.Authorization = userTokenId;
    console.log(isArray(params));
    const {data} = await axiosInstance.post(
      '/dal/add-item-in-collection',
      isArray(params) ? {items: params, userId} : {...params, userId},
    );
    return data;
  } catch (error) {
    console.log('ADD_ITEM_IN_COLLECTION_ERROR', error);
  }
};

export const useAddItemInCollection = () => {
  const {setCollection} = useUserCollectionStore.getState();
  return useMutation({
    mutationFn: addItemInCollection,
    onSuccess: response => {
      if (response) {
        const updatedCollection = response.collection.map((item: any) => ({
          ...item,
          item_id: Number(item.item_id),
        }));
        setCollection(updatedCollection);
      }
    },
    onError: error => {
      console.log('ADD_ITEM_IN_COLLECTION_ERROR', error);
      // TODO add some UI element that informs users about errors
    },
  });
};

import axiosInstance from './axiosConfig';
import { useQuery, keepPreviousData, useMutation } from '@tanstack/react-query';
import useUserStore from '../reactiveVariablesStore/userStore';
import { MediaSort, MediaStatus } from '../API/__generated__/graphql';
import useUserCollectionStore from '../reactiveVariablesStore/userCollectionStore';

type CollectionItem = {
  itemId: number;
}

const QUERY_KEY = ['RemoveFromCollection'];

const removeItemFromCollection = async (params: CollectionItem) => {
  const {userTokenId, userId} = useUserStore.getState();
  console.log('PARAMS', params, userId);
  try {
    axiosInstance.defaults.headers.common['Authorization'] = userTokenId;
    const { data } = await axiosInstance.post(`/dal/remove-item-from-collection`, {...params, userId});
    // console.log('RESPONSE', data.response);
    return data;
  } catch (error) {
    console.log('RENOVE_ITEM_FROM_COLLECTION_ERROR', error)
  }
};

export const useRemoveItemFromCollection = () => {
  const {setCollection} = useUserCollectionStore.getState();
  return useMutation({
    mutationFn: removeItemFromCollection,
    onSuccess: (response) => {
      console.log('REMOVE_ITEM_FROM_COLLECTION_RESPONSE', response);
      if (response) {
        const updatedCollection = response.collection.map(
          (item: any) => ({
            ...item,
            item_id: Number(item.item_id)
          })
        );
        setCollection(updatedCollection);
      }
    },
    onError: (error) => {
        console.log('REMOVE_ITEM_FROM_COLLECTION_ERROR', error);
        // TODO add some UI element that informs users about errors
    },
    });
};
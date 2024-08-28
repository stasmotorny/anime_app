import axiosInstance from './axiosConfig';
import { useQuery, keepPreviousData, useMutation } from '@tanstack/react-query';
import useUserStore from '../reactiveVariablesStore/userStore';
import { MediaSort, MediaStatus } from '../API/__generated__/graphql';
import useUserCollectionStore from '../reactiveVariablesStore/userCollectionStore';
import {CollectionItem} from '../types/navigation';
import { isArray } from 'lodash';

// type CollectionItem = {
//   itemId: number;
//   itemGroup: string;
// }

const QUERY_KEY = ['AddInCollection'];

const addItemInCollection = async (params: CollectionItem | CollectionItem[]) => {
  const {userTokenId, userId} = useUserStore.getState();
  try{
    axiosInstance.defaults.headers.common['Authorization'] = userTokenId;
    console.log(isArray(params));
    const { data } = await axiosInstance.post(`/dal/add-item-in-collection`, isArray(params) ? {items: params, userId} : {...params, userId});
    return data;
  } catch (error) {
    console.log('ADD_ITEM_IN_COLLECTION_ERROR', error)
  }
};

export const useAddItemInCollection = () => {
  const {setCollection} = useUserCollectionStore.getState();
  return useMutation({
    mutationFn: addItemInCollection,
    onSuccess: (response) => {
      console.log('ADD_ITEM_IN_COLLECTION_RESPONSE', response);
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
        console.log('ADD_ITEM_IN_COLLECTION_ERROR', error);
        // TODO add some UI element that informs users about errors
    },
    });
};
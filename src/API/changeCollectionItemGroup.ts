import axiosInstance from './axiosConfig';
import { useQuery, keepPreviousData, useMutation } from '@tanstack/react-query';
import useUserStore from '../store/userStore';
import { MediaSort, MediaStatus } from '../API/__generated__/graphql';
import useUserCollectionStore from '../store/userCollectionStore';
import {CollectionItem} from '../types/navigation';
import { isArray } from 'lodash';

// type CollectionItem = {
//   itemId: number;
//   itemGroup: string;
// }

const QUERY_KEY = ['ChangeCollectionItemGroup'];

const changeCollectionItemGroup = async (params: {itemId: number, newGroup: string}) => {
  const {userTokenId, userId} = useUserStore.getState();
  try{
    axiosInstance.defaults.headers.common['Authorization'] = userTokenId;
    console.log(isArray(params));
    const { data } = await axiosInstance.post(`/dal/change-collection-item-group`, {...params, userId});
    return data;
  } catch (error) {
    console.log('ADD_ITEM_IN_COLLECTION_ERROR', error)
  }
};

export const useChangeCollectionItemGroup = () => {
  const {setCollection} = useUserCollectionStore.getState();
  return useMutation({
    mutationFn: changeCollectionItemGroup,
    onSuccess: (response) => {
      console.log('CHANGE_ITEM_GROUP_RESPONSE', response);
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
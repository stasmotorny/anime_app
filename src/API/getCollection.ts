import axiosInstance from './axiosConfig';
import { useQuery, keepPreviousData, useMutation } from '@tanstack/react-query';
import useUserStore from '../store/userStore';
import { MediaSort, MediaStatus } from '../API/__generated__/graphql';
import useUserCollectionStore from '../store/userCollectionStore';

// type CollectionItem = {
//   userId: number;
// }

const QUERY_KEY = ['GetCollection'];

const getCollection = async () => {
  const {userTokenId, userId} = useUserStore.getState();
  // console.log('PARAMS', params);
  try{
    axiosInstance.defaults.headers.common['Authorization'] = userTokenId;
    const { data } = await axiosInstance.post(`/dal/get-user-collection`, {userId});
    // console.log('RESPONSE', data.response);
    return data;
  } catch (error) {
    console.log('GET_COLLECTION_ERROR', error)
  }
};

export const useGetCollection = () => {
  const {setCollection} = useUserCollectionStore.getState();
  return useMutation({
    mutationFn: getCollection,
    onSuccess: (response) => {
      console.log('GET_COLLECTION_RESPONSE', response);
      if (response) {
        const updatedCollection = response.collection.map(
          (item: any) => ({
            ...item,
            item_id: Number(item.item_id)
          })
        );
        console.log('UPDATED_COLLECTION');
        setCollection(updatedCollection);
      }
    },
    onError: (error) => {
        console.log('GET_COLLECTION_ERROR', error);
        // TODO add some UI element that informs users about errors
    },
    });
};
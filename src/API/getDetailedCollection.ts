import axiosInstance from './axiosConfig';
import { useQuery, keepPreviousData, } from '@tanstack/react-query';
import useUserStore from '../store/userStore';
import { MediaSort, MediaStatus } from '../API/__generated__/graphql';

type GetDetailedCollectionParams = {
  page: number;
  sortType?: MediaSort;
  name?: string;
  genre?: string;
  startDateGreater?: string;
  status?: MediaStatus;
  startDateLesser?: string;
}

const QUERY_KEY = ['GetDetailedCollection'];

const getDetailedCollection = async (params: GetDetailedCollectionParams) => {
  const userTokenId = useUserStore.getState().userTokenId;
  try{
    axiosInstance.defaults.headers.common['Authorization'] = userTokenId;
    const { data } = await axiosInstance.get(`/anilist/collection`, {params});
    return data;
  } catch (error) {
    console.log('GET_ANIME_ERROR', error)
  }
};

export const useGetDetailedCollection = (params: GetDetailedCollectionParams) => {
  return useQuery({queryKey: [...QUERY_KEY, params], queryFn: () => getDetailedCollection(params)});
};
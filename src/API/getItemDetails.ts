import axiosInstance from './axiosConfig';
import {useQuery, keepPreviousData} from '@tanstack/react-query';
import useUserStore from '../store/userStore';

type GetDetailsQueryParams = {
  itemId: number;
};

const QUERY_KEY = ['GetDetails'];

export const getDetails = async (params: GetDetailsQueryParams) => {
  console.log('FETCH_DETAILS_FIRED');
  const userTokenId = useUserStore.getState().userTokenId;
  try {
    axiosInstance.defaults.headers.common.Authorization = userTokenId;
    const {data} = await axiosInstance.get('/anilist/details', {params});
    return data;
  } catch (error) {
    console.log('GET_DETAILS_ERROR', error);
    // throw new Error('Something went wrong');
  }
};

export const useGetDetails = (params: GetDetailsQueryParams) => {
  // console.log('USE_GET_ANIME_FIRED');
  return useQuery({
    queryKey: [...QUERY_KEY, params],
    queryFn: () => getDetails(params),
    placeholderData: keepPreviousData,
  });
};

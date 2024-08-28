import axiosInstance from './axiosConfig';
import { useQuery, keepPreviousData, } from '@tanstack/react-query';
import useUserStore from '../reactiveVariablesStore/userStore';
import { MediaSort, MediaStatus } from '../API/__generated__/graphql';

type GetAnimeQueryParams = {
  page: number;
  sortType?: MediaSort;
  name?: string;
  genre?: string;
  startDateGreater?: string;
  status?: MediaStatus;
  startDateLesser?: string;
}

const QUERY_KEY = ['GetAnime'];

const getAnime = async (params: GetAnimeQueryParams) => {
  const userTokenId = useUserStore.getState().userTokenId;
  try{
    axiosInstance.defaults.headers.common['Authorization'] = userTokenId;
    const { data } = await axiosInstance.get(`/anilist/animes`, {params});
    return data;
  } catch (error) {
    console.log('GET_ANIME_ERROR', error)
  }
};

export const useGetAnime = (params: GetAnimeQueryParams) => {
  return useQuery({queryKey: [...QUERY_KEY, params], queryFn: () => getAnime(params), placeholderData: keepPreviousData,});
};
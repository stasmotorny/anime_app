import axiosInstance from './axiosConfig';
import {useQuery, keepPreviousData} from '@tanstack/react-query';
import useUserStore from '../store/userStore';
import {MediaSort, MediaStatus} from '../API/__generated__/graphql';

type GetMangaQueryParams = {
  page: number;
  sortType?: MediaSort;
  name?: string;
  genre?: string;
  startDateGreater?: string;
  status?: MediaStatus;
  startDateLesser?: string;
};

const QUERY_KEY = ['GetManga'];

const getManga = async (params: GetMangaQueryParams) => {
  const userTokenId = useUserStore.getState().userTokenId;
  try {
    axiosInstance.defaults.headers.common.Authorization = userTokenId;
    const {data} = await axiosInstance.get('/anilist/mangas', {params});
    return data;
  } catch (error) {
    console.log('GET_MANGAS_ERROR', error);
  }
};

export const useGetManga = (params: any) => {
  return useQuery({
    queryKey: [...QUERY_KEY, params],
    queryFn: () => getManga(params),
    placeholderData: keepPreviousData,
  });
};

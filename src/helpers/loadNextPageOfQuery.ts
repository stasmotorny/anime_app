import {
  GetAnimeListQuery,
  GetMangaListQuery,
  Media,
  MediaSort,
} from '../API/__generated__/graphql.ts';
import {updateQueryVariable} from './updateQueryVariable.ts';
import {Filter} from '../types/filter.ts';
import {FetchMoreType} from '../types/graphQL.ts';

type CacheData = GetMangaListQuery | GetAnimeListQuery;

export const cacheUpdateQuery = (
  prev: CacheData,
  {fetchMoreResult}: {fetchMoreResult: CacheData | null},
) => {
  if (!fetchMoreResult) {
    return prev;
  }
  return {
    ...prev,
    Page: {
      ...prev.Page,
      media: [
        ...(prev.Page?.media as Media[]),
        ...(fetchMoreResult.Page?.media as Media[]),
      ],
    },
  };
};

export const onLoadMore = (
  pageNumber: number,
  fetchMore: FetchMoreType,
  searchQuery: Filter,
  sortType: MediaSort,
) => {
  return fetchMore({
    variables: {
      ...updateQueryVariable(searchQuery, sortType),
      page: pageNumber,
    },
    updateQuery: cacheUpdateQuery,
  });
};

import {it, jest, expect} from '@jest/globals';
import {
  cacheUpdateQuery,
  onLoadMore,
} from '../src/helpers/loadNextPageOfQuery.ts';
import {
  GetMangaListQuery,
  MediaSort,
  MediaStatus,
  MediaType,
} from '../src/API/__generated__/graphql.ts';
import {FetchMoreType} from '../src/types/graphQL.ts';

it('renders without error', async () => {
  const fetchMoreMock = jest.fn();
  const searchQueryMock = {
    name: 'Test name',
    genre: 'Comedy',
    startDate_greater: null,
    status: MediaStatus.Cancelled,
    startDate_lesser: null,
  };
  await onLoadMore(
    1,
    fetchMoreMock as FetchMoreType,
    searchQueryMock,
    MediaSort.StartDate,
  );
  expect(fetchMoreMock).toHaveBeenCalledTimes(1);
});

it('renders without error', async () => {
  const previousMangaListQueryMock = {
    __typename: 'Query',
    Page: {
      __typename: 'Page',
      media: [
        {
          __typename: 'Media',
          id: 1,
          type: MediaType.Manga,
          status: MediaStatus.Cancelled,
          seasonYear: null,
          bannerImage: null,
          genres: null,
          popularity: 89,
          isFavourite: false,
          isFavouriteBlocked: false,
          title: {__typename: 'MediaTitle', english: 'Test'},
          coverImage: {
            __typename: 'MediaCoverImage',
            medium: null,
          },
        },
      ],
    },
  };
  const nextMangaListQueryMock = {
    __typename: 'Query',
    Page: {
      __typename: 'Page',
      media: [
        {
          __typename: 'Media',
          id: 2,
          type: MediaType.Manga,
          status: MediaStatus.Cancelled,
          seasonYear: null,
          bannerImage: null,
          genres: null,
          popularity: 89,
          isFavourite: false,
          isFavouriteBlocked: false,
          title: {__typename: 'MediaTitle', english: 'Test'},
          coverImage: {
            __typename: 'MediaCoverImage',
            medium: null,
          },
        },
      ],
    },
  };
  const testCacheUpdateQuery = cacheUpdateQuery(
    previousMangaListQueryMock as GetMangaListQuery,
    {
      fetchMoreResult: nextMangaListQueryMock as GetMangaListQuery,
    },
  );
  expect(testCacheUpdateQuery.Page!.media).toHaveLength(2);
  const testCacheUpdateQueryWithoutNextResult = cacheUpdateQuery(
    previousMangaListQueryMock as GetMangaListQuery,
    {
      fetchMoreResult: null,
    },
  );
  expect(testCacheUpdateQueryWithoutNextResult.Page!.media).toHaveLength(1);
});

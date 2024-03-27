import {FetchMoreFunction} from '@apollo/client/react/hooks/useSuspenseQuery';
import {
  GetAnimeListQuery,
  GetAnimeListQueryVariables,
  GetMangaListQuery,
  GetMangaListQueryVariables,
} from '../API/__generated__/graphql.ts';

export type FetchMoreType =
  | FetchMoreFunction<GetMangaListQuery, GetMangaListQueryVariables>
  | FetchMoreFunction<GetAnimeListQuery, GetAnimeListQueryVariables>;

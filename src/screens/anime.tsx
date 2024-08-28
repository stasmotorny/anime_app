import React, {useState, useEffect, useRef} from 'react';
import {Media} from '../API/__generated__/graphql.ts';
import {ScreenScroll} from '../components/screenScroll.tsx';
import {useGetAnime} from '../API/getAnime.ts';
import useFilterStore from '../reactiveVariablesStore/filterStore.ts';
import useSortTyperStore from '../reactiveVariablesStore/sortingTypeStore.ts';
import { FlashList } from '@shopify/flash-list';

export const Anime = (): React.JSX.Element => {
  const [media, setMedia] = useState<Media[]>([]);
  const {name, genre, startDateGreater, status, startDateLesser, page, setPage } = useFilterStore();
  const {sortType} = useSortTyperStore();
  const scrollRef = useRef<FlashList<Media>>(null);

  let params: any = {
    page,
    sortType,
    ...(name && {name}),
    ...(genre && {genre}),
    ...(startDateGreater && {startDateGreater}),
    ...(status && {status}),
    ...(startDateLesser && {startDateLesser}),
  };

  useEffect(() => {
    if (scrollRef?.current?.scrollToOffset) {
      scrollRef?.current?.scrollToOffset({ animated: false, offset: 0 });
    }
    if (page !== 1) {
      setPage(1);
    }
  }, [name, genre, startDateGreater, status, startDateLesser, sortType]);

  const { data: queryData, isLoading, isPending, isError, error } = useGetAnime(params);

  useEffect(() => {
    if (queryData) {
      if (page === 1) {
        setMedia(queryData.Page.media);
      } else {
        setMedia([...media, ...queryData.Page.media]);
      }
    }
  }, [queryData, isPending]);

  // return user?.additionalUserInfo?.isNewUser && !isGathered ? (
  //   <GatherAdditionalUserData />
  // ) : (
  //   <ScreenScroll
  //     data={data?.Page?.media as Media[]}
  //     fetchMore={fetchMore}
  //     error={error}
  //     loading={loading}
  //   />
  // );
  return (
    <ScreenScroll
      ref={scrollRef}
      data={media as Media[]}
      error={error}
      loading={isLoading}
    />
  );
};

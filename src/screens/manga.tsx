import React, {useState, useRef, useEffect} from 'react';
import {Media} from '../API/__generated__/graphql.ts';
import {ScreenScroll} from '../components/screenScroll.tsx';
import useFilterStore from '../store/filterStore.ts';
import useSortTyperStore from '../store/sortingTypeStore.ts';
import {useGetManga} from '../API/getManga.ts';
import { FlashList } from '@shopify/flash-list';

export const Manga = () => {
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

  const {
    data: queryData,
    isLoading,
    isPending,
    isError,
    error,
  } = useGetManga(params);

  useEffect(() => {
    if (queryData) {
      if (page === 1) {
        setMedia(queryData.Page.media);
      } else {
        setMedia([...media, ...queryData.Page.media]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryData, isPending]);
  return (
    <ScreenScroll
    ref={scrollRef}
    data={media as Media[]}
    error={error}
    loading={isLoading}
    />
  );
};

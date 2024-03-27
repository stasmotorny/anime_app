import React, {useEffect, useState} from 'react';
import {Media} from '../API/__generated__/graphql.ts';
import {View} from 'react-native';
import {ListItem} from './listItem.tsx';
import {ScreenError} from './screenError.tsx';
import {GlobalStyles} from '../globalStyles/globalStyles.ts';
import {ScreenLoadingSpinner} from './screenLoadingSpinner.tsx';
import {ApolloError, useReactiveVar} from '@apollo/client';
import {filterState} from '../reactiveVariablesStore/filterState.ts';
import {chosenSortType} from '../reactiveVariablesStore/choosenSortType.ts';
import {userCollection} from '../reactiveVariablesStore/userCollection.ts';
import {FlashList} from '@shopify/flash-list';
import {onLoadMore} from '../helpers/loadNextPageOfQuery.ts';
import {FetchMoreType} from '../types/graphQL.ts';

type Props = {
  fetchMore?: FetchMoreType;
  loading?: boolean;
  error?: ApolloError;
  data?: Media[];
};

export const ScreenScroll = (props: Props) => {
  const {fetchMore, loading, error, data} = props;

  const searchQuery = useReactiveVar(filterState);
  const sortType = useReactiveVar(chosenSortType);
  const userCollectionFromStore = useReactiveVar(userCollection);

  const [page, setPage] = useState(1);

  useEffect(() => {
    if (page > 1 && fetchMore) {
      onLoadMore(page, fetchMore, searchQuery, sortType);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    if (page !== 1) {
      setPage(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, sortType]);

  if (loading) {
    return <ScreenLoadingSpinner />;
  }

  if (error) {
    console.log(error.message);
    return <ScreenError />;
  }

  return (
    <View style={GlobalStyles.screenContainer} testID="SCREEN_SCROLL">
      <FlashList
        testID="flash_list"
        data={data ? data : []}
        renderItem={({item}) => (
          <ListItem
            item={item!}
            isInCollection={userCollectionFromStore.includes(item!.id)}
          />
        )}
        estimatedItemSize={144}
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.9}
        contentContainerStyle={GlobalStyles.screenFlatList}
        onEndReached={() => {
          if (data && data.length > 1) {
            console.log('MANGA_END', data.length);
            setPage(page + 1);
          }
        }}
      />
    </View>
  );
};

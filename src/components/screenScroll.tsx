import React, {useEffect, useState, useRef, forwardRef, ForwardedRef} from 'react';
import {Media} from '../API/__generated__/graphql.ts';
import {View} from 'react-native';
import {ListItem} from './listItem.tsx';
import {ScreenError} from './screenError.tsx';
import {GlobalStyles} from '../globalStyles/globalStyles.ts';
import {ScreenLoadingSpinner} from './screenLoadingSpinner.tsx';
import {ApolloError, useReactiveVar} from '@apollo/client';
import {FlashList} from '@shopify/flash-list';
import Error from '@tanstack/react-query';
import useFilterStore from '../store/filterStore.ts';
import useSortTyperStore from '../store/sortingTypeStore.ts';
import useUserCollectionStore from '../store/userCollectionStore.ts';
import useCurrentScreenStore from '../store/currentScreenStore.ts';

type Props = {
  fetchMore?: any;
  loading?: boolean;
  error: Error | null;
  data?: Media[];
};

export const ScreenScroll = forwardRef((props: Props, ref: ForwardedRef<FlashList<Media>>) => {
  const {loading, error, data} = props;
  // const flatListRef = useRef(null);
  const {currentScreen} = useCurrentScreenStore();
  const { collection } = useUserCollectionStore();
  const { page, setPage } = useFilterStore();

  useEffect(() => {
    console.log('COLLECTION_FROM_STORE', collection);
  }, [collection]);

  if (loading) {
    return <ScreenLoadingSpinner />;
  }

  if (error) {
    return <ScreenError />;
  }

  return (
    <View style={GlobalStyles.screenContainer} testID="SCREEN_SCROLL">
      <FlashList
        testID="flash_list"
        ref={ref}
        data={data ? data : []}
        renderItem={({item}) => (
          <ListItem
            item={item!}
            isInCollection={collection.some(
              collectionItem => collectionItem.item_id === item.id,
            )}
            // isInCollection={userCollectionFromStore.some(
            //   collectionItem => collectionItem.itemId === item.id,
            // )}
          />
        )}
        extraData={collection}
        estimatedItemSize={144}
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.9}
        contentContainerStyle={GlobalStyles.screenFlatList}
        onEndReached={() => {
          if (currentScreen !== 'Collection') {
            console.log('END_REACHED', currentScreen);
            setPage(page + 1);
          }
        }}
      />
    </View>
  );
});

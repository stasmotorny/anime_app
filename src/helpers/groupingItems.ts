import {Media, MediaType} from '../API/__generated__/graphql.ts';
import {GroupedItems} from '../types/groupedItems.ts';
import {CollectionItem} from '../reactiveVariablesStore/userCollectionStore.ts';
import {GroupedObject} from '../types/groupedObject.ts';

export const groupItems = (items: Media[]) => {
  let groupedItemsObject: GroupedItems = {
    anime: [],
    manga: [],
  };

  items.forEach(item => {
    if (item.type === MediaType.Manga) {
      groupedItemsObject.manga.push(item);
    }
    if (item.type === MediaType.Anime) {
      groupedItemsObject.anime.push(item);
    }
  });
  return groupedItemsObject;
};

export const groupItemsWithUserGroups = (
  items: Media[],
  userCollection: CollectionItem[],
): GroupedObject => {
  let groupedItemsObject: GroupedObject = {
    anime: [],
    manga: [],
  };

  const hasItemUserGroup = (itemId: number) => {
    const itemFromUserCollection = userCollection.find(
      // collectionItem => collectionItem.itemId === itemId,
      collectionItem => collectionItem.item_id === itemId,
    );
    return (
      itemFromUserCollection &&
      // itemFromUserCollection.itemGroup !== MediaType.Anime &&
      // itemFromUserCollection.itemGroup !== MediaType.Manga
      itemFromUserCollection.item_group !== MediaType.Anime &&
      itemFromUserCollection.item_group !== MediaType.Manga
    );
  };

  items.forEach(item => {
    if (hasItemUserGroup(item.id)) {
      const itemFromUserCollection = userCollection.find(
        // collectionItem => collectionItem.itemId === item.id,
        collectionItem => collectionItem.item_id === item.id,
      );
      // if (groupedItemsObject[itemFromUserCollection!.itemGroup]) {
        if (groupedItemsObject[itemFromUserCollection!.item_group]) {
        // groupedItemsObject[itemFromUserCollection!.itemGroup].push(item);
        groupedItemsObject[itemFromUserCollection!.item_group].push(item);
      } else {
        // groupedItemsObject[itemFromUserCollection!.itemGroup] = [item];
        groupedItemsObject[itemFromUserCollection!.item_group] = [item];
      }
    }
    if (!hasItemUserGroup(item.id) && item.type === MediaType.Manga) {
      groupedItemsObject.manga.push(item);
    }
    if (!hasItemUserGroup(item.id) && item.type === MediaType.Anime) {
      groupedItemsObject.anime.push(item);
    }
  });
  // return groupedItemsObject;
  console.log('GROUPED_ITEMS', groupedItemsObject);
  return groupedItemsObject;
};

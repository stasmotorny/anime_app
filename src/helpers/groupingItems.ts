import {Media, MediaType} from '../API/__generated__/graphql.ts';
import {GroupedItems} from '../types/groupedItems.ts';
import {CollectionItem} from '../types/navigation.ts';
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
      collectionItem => collectionItem.itemId === itemId,
    );
    return (
      itemFromUserCollection &&
      itemFromUserCollection.itemGroup !== MediaType.Anime &&
      itemFromUserCollection.itemGroup !== MediaType.Manga
    );
  };

  items.forEach(item => {
    if (hasItemUserGroup(item.id)) {
      const itemFromUserCollection = userCollection.find(
        collectionItem => collectionItem.itemId === item.id,
      );
      if (groupedItemsObject[itemFromUserCollection!.itemGroup]) {
        groupedItemsObject[itemFromUserCollection!.itemGroup].push(item);
      } else {
        groupedItemsObject[itemFromUserCollection!.itemGroup] = [item];
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

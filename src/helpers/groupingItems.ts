import {Media, MediaType} from '../API/__generated__/graphql.ts';
import {GroupedItems} from '../types/groupedItems.ts';

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

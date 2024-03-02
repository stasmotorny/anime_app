import * as React from 'react';
import {BottomNavigation, Appbar} from 'react-native-paper';
import {Anime} from '../screens/anime.tsx';
import {Manga} from '../screens/manga.tsx';
import {Collection} from '../screens/collection.tsx';
import {signOut} from '../helpers/auth.ts';

const PaperBottomNavigation = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'anime', title: 'Anime', focusedIcon: 'television'},
    {key: 'manga', title: 'Manga', focusedIcon: 'book-open-outline'},
    {key: 'collection', title: 'Collection', focusedIcon: 'cards-heart-outline'},
  ]);

  const renderScene = BottomNavigation.SceneMap({
    anime: Anime,
    manga: Manga,
    collection: Collection,
  });

  return (
    <>
      <Appbar.Header>
        <Appbar.Content title={routes[index].title} />
        <Appbar.Action icon="magnify" onPress={() => {}} />
        <Appbar.Action icon="logout" onPress={() => signOut()} />
      </Appbar.Header>
      <BottomNavigation
        navigationState={{index, routes}}
        onIndexChange={setIndex}
        renderScene={renderScene}
        sceneAnimationEnabled={true}
        sceneAnimationType="shifting"
      />
    </>
  );
};

export default PaperBottomNavigation;

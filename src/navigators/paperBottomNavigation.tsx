import * as React from 'react';
import {BottomNavigation, Appbar} from 'react-native-paper';
import {Anime} from '../screens/anime.tsx';
import {Manga} from '../screens/manga.tsx';
import {Collection} from '../screens/collection.tsx';
import {signOut} from '../helpers/auth.ts';
import { Colors } from "../colors/colors.ts";
import { StyleSheet } from "react-native";

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

  const iconColor = Colors.white;

  return (
    <>
      <Appbar.Header style={styles.appbar}>
        <Appbar.Content title={routes[index].title} titleStyle={styles.appBarTitle}/>
        <Appbar.Action icon="magnify" onPress={() => {}} color={iconColor} />
        <Appbar.Action icon="logout" onPress={() => signOut()} color={iconColor} />
      </Appbar.Header>
      <BottomNavigation
        navigationState={{index, routes}}
        onIndexChange={setIndex}
        renderScene={renderScene}
        sceneAnimationEnabled={true}
        sceneAnimationType="shifting"
        barStyle={styles.bar}
        activeColor={iconColor}
        activeIndicatorStyle={styles.activeIndicator}
      />
    </>
  );
};

const styles = StyleSheet.create({
  appbar: {
    backgroundColor: Colors.black,
  },
  appBarTitle: {
    color: Colors.white,
  },
  bar: {
    backgroundColor: Colors.black,
  },
  activeIndicator: {
    backgroundColor: Colors.opacityWhite
  }
});

export default PaperBottomNavigation;

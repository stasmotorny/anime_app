import React, {useState} from 'react';
import {
  BottomNavigation,
  Appbar,
  PaperProvider,
  Badge,
  Surface,
} from 'react-native-paper';
import {Anime} from '../screens/anime.tsx';
import {Manga} from '../screens/manga.tsx';
import {Collection} from '../screens/collection.tsx';
import {signOut} from '../helpers/auth.ts';
import {Colors} from '../colors/colors.ts';
import {StyleSheet} from 'react-native';
import {Search} from '../components/search.tsx';
import {useReactiveVar} from '@apollo/client';
import {
  filterState,
  initialFilterState,
} from '../reactiveVariablesStore/filterState.ts';
import {currentScreen} from '../reactiveVariablesStore/currentScreen.ts';
import {Sort} from '../components/sort.tsx';

const PaperBottomNavigation = () => {
  const searchQuery = useReactiveVar(filterState);

  const [index, setIndex] = useState(0);

  const [routes] = useState([
    {key: 'anime', title: 'Anime', focusedIcon: 'television'},
    {key: 'manga', title: 'Manga', focusedIcon: 'book-open-outline'},
    {
      key: 'collection',
      title: 'Collection',
      focusedIcon: 'cards-heart-outline',
    },
  ]);

  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const [isSortVisible, setIsSortVisible] = useState(false);

  const renderScene = BottomNavigation.SceneMap({
    anime: Anime,
    manga: Manga,
    collection: Collection,
  });

  const iconColor = Colors.white;

  return (
    <PaperProvider>
      <Appbar.Header style={styles.appbar}>
        <Appbar.Content
          title={routes[index].title}
          titleStyle={styles.appBarTitle}
        />
        <Appbar.Action
          icon="sort"
          onPress={() => setIsSortVisible(!isSortVisible)}
          color={iconColor}
        />
        <Surface elevation={0}>
          <Badge
            style={styles.badgeStyle}
            visible={
              Object.keys(searchQuery).filter(key => searchQuery[key]).length >
              0
            }>
            {Object.keys(searchQuery).filter(key => searchQuery[key]).length}
          </Badge>
          <Appbar.Action
            icon="magnify"
            onPress={() => {
              setIsSearchVisible(!isSearchVisible);
            }}
            color={iconColor}
          />
        </Surface>
        <Appbar.Action
          icon="logout"
          onPress={() => signOut()}
          color={iconColor}
        />
      </Appbar.Header>
      <Sort
        isBannerVisible={isSortVisible}
        hideBanner={() => {
          setIsSortVisible(false);
        }}
      />
      <BottomNavigation
        navigationState={{index, routes}}
        onIndexChange={val => {
          setIndex(val);
          filterState(initialFilterState);
          currentScreen(routes[val].title);
        }}
        renderScene={renderScene}
        sceneAnimationEnabled={true}
        sceneAnimationType="shifting"
        barStyle={styles.bar}
        activeColor={iconColor}
        activeIndicatorStyle={styles.activeIndicator}
      />
      <Search
        isDialogueVisible={isSearchVisible}
        hideDialog={() => {
          setIsSearchVisible(false);
        }}
      />
    </PaperProvider>
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
    backgroundColor: Colors.opacityWhite,
  },
  badgeStyle: {
    position: 'absolute',
    top: 5,
    right: 5,
  },
});

export default PaperBottomNavigation;

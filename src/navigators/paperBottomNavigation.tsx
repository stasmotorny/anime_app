import React, {useEffect, useState} from 'react';
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
import {Colors} from '../colors/colors.ts';
import {StyleSheet} from 'react-native';
import {Search} from '../components/search.tsx';
import {Sort} from '../components/sort.tsx';
import useUserStore from '../reactiveVariablesStore/userStore.ts';
import {useGetCollection} from '../API/getCollection.ts';
import useCurrentScreenStore from '../reactiveVariablesStore/currentScreenStore.ts';
import useFilterStore from '../reactiveVariablesStore/filterStore.ts';

type RenderSceneArgument = {
  route: {
    key: string;
    title: string;
    focusedIcon: string;
  };
};

const PaperBottomNavigation = () => {
  const {name, genre, startDateGreater, startDateLesser, status, resetFilter} = useFilterStore();
  const {userTokenId, resetUser} = useUserStore();
  const {mutate} = useGetCollection();
  const {setCurrentScreen} = useCurrentScreenStore();

  const searchQuery: {[key: string]: string} = {
    name,
    genre,
    startDateGreater,
    startDateLesser,
    status,
  };

  useEffect(() => {
    if (userTokenId) {
      console.log('BAM');
      mutate();
    }
  }, []);

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

  // if (user) {
  //   getAdditionalUserData(user.user.uid);
  // }

  const renderScene = ({route}: RenderSceneArgument) => {
    if (routes[index].key !== route.key) {
      return null;
    }
    switch (route.key) {
      case 'anime':
        return <Anime />;
      case 'manga':
        return <Manga />;
      case 'collection':
        return <Collection />;
    }
  };

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
          onPress={() => resetUser()}
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
          resetFilter();
          setCurrentScreen(routes[val].title as 'Anime' | 'Manga' | 'Collection');
        }}
        renderScene={renderScene}
        sceneAnimationEnabled={true}
        sceneAnimationType="shifting"
        barStyle={styles.bar}
        activeColor={iconColor}
        activeIndicatorStyle={styles.activeIndicator}
        // style={{paddingHorizontal: 12}}
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

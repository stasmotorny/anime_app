import {Media} from '../API/__generated__/graphql.ts';
import {Button, Card, Text} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StackParamList} from '../types/navigation.ts';
import {StackNavigationProp} from '@react-navigation/stack';
import {Colors} from '../colors/colors.ts';
import {statusTitles} from '../helpers/enumFormatters.ts';
import {AddRelatedItemsDialogue} from './addRelatedItemsDialogue.tsx';
import {ChangeGroupDialogue} from './changeGroupDialogue.tsx';
import analytics from '@react-native-firebase/analytics';
import {useAddItemInCollection} from '../API/addItemInCollection.ts';
import {useRemoveItemFromCollection} from '../API/removeItemFromCollection.ts';
import useCurrentScreenStore from '../store/currentScreenStore.ts';

type Props = {
  item: Media;
  isInCollection: boolean;
};

export const ListItem = ({item, isInCollection}: Props) => {
  const {currentScreen: screen} = useCurrentScreenStore();
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();
  const [isVisible, setIsVisible] = useState(false);
  const [isGroupChangeVisible, setIsGroupChangeVisible] = useState(false);
  const { mutate: addInCollection, isLoading, isError } = useAddItemInCollection();
  const {mutate: removeFromCollection} = useRemoveItemFromCollection();

  const addRelatedItemsDialogue = (relatedItems: Media[]) => {
    if (relatedItems) {
      setIsVisible(true);
    } else {
      addInCollection({
        itemId: item.id,
        itemGroup: item.type!,
      });
    }
  };

  return (
    <Card
      testID="item-card"
      onPress={() => {
        navigation.navigate('Details', {itemId: item.id});
      }}
      onLongPress={() => {
        screen === 'Collection' ? setIsGroupChangeVisible(true) : null;
      }}
      contentStyle={styles.cardContent}
      style={styles.card}>
      <Card.Cover
        source={{uri: item?.coverImage?.medium!}}
        resizeMode="contain"
        style={styles.cardCover}
      />
      <View style={styles.cardRightContainer}>
        <Card.Title
          title={item?.title?.english || 'Unknown'}
          titleNumberOfLines={2}
          titleStyle={styles.titleStyle}
        />
        <Card.Content>
          <Text style={styles.textStyle} variant="titleMedium">
            Status
          </Text>
          <Text style={styles.textStyle} variant="bodySmall">
            {item?.status ? statusTitles[item.status] : 'Unknown'}
          </Text>
        </Card.Content>
      </View>
      {isInCollection ? (
        <Card.Actions>
          <Button
            testID="remove_button"
            onPress={async () => {
              removeFromCollection({itemId: item.id});
              await analytics().logEvent('Remove_item', {
                id: item.id,
                name: item.title?.english,
              });
            }}>
            Remove
          </Button>
        </Card.Actions>
      ) : (
        <Card.Actions>
          <Button
            testID="add_button"
            onPress={async () => {
              addRelatedItemsDialogue(item.relations?.nodes as Media[]);
              setIsVisible(true);
              await analytics().logEvent('Add_item', {
                id: item.id,
                name: item.title?.english,
              });
            }}>
            Add
          </Button>
        </Card.Actions>
      )}
      <AddRelatedItemsDialogue
        isVisible={isVisible}
        item={item}
        setIsVisible={setIsVisible}
      />
      <ChangeGroupDialogue
        isVisible={isGroupChangeVisible}
        setIsVisible={setIsGroupChangeVisible}
        itemId={item.id}
      />
    </Card>
  );
};

const styles = StyleSheet.create({
  cardContent: {
    flexDirection: 'row',
  },
  card: {
    paddingHorizontal: 12,
    marginBottom: 12,
    backgroundColor: Colors.grey900,
  },
  cardCover: {
    width: 70,
    height: 120,
    backgroundColor: Colors.grey900,
  },
  cardRightContainer: {
    width: '80%',
    flex: 1,
    justifyContent: 'center',
  },
  titleStyle: {
    color: Colors.white,
  },
  textStyle: {
    color: Colors.white,
  },
});

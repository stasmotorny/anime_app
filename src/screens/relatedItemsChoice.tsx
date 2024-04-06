import React, {useEffect, useState} from 'react';
import {Media, MediaType} from '../API/__generated__/graphql.ts';
import {List, Chip, Divider, Button, Surface} from 'react-native-paper';
import {StackScreenProps} from '@react-navigation/stack';
import {StackParamList} from '../types/navigation.ts';
import {ScrollView, StyleSheet} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {UserData} from '../reactiveVariablesStore/userAuthState.ts';
import {useReactiveVar} from '@apollo/client';
import {userCollection} from '../reactiveVariablesStore/userCollection.ts';

type GroupedItems = {
  anime: Media[];
  manga: Media[];
};

type Props = StackScreenProps<StackParamList, 'Choose_related_items'>;

export const RelatedItemsChoice = (props: Props) => {
  const user = UserData();
  const collection = useReactiveVar(userCollection);
  const firebase = firestore().collection('userCollection').doc(user?.user.uid);
  const {relatedItems, mainItemId} = props.route.params;
  const navigation = props.navigation;
  const [groupedItems, setGroupedItems] = useState<GroupedItems>({
    anime: [],
    manga: [],
  });
  const [selected, setSelected] = useState<number[]>([mainItemId]);

  useEffect(() => {
    groupItems(relatedItems);
  }, [relatedItems]);

  const groupItems = (items: Media[]) => {
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
    setGroupedItems(groupedItemsObject);
  };

  const onChipPress = (isSelected: boolean, itemId: number) => {
    if (isSelected) {
      setSelected(selected.filter(item => item !== itemId));
    } else {
      setSelected([...selected, itemId]);
    }
  };

  return (
    <List.Section style={styles.listSection}>
      <ScrollView style={styles.scrollView}>
        <List.Accordion title="Anime" id="1">
          {groupedItems.anime.map(item => {
            if (!collection.includes(item.id)) {
              return (
                <Chip
                  key={item.id}
                  style={styles.chip}
                  selected={selected.includes(item.id)}
                  onPress={() => {
                    onChipPress(selected.includes(item.id), item.id);
                  }}>
                  {item.title?.english || 'Unknown'}
                </Chip>
              );
            }
          })}
        </List.Accordion>
        <Divider style={styles.divider} />
        <List.Accordion title="Manga" id="2">
          {groupedItems.manga.map(item => {
            if (!collection.includes(item.id)) {
              return (
                <Chip
                  key={item.id}
                  style={styles.chip}
                  selected={selected.includes(item.id)}
                  onPress={() => {
                    onChipPress(selected.includes(item.id), item.id);
                  }}>
                  {item.title?.english || 'Unknown'}
                </Chip>
              );
            }
          })}
        </List.Accordion>
      </ScrollView>
      <Surface mode="flat" style={styles.buttonsContainer}>
        <Button
          mode="contained"
          disabled={selected.length === 1}
          style={styles.button}
          onPress={() => {
            firebase.update({
              collection: firestore.FieldValue.arrayUnion(...selected),
            });
            navigation.goBack();
          }}>
          Add
        </Button>
        <Button
          mode="contained"
          style={styles.button}
          onPress={() => {
            firebase.update({
              collection: firestore.FieldValue.arrayUnion(mainItemId),
            });
            navigation.goBack();
          }}>
          Cancel
        </Button>
      </Surface>
    </List.Section>
  );
};

const styles = StyleSheet.create({
  listSection: {
    flex: 1,
    paddingHorizontal: 16,
  },
  scrollView: {
    flex: 1,
  },
  chip: {
    marginTop: 16,
    paddingVertical: 8,
  },
  divider: {
    marginVertical: 8,
  },
  buttonsContainer: {
    elevation: 0,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 32,
  },
  button: {
    width: '40%',
  },
});

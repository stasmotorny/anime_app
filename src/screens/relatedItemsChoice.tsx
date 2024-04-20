import React, {useEffect, useState} from 'react';
import {List, Chip, Divider, Button, Surface} from 'react-native-paper';
import {StackScreenProps} from '@react-navigation/stack';
import {CollectionItem, StackParamList} from '../types/navigation.ts';
import {ScrollView, StyleSheet} from 'react-native';
import {useReactiveVar} from '@apollo/client';
import {
  addNewItemToDB,
  userCollection,
} from '../reactiveVariablesStore/userCollection.ts';
import {GroupedItems} from '../types/groupedItems.ts';
import {groupItems} from '../helpers/groupingItems.ts';

type Props = StackScreenProps<StackParamList, 'Choose_related_items'>;

export const RelatedItemsChoice = (props: Props) => {
  const collection = useReactiveVar(userCollection);

  const {relatedItems, mainItem} = props.route.params;
  const navigation = props.navigation;

  const [groupedItems, setGroupedItems] = useState<GroupedItems>({
    anime: [],
    manga: [],
  });
  const [selected, setSelected] = useState<CollectionItem[]>([mainItem]);

  useEffect(() => {
    // @ts-ignore
    setGroupedItems(groupItems(relatedItems));
  }, [relatedItems]);

  const onChipPress = (
    isSelected: boolean,
    itemId: number,
    itemGroup: string,
  ) => {
    if (isSelected) {
      setSelected(selected.filter(item => item.itemId !== itemId));
    } else {
      setSelected([...selected, {itemId: itemId, itemGroup: itemGroup}]);
    }
  };

  return (
    <List.Section style={styles.listSection}>
      <ScrollView style={styles.scrollView}>
        <List.Accordion title="Anime" id="1">
          {groupedItems.anime.map(item => {
            if (
              !collection.some(
                collectionItem => item.id === collectionItem.itemId,
              )
            ) {
              return (
                <Chip
                  key={item.id}
                  style={styles.chip}
                  selected={selected.some(
                    selectedItem => item.id === selectedItem.itemId,
                  )}
                  onPress={() => {
                    onChipPress(
                      selected.some(
                        selectedItem => item.id === selectedItem.itemId,
                      ),
                      item.id,
                      item.type!,
                    );
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
            if (
              !collection.some(
                collectionItem => item.id === collectionItem.itemId,
              )
            ) {
              return (
                <Chip
                  key={item.id}
                  style={styles.chip}
                  selected={selected.some(
                    selectedItem => item.id === selectedItem.itemId,
                  )}
                  onPress={() => {
                    onChipPress(
                      selected.some(
                        selectedItem => selectedItem.itemId === item.id,
                      ),
                      item.id,
                      item.type!,
                    );
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
            addNewItemToDB(selected);
            navigation.goBack();
          }}>
          Add
        </Button>
        <Button
          mode="contained"
          style={styles.button}
          onPress={() => {
            addNewItemToDB(mainItem);
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

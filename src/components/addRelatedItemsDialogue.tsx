import {Button, Dialog, Portal, Text} from 'react-native-paper';
import React from 'react';
import {Media} from '../API/__generated__/graphql.ts';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {StackParamList} from '../types/navigation.ts';
import {addNewItemToDB} from '../reactiveVariablesStore/userCollection.ts';

type Props = {
  item: Media;
  isVisible: boolean;
  setIsVisible: (val: boolean) => void;
};

export const AddRelatedItemsDialogue = (props: Props) => {
  const {item, isVisible, setIsVisible} = props;

  const navigation = useNavigation<StackNavigationProp<StackParamList>>();

  const onAddRelatedItems = () => {
    if (item.relations?.nodes) {
      navigation.navigate('Choose_related_items', {
        relatedItems: item.relations.nodes as Media[],
        mainItem: {
          itemId: item.id,
          itemGroup: item.type!,
        },
      });
    }
  };

  const onRefuseToAddRelatedItems = () => {
    addNewItemToDB({
      itemId: item.id,
      itemGroup: item.type!,
    });
    setIsVisible(false);
  };

  return (
    <Portal>
      <Dialog
        visible={isVisible}
        onDismiss={() => {
          setIsVisible(false);
        }}>
        <Dialog.Title>Alert</Dialog.Title>
        <Dialog.Content>
          <Text variant="bodyMedium">{`${
            item.title?.english || 'This item'
          } has related animes and mangas do you want to add them too?`}</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            onPress={() => {
              onAddRelatedItems();
              setIsVisible(false);
            }}>
            Yes
          </Button>
          <Button
            onPress={() => {
              onRefuseToAddRelatedItems();
              setIsVisible(false);
            }}>
            No
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

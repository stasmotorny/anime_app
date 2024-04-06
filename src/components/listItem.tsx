import {Media} from '../API/__generated__/graphql.ts';
import {Button, Card, Text, Dialog, Portal} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StackParamList} from '../types/navigation.ts';
import {StackNavigationProp} from '@react-navigation/stack';
import {Colors} from '../colors/colors.ts';
import {statusTitles} from '../helpers/enumFormatters.ts';
import firestore from '@react-native-firebase/firestore';
import {UserData} from '../reactiveVariablesStore/userAuthState.ts';

type Props = {
  item: Media;
  isInCollection: boolean;
};

export const ListItem = ({item, isInCollection}: Props) => {
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();
  const [isVisible, setIsVisible] = useState(false);

  const user = UserData();
  // console.log('USER', user);
  const firebase = firestore().collection('userCollection').doc(user?.user.uid);

  const addRelatedItemsDialogue = (relatedItems: Media[]) => {
    // data?.Media?.relations?.nodes
    if (relatedItems) {
      setIsVisible(true);
    } else {
      firebase.update({
        collection: firestore.FieldValue.arrayUnion(item.id),
      });
    }
  };

  const onAddRelatedItems = () => {
    if (item.relations?.nodes) {
      navigation.navigate('Choose_related_items', {
        relatedItems: item.relations.nodes as Media[],
        mainItemId: item.id,
      });
    }
  };

  const onRefuseToAddRelatedItems = () => {
    firebase.update({
      collection: firestore.FieldValue.arrayUnion(item.id),
    });
    setIsVisible(false);
  };

  return (
    <Card
      testID="item-card"
      onPress={() => navigation.navigate('Details', {itemId: item.id})}
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
            onPress={() => {
              console.log('REMOVE_BTN_PRESSED');
              firebase.update({
                collection: firestore.FieldValue.arrayRemove(item.id),
              });
            }}>
            Remove
          </Button>
        </Card.Actions>
      ) : (
        <Card.Actions>
          <Button
            testID="add_button"
            onPress={() => {
              console.log('ADD_BTN_PRESSED');
              addRelatedItemsDialogue(item.relations?.nodes as Media[]);
              setIsVisible(true);
            }}>
            Add
          </Button>
        </Card.Actions>
      )}
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

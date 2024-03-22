import {Media} from '../API/__generated__/graphql.ts';
import {Button, Card, Text} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {StackParamList} from '../types/navigation.ts';
import {StackNavigationProp} from '@react-navigation/stack';
import {Colors} from '../colors/colors.ts';
import {statusTitles} from '../helpers/enumFormatters.ts';
import firestore from '@react-native-firebase/firestore';
import {UserData} from '../reactiveVariablesStore/userAuthState.ts';

export const ListItem = ({
  item,
  isInCollection,
}: {
  item: Media;
  isInCollection: boolean;
}) => {
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();
  const user = UserData();
  const firebase = firestore().collection('userCollection').doc(user?.user.uid);

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
            onPress={() => {
              console.log('ADD_BTN_PRESSED');
              firebase
                .update({
                  collection: firestore.FieldValue.arrayRemove(item.id),
                })
                .then(response =>
                  console.log('FIRESTORE_ITEM_WAS_REMOVED', response),
                )
                .catch(error =>
                  console.error('FIRESTORE_REMOVE_ITEM_ERROR', error),
                );
            }}>
            Remove
          </Button>
        </Card.Actions>
      ) : (
        <Card.Actions>
          <Button
            onPress={() => {
              console.log('ADD_BTN_PRESSED');
              firebase
                .update({
                  collection: firestore.FieldValue.arrayUnion(item.id),
                })
                .then(response =>
                  console.log('FIRESTORE_ITEM_WAS_ADDED', response),
                )
                .catch(error =>
                  console.error('FIRESTORE_ADD_ITEM_ERROR', error),
                );
            }}>
            Add
          </Button>
        </Card.Actions>
      )}
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

import React from 'react';
import {Icon, Surface, Text, TouchableRipple} from 'react-native-paper';
import {Image, View, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {StackNavigationProp} from '@react-navigation/stack';
import {StackParamList} from '../types/navigation.ts';
import {Media} from '../API/__generated__/graphql.ts';
import {Colors} from '../colors/colors.ts';

type Props = {
  item: Media;
};

export const RelatedItem = (props: Props) => {
  const {item} = props;
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();
  return (
    <Surface style={styles.surfaceStyle}>
      <TouchableRipple
        rippleColor={Colors.rippleColor}
        onPress={() => navigation.navigate('Details', {itemId: item?.id!})}
        borderless={true}
        style={styles.touchableRippleStyle}>
        <View style={styles.informationContainerStyle}>
          {item?.coverImage?.medium ? (
            <Image
              resizeMode="contain"
              source={{uri: item?.coverImage?.medium}}
              alt="No image"
              style={styles.imageStyle}
            />
          ) : null}
          <Text style={styles.textStyle}>{item?.title?.english || 'Unknown'}</Text>
          <Icon source="chevron-right" size={24} color={Colors.white} />
        </View>
      </TouchableRipple>
    </Surface>
  );
};

const styles = StyleSheet.create({
  surfaceStyle: {
    backgroundColor: Colors.black,
    marginBottom: 16,
    borderRadius: 10,
  },
  touchableRippleStyle: {
    borderRadius: 10,
  },
  informationContainerStyle: {
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageStyle: {
    width: 40,
    height: 60,
    marginRight: 16,
  },
  textStyle: {
    color: Colors.white,
    flex: 1,
  },
});

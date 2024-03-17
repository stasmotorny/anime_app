import React, {memo} from 'react';
import {View, Text, StyleSheet} from 'react-native';

type Props = {
  text: number;
};

const Label = ({text}: Props) => {
  return (
    <View style={styles.root}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 8,
    backgroundColor: '#4499ff',
    borderRadius: 4,
  },
  text: {
    fontSize: 16,
    color: '#fff',
  },
});

export default memo(Label);

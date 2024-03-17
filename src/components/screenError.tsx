import React from 'react';
import {Text} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';
import {Colors} from '../colors/colors.ts';
import {GlobalStyles} from '../globalStyles/globalStyles.ts';

export const ScreenError = () => {
  return (
    <View style={styles.errorContainerStyle}>
      <Text variant="headlineSmall" style={GlobalStyles.errorText}>
        Failed to load data
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  errorContainerStyle: {
    flex: 1,
    backgroundColor: Colors.black,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

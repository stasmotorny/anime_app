import React from 'react';
import {ActivityIndicator} from 'react-native-paper';
import {Colors} from '../colors/colors.ts';
import {StyleSheet, View} from 'react-native';

export const ScreenLoadingSpinner = () => {
  return (
    <View style={styles.loadingContainerStyle}>
      <ActivityIndicator
        testID="activity-indicator"
        animating={true}
        color={Colors.red800}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainerStyle: {
    flex: 1,
    backgroundColor: Colors.black,
  },
});

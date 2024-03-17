import {StyleSheet} from 'react-native';
import {Colors} from '../colors/colors.ts';

export const GlobalStyles = StyleSheet.create({
  sectionHeader: {
    marginBottom: 8,
    fontWeight: 'bold',
  },
  screenContainer: {
    paddingHorizontal: 16,
    backgroundColor: Colors.black,
    flex: 1,
  },
  screenFlatList: {
    backgroundColor: Colors.black,
    paddingTop: 12,
  },
  errorText: {
    color: Colors.red800,
  },
  detailsCardStyle: {
    backgroundColor: Colors.grey900,
    marginTop: 16,
  },
  detailsCardTitleText: {
    color: Colors.white,
    fontWeight: 'bold',
  },
  darkSchemeTextStyle: {
    color: Colors.white,
  },
});

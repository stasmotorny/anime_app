import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Agenda, AgendaEntry} from 'react-native-calendars';
import moment from 'moment';
import {StackScreenProps} from '@react-navigation/stack';
import {StackParamList} from '../types/navigation.ts';

type Props = StackScreenProps<StackParamList, 'Calendar'>;

export const Calendar = (props: Props) => {
  const {items} = props.route.params;
  const {navigation} = props;

  const findNearestDate = (dates: string[]) => {
    let nearestDate = '';
    dates.forEach(item => {
      if (moment(item).isAfter(moment())) {
        if (nearestDate) {
          if (moment(item).diff(moment(nearestDate), 'days') < 0) {
            nearestDate = item;
          }
        } else {
          nearestDate = item;
        }
      }
    });
    return nearestDate;
  };

  const renderItem = (reservation: any, isFirst: boolean) => {
    const fontSize = isFirst ? 16 : 14;
    const color = isFirst ? 'black' : '#43515c';

    return (
      <TouchableOpacity
        style={[styles.item, {height: reservation.height}]}
        onPress={() =>
          navigation.navigate('Details', {itemId: reservation.id!})
        }>
        <Text style={{fontSize, color}}>{reservation.name}</Text>
        <Text>Episode: {reservation.episode}</Text>
      </TouchableOpacity>
    );
  };

  const renderEmptyDate = () => {
    return (
      <View style={styles.emptyDate}>
        <Text>This is empty date!</Text>
      </View>
    );
  };

  const rowHasChanged = (r1: AgendaEntry, r2: AgendaEntry) => {
    return r1.name !== r2.name;
  };

  return (
    <Agenda
      items={items}
      selected={findNearestDate(Object.keys(items))}
      renderItem={renderItem}
      renderEmptyData={renderEmptyDate}
      rowHasChanged={rowHasChanged}
      showClosingKnob={true}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
  },
  customDay: {
    margin: 10,
    fontSize: 24,
    color: 'green',
  },
  dayItem: {
    marginLeft: 34,
  },
});

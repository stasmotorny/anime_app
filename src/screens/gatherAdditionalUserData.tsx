import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {Colors} from '../colors/colors.ts';
import SelectDropdown from 'react-native-select-dropdown';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';

const GatherAdditionalUserData = (): React.JSX.Element => {
  const user = {};

  const [gender, setGender] = useState<string | null>(null);
  const [birthDate, setBirthDate] = useState<Date | null>(null);
  const [isDateModalOpen, setIsDateModalOpen] = useState(false);

  return (
    <>
      <View style={styles.container}>
        <Text variant="titleMedium">
          Please provide additional info about you to help us to create a
          relevant recommendations
        </Text>
        <View style={styles.inputsContainer}>
          <SelectDropdown
            data={[{title: 'Male'}, {title: 'Female'}]}
            onSelect={selectedItem => {
              setGender(selectedItem.title);
            }}
            renderButton={selectedItem => {
              return (
                <View style={styles.dropdownButtonStyle}>
                  <Text style={styles.dropdownButtonTxtStyle}>
                    {(selectedItem && selectedItem.title) ||
                      'Select your gender'}
                  </Text>
                </View>
              );
            }}
            renderItem={(item, isSelected) => {
              return (
                <View
                  style={{
                    ...styles.dropdownItemStyle,
                    ...(isSelected && {backgroundColor: '#D2D9DF'}),
                  }}>
                  <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
                </View>
              );
            }}
          />
          <Button
            mode="outlined"
            onPress={() => setIsDateModalOpen(!isDateModalOpen)}>
            {birthDate
              ? `Your date of birth is ${moment(birthDate).format(
                  'MMM Do YYYY',
                )}`
              : 'Select your date of birth'}
          </Button>
          <DatePicker
            modal
            open={isDateModalOpen}
            mode="date"
            date={birthDate || new Date()}
            onConfirm={date => {
              setIsDateModalOpen(false);
              setBirthDate(date);
            }}
            onCancel={() => {
              setIsDateModalOpen(false);
            }}
          />
        </View>
        <View style={styles.btnsContainer}>
          <Button
            testID="SaveAdditionalUserDataBtn"
            mode="elevated"
            disabled={!gender && !birthDate}
            style={styles.loginBtn}
            onPress={() => {
              // gatherAdditionalUserData(user!.user.uid, gender, birthDate);
              // isAdditionalDataGathered(true);
            }}>
            Save
          </Button>
          <Button
            mode="elevated"
            testID="CancelAdditionalUserDataBtn"
            style={styles.loginBtn}
            onPress={() => {
              // gatherAdditionalUserData(user!.user.uid, null, null);
              // isAdditionalDataGathered(true);
            }}>
            Cancel
          </Button>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 32,
    paddingHorizontal: 16,
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  errorMsg: {
    color: Colors.red800,
  },
  loginBtn: {
    // marginTop: 48,
    width: '45%',
    // alignSelf: 'center',
  },
  secondInput: {marginTop: 16},
  dropdownButtonStyle: {
    width: 200,
    height: 50,
    backgroundColor: '#E9ECEF',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#151E26',
  },
  dropdownItemStyle: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#151E26',
  },
  btnsContainer: {
    width: '100%',
    flexDirection: 'row',
    paddingVertical: 32,
    justifyContent: 'space-between',
  },
  inputsContainer: {
    alignItems: 'center',
    gap: 16,
  },
});

export default GatherAdditionalUserData;

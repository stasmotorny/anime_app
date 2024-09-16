import {
  Button,
  Dialog,
  Portal,
  TextInput,
  RadioButton,
} from 'react-native-paper';
import React, {useState, useRef} from 'react';
import {ScrollView, TextInput as RNTextInput} from 'react-native';
import useUserCollectionStore from '../store/userCollectionStore';
import {useChangeCollectionItemGroup} from '../API/changeCollectionItemGroup';

type Props = {
  isVisible: boolean;
  setIsVisible: (val: boolean) => void;
  itemId: number;
};

export const ChangeGroupDialogue = (props: Props) => {
  const {isVisible, setIsVisible, itemId} = props;
  const {mutate: changeItemGroup} = useChangeCollectionItemGroup();

  const inputRef = useRef<RNTextInput>(null);

  const [textInputValue, setTextInputValue] = useState('');
  const [radioBtnValue, setRadioBtnValue] = useState('');

  const {collection: userCollectionFromStore} = useUserCollectionStore();

  const userGroupsArray = [
    ...new Set(userCollectionFromStore.map(item => item.item_group)),
  ];

  const onRadioBtnPress = (value: string) => {
    inputRef?.current?.blur();
    setRadioBtnValue(value);
    if (textInputValue !== '') {
      setTimeout(() => setTextInputValue(''), 100);
    }
  };

  const onChangeText = (value: string) => {
    setTextInputValue(value);
  };

  const onInputFocus = () => {
    if (radioBtnValue !== '') {
      setRadioBtnValue('');
    }
  };

  const onConfirmPress = () => {
    console.log('ON_CONFIRM_PRESS_FIRED');
    const newGroup = textInputValue || radioBtnValue;
    changeItemGroup({itemId, newGroup});
  };

  return (
    <Portal>
      <Dialog testID="ChangeGroupDialogue" visible={isVisible}>
        <Dialog.Title>Change group:</Dialog.Title>
        <Dialog.Content>
          <TextInput
            testID="GroupNameInput"
            ref={inputRef}
            label="Create new group"
            value={textInputValue}
            onChangeText={onChangeText}
            onFocus={onInputFocus}
          />
          <ScrollView>
            <RadioButton.Group
              onValueChange={value => onRadioBtnPress(value)}
              value={radioBtnValue}>
              {userGroupsArray.map(groupName => (
                <RadioButton.Item
                  testID="radioBtnItem"
                  key={groupName}
                  value={groupName}
                  label={groupName}
                  status={radioBtnValue === groupName ? 'checked' : 'unchecked'}
                />
              ))}
            </RadioButton.Group>
          </ScrollView>
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            testID="groupChangeConfirmBtn"
            disabled={!textInputValue && !radioBtnValue}
            onPress={() => {
              onConfirmPress();
            }}>
            Yes
          </Button>
          <Button
            testID="groupChangeRefuseBtn"
            onPress={() => {
              setIsVisible(false);
            }}>
            No
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

import {
  Button,
  Dialog,
  Portal,
  TextInput,
  RadioButton,
} from 'react-native-paper';
import React, {useState, useRef} from 'react';
import {useReactiveVar} from '@apollo/client';
import {
  changeItemGroup,
  userCollection,
} from '../reactiveVariablesStore/userCollection.ts';
import {ScrollView, TextInput as RNTextInput} from 'react-native';

type Props = {
  isVisible: boolean;
  setIsVisible: (val: boolean) => void;
  itemId: number;
};

export const ChangeGroupDialogue = (props: Props) => {
  const {isVisible, setIsVisible, itemId} = props;

  const inputRef = useRef<RNTextInput>(null);

  const [textInputValue, setTextInputValue] = useState('');
  const [radioBtnValue, setRadioBtnValue] = useState('');

  const userCollectionFromStore = useReactiveVar(userCollection);

  const userGroupsArray = [
    ...new Set(userCollectionFromStore.map(item => item.itemGroup)),
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
    const newGroup = textInputValue || radioBtnValue;
    changeItemGroup(itemId, newGroup);
  };

  return (
    <Portal>
      <Dialog
        visible={isVisible}
        onDismiss={() => {
          setIsVisible(false);
        }}>
        <Dialog.Title>Change group:</Dialog.Title>
        <Dialog.Content>
          <TextInput
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
            disabled={!textInputValue && !radioBtnValue}
            onPress={() => {
              onConfirmPress();
              // onAddRelatedItems();
              // setIsVisible(false);
            }}>
            Yes
          </Button>
          <Button
            onPress={() => {
              // onRefuseToAddRelatedItems();
              setIsVisible(false);
            }}>
            No
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

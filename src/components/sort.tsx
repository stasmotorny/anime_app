import React from 'react';
import {Button, Chip, Dialog, Portal, Surface, Text} from 'react-native-paper';
import {MediaSort} from '../API/__generated__/graphql.ts';

type Props = {
  isDialogueVisible: boolean;
  hideDialog: Function;
};

export const Sort = (props: Props) => {
  const {isDialogueVisible, hideDialog} = props;

  const sortParameter: MediaSort[] = [
    MediaSort.Score,
    MediaSort.ScoreDesc,
    MediaSort.StartDate,
    MediaSort.StartDateDesc,
  ];

  return (
    <Portal>
      <Dialog visible={isDialogueVisible} onDismiss={() => hideDialog()}>
        <Dialog.Title>Search</Dialog.Title>
        <Dialog.Content>
          <Surface elevation={0}>
            <Text>Choose sort parameter:</Text>
            <Surface
              elevation={0}
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                paddingTop: 12,
              }}>
              {sortParameter.map(item => {
                return (
                  <Chip
                    key={item}
                    compact={true}
                    onPress={() => {}}
                    // selected={item === genre}
                    style={{marginBottom: 8}}>
                    {item}
                  </Chip>
                );
              })}
            </Surface>
          </Surface>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={() => hideDialog()}>Done</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

import React from "react";
import { Colors } from "../colors/colors.ts";
import { Card, Text } from "react-native-paper";
import { StyleSheet } from "react-native";

type Props = {
  description: string | null | undefined;
};

export const Description = (props: Props) => {
  const {description} = props;
  const regex = /(<([^>]+)>)/gi;
  const descriptionText = description ? description.replace(regex, '') : 'Description was not found';

  return (
    <Card style={styles.cardStyle}>
      <Card.Title
        title="Description:"
        titleNumberOfLines={1}
        titleStyle={styles.titleStyle}
      />
      <Card.Content>
        <Text variant="bodySmall" style={styles.textStyle}>
          {descriptionText}
        </Text>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  cardStyle: {
    backgroundColor: Colors.grey900,
    marginTop: 16,
  },
  titleStyle: {
    color: Colors.white,
    fontWeight: 'bold',
  },
  textStyle: {
    color: Colors.white,
  },
});

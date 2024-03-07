import { ImageBackground, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { Avatar, Text } from "react-native-paper";
import { Colors } from "../colors/colors.ts";
import React from "react";

type Props = {
  imgUrl: string;
  score?: string;
  title?: string | null;
};

export const GradientImageWithText = (props: Props) => {
  const {imgUrl, score, title} = props;
  return (
    <>
      <ImageBackground
        style={{width: '100%', height: 300}}
        resizeMode="contain"
        source={{uri: imgUrl}}>
        <LinearGradient
          colors={['#00000000', '#000000']}
          style={{height: '100%', width: '100%', justifyContent: 'space-between'}}>
          <Avatar.Text
            style={{
              alignSelf: 'flex-end',
              marginTop: 16,
              marginRight: 16,
              backgroundColor: Colors.black,
              borderWidth: 2,
              borderColor: Colors.white,
            }}
            label={score || '??'}
          />
        </LinearGradient>
      </ImageBackground>
      <View
        style={{
          marginTop: -24,
          paddingHorizontal: 16,
        }}>
        <Text style={{color: Colors.white}} variant="headlineLarge">
          {title || 'Unknown'}
        </Text>
      </View>
    </>
  );
};

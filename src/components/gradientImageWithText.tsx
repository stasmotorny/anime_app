import React from 'react';
import {ImageBackground, StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Avatar, Text} from 'react-native-paper';
import {Colors} from '../colors/colors.ts';
import {GlobalStyles} from '../globalStyles/globalStyles.ts';

type Props = {
  imgUrl?: string | null;
  score?: string;
  title?: string | null;
};

export const GradientImageWithText = (props: Props) => {
  const {imgUrl, score, title} = props;
  const noImageUri =
    'https://img.freepik.com/free-vector/gradient-no-photo-sign-design_23-2149292668.jpg?w=1480&t=st=1710012432~exp=1710013032~hmac=937f9c813b79fd25762b0710f858c47728e22b183af349d9f7a5d4ec1bc3d307';

  return (
    <>
      <ImageBackground
        testID="image-gradient"
        style={styles.imgStyle}
        resizeMode="contain"
        source={imgUrl ? {uri: imgUrl} : {uri: noImageUri}}>
        <LinearGradient
          colors={['#00000000', '#000000']}
          style={styles.gradientStyle}>
          <Avatar.Text style={styles.avatarTextStyle} label={score || '??'} />
        </LinearGradient>
      </ImageBackground>
      <View style={styles.titleContainer}>
        <Text style={GlobalStyles.darkSchemeTextStyle} variant="headlineLarge">
          {title || 'Unknown'}
        </Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  imgStyle: {
    width: '100%',
    height: 300,
  },
  gradientStyle: {
    height: '100%',
    width: '100%',
    justifyContent: 'space-between',
  },
  avatarTextStyle: {
    alignSelf: 'flex-end',
    marginTop: 16,
    marginRight: 16,
    backgroundColor: Colors.black,
    borderWidth: 2,
    borderColor: Colors.white,
  },
  titleContainer: {
    marginTop: -24,
    paddingHorizontal: 16,
  },
});

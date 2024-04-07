import {GlobalStyles} from '../globalStyles/globalStyles.ts';
import {Card, Text} from 'react-native-paper';
import React, {useState} from 'react';
import YoutubePlayer from 'react-native-youtube-iframe';

type Props = {
  id: string;
};
export const YoutubeTrailer = (props: Props) => {
  const {id} = props;

  const [error, setError] = useState('');

  return (
    <Card testID="trailer-card" style={GlobalStyles.detailsCardStyle}>
      <Card.Title
        title="Trailer:"
        titleNumberOfLines={1}
        titleStyle={GlobalStyles.detailsCardTitleText}
      />
      <Card.Content>
        {error ? (
          <Text style={GlobalStyles.darkSchemeTextStyle}>
            Video is unavailable.
          </Text>
        ) : (
          <YoutubePlayer
            videoId={id}
            height={240}
            onError={youtubeError => {
              setError(youtubeError);
            }}
          />
        )}
      </Card.Content>
    </Card>
  );
};

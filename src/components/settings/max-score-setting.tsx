import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SettingDescriptionLabel } from './setting-description-label';
import { MaxScoreControl } from './max-score-control';

interface MaxScoreSettingProps {
  description: string;
  maxScore: number;
  onChange: (maxScore: number) => void;
}

export const MaxScoreSetting: React.FC<MaxScoreSettingProps> = props => (
  <View style={styles.setting}>
    <SettingDescriptionLabel text={props.description} />
    <MaxScoreControl maxScore={props.maxScore} onChange={props.onChange} />
  </View>
);

const styles = StyleSheet.create({
  setting: {
    flexDirection: 'row',
    backgroundColor: '#333',
    borderBottomColor: '#444',
    borderBottomWidth: 2,
  },
});

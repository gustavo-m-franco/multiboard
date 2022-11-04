import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SettingDescriptionLabel } from './setting-description-label';
import { TimeLimitControl } from './time-limit-control';

interface TimeLimitSettingsProps {
  description: string;
  updateTimeLimit: (time: string) => void;
  timed: boolean;
  time: string;
  showWrongTimeMessage: () => void;
}

export const TimeLimitSettings: React.FC<TimeLimitSettingsProps> = props => {
  return (
    <View style={styles.setting}>
      <SettingDescriptionLabel text={props.description} />
      <TimeLimitControl
        time={props.time}
        updateTimeLimit={props.updateTimeLimit}
        showWrongTimeMessage={props.showWrongTimeMessage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  setting: {
    flexDirection: 'row',
    backgroundColor: '#333',
    borderBottomColor: '#444',
    borderBottomWidth: 2,
  },
});

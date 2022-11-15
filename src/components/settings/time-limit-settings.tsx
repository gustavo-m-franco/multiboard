import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SettingDescriptionLabel } from './setting-description-label';
import { TimeLimitControl } from './time-limit-control';
import { FieldError } from 'react-hook-form';

interface TimeLimitSettingsProps {
  description: string;
  onChange: (time: string) => void;
  time: string;
  error?: FieldError;
}

// TODO error
export const TimeLimitSettings: React.FC<TimeLimitSettingsProps> = ({
  description,
  onChange,
  time,
  error,
}) => (
  <View style={styles.setting}>
    <SettingDescriptionLabel text={description} />
    <TimeLimitControl time={time} updateTimeLimit={onChange} />
    {error?.message && <Text style={styles.error}>{error?.message}</Text>}
  </View>
);

const styles = StyleSheet.create({
  setting: {
    flexDirection: 'row',
    backgroundColor: '#333',
    borderBottomColor: '#444',
    borderBottomWidth: 2,
  },
  error: {
    color: '#F66',
    textAlign: 'center',
    fontSize: 12,
  },
});

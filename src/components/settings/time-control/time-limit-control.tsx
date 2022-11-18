import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { TimeLimitInput } from './time-limit-input';
import { FieldError } from 'react-hook-form';
import { ControlInputWrapper } from '../control/control-input-wrapper';

interface TimeLimitSettingsProps {
  description: string;
  onChange: (time: string) => void;
  time: string;
  error?: FieldError;
}

// TODO error
export const TimeLimitControl: React.FC<TimeLimitSettingsProps> = ({
  description,
  onChange,
  time,
  error,
}) => (
  <ControlInputWrapper description={description}>
    <TimeLimitInput time={time} updateTimeLimit={onChange} />
    {error?.message && <Text style={styles.error}>{error?.message}</Text>}
  </ControlInputWrapper>
);

const styles = StyleSheet.create({
  error: {
    color: '#F66',
    textAlign: 'center',
    fontSize: 12,
  },
});

import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { ControlDescriptionLabel } from './control-description-label';
import { ControlContainer } from './control-container';

interface ControlInputWrapperProps {
  description: string;
  children: React.ReactNode;
  style?: ViewStyle;
}

export const ControlInputWrapper: React.FC<ControlInputWrapperProps> = ({
  description,
  children,
}) => (
  <ControlContainer style={styles.setting}>
    <ControlDescriptionLabel text={description} />
    {children}
  </ControlContainer>
);

const styles = StyleSheet.create({
  setting: {
    flexDirection: 'row',
    backgroundColor: '#333',
    borderBottomColor: '#444',
    borderBottomWidth: 2,
  },
});

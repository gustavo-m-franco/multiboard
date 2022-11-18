import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

interface InputContainerProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export const ControlContainer: React.FC<InputContainerProps> = ({
  children,
  style,
}) => <View style={[styles.savedGameContainer, style]}>{children}</View>;

const styles = StyleSheet.create({
  savedGameContainer: {
    flex: 2,
    alignSelf: 'stretch',
    backgroundColor: '#333',
    borderBottomColor: '#444',
    borderBottomWidth: 2,
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
});

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const SettingDescriptionLabel: React.FC<{ text: string }> = props => (
  <View style={styles.labelContainer}>
    <Text style={styles.label}>{props.text}</Text>
  </View>
);

const styles = StyleSheet.create({
  labelContainer: {
    flex: 3,
    flexDirection: 'row',
  },
  label: {
    flex: 1,
    textAlign: 'center',
    color: '#fff',
    paddingTop: 18,
    paddingBottom: 18,
    paddingLeft: 5,
    paddingRight: 5,
    fontWeight: '900',
  },
});

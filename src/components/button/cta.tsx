import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

interface GameNameInputProps {
  onPress: () => void;
  label: string;
}

export const CTA: React.FC<GameNameInputProps> = ({ label, onPress }) => (
  <TouchableOpacity style={styles.saveGameButton} onPress={onPress}>
    <Text style={styles.optionButtonText}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  optionButtonText: {
    color: '#999',
    fontWeight: '900',
    padding: 3,
    fontSize: 15,
    textAlign: 'center',
  },
  saveGameButton: {
    height: 44,
    flex: 1,
    backgroundColor: '#333',
    marginBottom: 15,
    marginLeft: 10,
    marginRight: 10,
    padding: 10,
    borderRadius: 10,
  },
});

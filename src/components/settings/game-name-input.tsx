import React from 'react';
import { StyleSheet, TextInput, Text, View } from 'react-native';

interface GameNameInputProps {
  name?: string;
  onChangeText: (name: string) => void;
  onBlur: () => void;
  error?: string;
}

export const GameNameInput: React.FC<GameNameInputProps> = ({
  name,
  onChangeText,
  onBlur,
  error,
}) => (
  <View style={styles.saveGameContainer}>
    <TextInput
      onBlur={onBlur}
      value={name}
      style={[styles.saveGameName, error ? styles.onError : undefined]}
      placeholder="Game name"
      placeholderTextColor="#999"
      onChangeText={onChangeText}
      underlineColorAndroid="rgba(0,0,0,0)"
    />
    {error && <Text style={styles.error}>{error}</Text>}
  </View>
);

const styles = StyleSheet.create({
  saveGameContainer: {
    backgroundColor: '#333',
    flexDirection: 'column',
    alignItems: 'stretch',
    borderBottomColor: '#444',
    borderBottomWidth: 2,
    height: 64,
  },
  saveGameName: {
    height: 44,
    flex: 1,
    fontSize: 15,
    textAlign: 'center',
    backgroundColor: '#222',
    margin: 10,
    marginBottom: 12,
    borderRadius: 10,
    color: '#fff',
    letterSpacing: 2,
  },
  onError: {
    marginBottom: 0,
  },
  error: {
    color: '#F66',
    textAlign: 'center',
    fontSize: 12,
  },
});

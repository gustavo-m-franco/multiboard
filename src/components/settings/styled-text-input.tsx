import React from 'react';
import { StyleSheet, TextInput, Text } from 'react-native';

interface GameNameInputProps {
  value?: string;
  onChangeText: (name: string) => void;
  onBlur: () => void;
  error?: string;
  placeholder: string;
}

export const StyledTextInput: React.FC<GameNameInputProps> = ({
  value,
  placeholder,
  onChangeText,
  onBlur,
  error,
}) => (
  <>
    <TextInput
      onBlur={onBlur}
      value={value}
      style={[styles.saveGameName, error ? styles.onError : undefined]}
      placeholder={placeholder}
      placeholderTextColor="#999"
      onChangeText={onChangeText}
      underlineColorAndroid="rgba(0,0,0,0)"
    />
    {error && <Text style={styles.error}>{error}</Text>}
  </>
);

const styles = StyleSheet.create({
  saveGameName: {
    height: 44,
    flex: 1,
    fontSize: 15,
    textAlign: 'center',
    backgroundColor: '#222',
    margin: 12,
    borderRadius: 12,
    color: '#fff',
    letterSpacing: 2,
  },
  onError: {
    marginBottom: 2,
  },
  error: {
    marginTop: -4,
    marginBottom: 0,
    color: '#F66',
    textAlign: 'center',
    fontSize: 12,
  },
});

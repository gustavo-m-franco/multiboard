import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Icon } from '@rneui/themed';

interface GameNameLabelProps {
  name: string;
  editGame: () => void;
}
export const GameNameLabel: React.FC<GameNameLabelProps> = ({
  name,
  editGame,
}) => (
  <View style={styles.savedGameContainer}>
    <View style={styles.editGameNameContainer}>
      <Text style={styles.savedGameName}>{name}</Text>
      <TouchableOpacity onPress={editGame}>
        <Icon name="edit" size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  savedGameContainer: {
    backgroundColor: '#333',
    borderBottomColor: '#444',
    borderBottomWidth: 2,
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'center',
    padding: 10,
  },
  editGameNameContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
  },
  savedGameName: {
    fontSize: 15,
    textAlign: 'center',
    backgroundColor: '#333',
    color: '#fff',
    letterSpacing: 2,
    margin: 10,
  },
});

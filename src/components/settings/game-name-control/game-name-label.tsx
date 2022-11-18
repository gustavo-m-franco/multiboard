import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Icon } from '@rneui/themed';
import { ControlContainer } from '../control/control-container';

interface GameNameLabelProps {
  name: string;
  editGame: () => void;
}
export const GameNameLabel: React.FC<GameNameLabelProps> = ({
  name,
  editGame,
}) => (
  <ControlContainer>
    <View style={styles.editGameNameContainer}>
      <Text style={styles.savedGameName}>{name}</Text>
      <TouchableOpacity onPress={editGame}>
        <Icon name="edit" size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  </ControlContainer>
);

const styles = StyleSheet.create({
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

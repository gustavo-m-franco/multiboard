import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';

interface AddPlayerComponentProps {
  addPlayer: (name: string) => void;
  checkGameStatus: () => void;
  isValidPlayer: (name: string) => boolean;
  showPlayersInfoReading: boolean;
}

export const AddPlayerComponent: React.FC<AddPlayerComponentProps> = ({
  addPlayer,
  checkGameStatus,
  isValidPlayer,
  showPlayersInfoReading,
}) => {
  const [name, setName] = useState('');

  const onAddPlayer = () => {
    if (isValidPlayer(name)) {
      addPlayer(name);
      checkGameStatus();
    }
    setName('');
  };

  const onBlur = () => name && onAddPlayer();

  return (
    <View style={styles.addPlayerContainer}>
      {showPlayersInfoReading && (
        <Text style={styles.playersInfoReading}>
          Tap on a player to see his details.
        </Text>
      )}
      <View style={styles.addPlayerForm}>
        <TextInput
          style={styles.addPlayerInput}
          value={name}
          onChangeText={setName}
          onSubmitEditing={onAddPlayer}
          onBlur={onBlur}
          underlineColorAndroid="rgba(0,0,0,0)"
        />
        <TouchableOpacity style={styles.addPlayerButton} onPress={onAddPlayer}>
          <Text style={styles.addPlayerButtonText}>ADD PLAYER</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  addPlayerContainer: {
    backgroundColor: '#222',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingTop: 10,
    paddingBottom: 25,
  },
  addPlayerForm: {
    flexDirection: 'row',
    paddingBottom: 20,
  },
  addPlayerInput: {
    flex: 4,
    height: 40,
    backgroundColor: '#333',
    marginLeft: 10,
    marginRight: 5,
    marginTop: 20,
    padding: 10,
    borderRadius: 10,
    color: '#999',
    letterSpacing: 2,
  },
  addPlayerButton: {
    flex: 2,
    backgroundColor: '#333',
    flexDirection: 'column',
    marginLeft: 5,
    marginRight: 10,
    marginTop: 20,
    borderRadius: 10,
    paddingTop: 11,
    paddingLeft: 5,
    paddingRight: 5,
    alignContent: 'stretch',
    alignItems: 'stretch',
  },
  addPlayerButtonText: {
    textAlign: 'center',
    fontSize: 13,
    color: '#999',
    fontWeight: '900',
  },
  playersInfoReading: {
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 12,
    margin: 0,
    padding: 0,
    color: '#FFF',
  },
});

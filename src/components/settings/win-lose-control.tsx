import React from 'react';
import { Icon } from '@rneui/themed';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface WinLoseControlProps {
  maxScoreWins: boolean;
  showWinLoseOptions: () => void;
}

export const WinLoseControl: React.FC<WinLoseControlProps> = props => {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text onPress={props.showWinLoseOptions} style={styles.value}>
          {props.maxScoreWins ? 'WIN' : 'LOSE'}
        </Text>
        <TouchableOpacity
          style={styles.edit}
          onPress={props.showWinLoseOptions}>
          <Icon size={20} name="edit" color="#FFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 2,
    alignSelf: 'stretch',
    height: 54,
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: '#2b2b2b',
  },
  innerContainer: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'center',
    height: 54,
    alignItems: 'center',
    backgroundColor: '#2b2b2b',
  },
  value: {
    textAlign: 'center',
    fontWeight: '900',
    color: '#FFF',
  },
  edit: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
});

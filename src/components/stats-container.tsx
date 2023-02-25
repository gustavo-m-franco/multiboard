import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  getAmountOfPlayers,
  getTotalPoints,
} from '../screens/players/players-selector';
import { useSelector } from 'react-redux';
import { AppState } from '../get-store';

export const StatsContainer: React.FC<{}> = () => {
  const totalPoints = useSelector(getTotalPoints);
  const amountOfPlayers = useSelector(getAmountOfPlayers);
  const isMaxScoreWins = useSelector(
    (state: AppState) => state.game.isMaxScoreWins,
  );
  const maxScore = useSelector((state: AppState) => state.game.maxScore);
  return (
    <View style={styles.stats}>
      <Text style={styles.statsLabel}>
        PLAYERS: <Text style={styles.statsValue}>{amountOfPlayers}</Text>
      </Text>
      <Text style={styles.statsLabel}>
        TOTAL POINTS: <Text style={styles.statsValue}>{totalPoints}</Text>
      </Text>
      <Text style={[styles.statsLabel, styles.statsLabelWinLose]}>
        User that reaches {maxScore} POINTS {isMaxScoreWins ? 'WINS' : 'LOSES'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  stats: {
    flex: 4,
    alignSelf: 'stretch',
    paddingTop: 20,
  },
  statsLabel: {
    textAlign: 'center',
    color: '#666',
    fontSize: 13,
    letterSpacing: 2,
    fontWeight: 'normal',
    padding: 1,
    marginBottom: 10,
  },
  statsValue: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 13,
    letterSpacing: 2,
    fontWeight: 'normal',
    padding: 3,
    marginBottom: 3,
  },
  statsLabelWinLose: {
    marginTop: 15,
    fontWeight: '900',
    color: '#fff',
  },
});

import React, { useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {
  PlayerStatus,
  UpdatePlayerScore,
  UpdatePlayerStatus,
} from '../screens/players/players-types';
import { GameStatus } from '../screens/scoreboard/game-reducer';

interface CounterProps {
  score: number;
  status: PlayerStatus;
  playerName: string;
  maxScore: number;
  isMaxScoreWins: boolean;
  gameStatus: GameStatus;
  updatePlayerScore: (data: UpdatePlayerScore) => void;
  updatePlayerStatus: (data: UpdatePlayerStatus) => void;
  calculateGameStatus: () => void;
}

export const Counter: React.FC<CounterProps> = ({
  score,
  status,
  maxScore,
  isMaxScoreWins,
  playerName,
  gameStatus,
  updatePlayerScore,
  updatePlayerStatus,
  calculateGameStatus,
}) => {
  useEffect(() => {
    const hasPlayerWon = status === PlayerStatus.WON;
    const isGameEnded = gameStatus === GameStatus.ENDED;
    console.log(
      '(hasPlayerWon && !isGameEnded) || (!hasPlayerWon && isGameEnded):::',
      (hasPlayerWon && !isGameEnded) || (!hasPlayerWon && isGameEnded),
    );
    if (
      (hasPlayerWon && !isGameEnded) ||
      (!hasPlayerWon && isGameEnded) ||
      (!hasPlayerWon && !isMaxScoreWins)
    ) {
      calculateGameStatus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, calculateGameStatus]);

  const updateScoreMaxScoreWins = (delta: number) => {
    updatePlayerScore({ name: playerName, delta });
    let newStatus: PlayerStatus;
    const newScore = score + delta;
    // TODO state machine
    if (newScore >= maxScore) {
      newStatus = PlayerStatus.WON;
    } else if (newScore < maxScore && gameStatus === GameStatus.ENDED) {
      newStatus = PlayerStatus.LOST;
    } else {
      newStatus = PlayerStatus.PLAYING;
    }
    if (newStatus !== status) {
      updatePlayerStatus({
        name: playerName,
        status: newStatus,
        elapsedTime: 0,
      });
    }
  };

  const updateScoreMaxScoreLoses = (delta: number) => {
    updatePlayerScore({ name: playerName, delta });
    let newStatus: PlayerStatus;
    const newScore = score + delta;
    // TODO state machine
    if (newScore >= maxScore) {
      newStatus = PlayerStatus.LOST;
    } else if (newScore < maxScore && status !== PlayerStatus.WON) {
      newStatus = PlayerStatus.PLAYING;
    } else {
      // player was winning and still is
      newStatus = PlayerStatus.WON;
    }
    if (newStatus !== status) {
      updatePlayerStatus({
        name: playerName,
        status: newStatus,
        elapsedTime: 0,
      });
    }
  };

  return (
    <View style={styles.counter}>
      <TouchableOpacity
        style={styles.updateScoreMinus}
        onPress={
          isMaxScoreWins
            ? () => {
                updateScoreMaxScoreWins(-1);
              }
            : () => {
                updateScoreMaxScoreLoses(-1);
              }
        }>
        <Text style={styles.updateScoreIcon}>-</Text>
      </TouchableOpacity>
      <View style={styles.scoreValue}>
        <Text style={styles.scoreValueText}>{score}</Text>
      </View>
      <TouchableOpacity
        style={styles.updateScorePlus}
        onPress={
          isMaxScoreWins
            ? () => {
                updateScoreMaxScoreWins(1);
              }
            : () => {
                updateScoreMaxScoreLoses(1);
              }
        }>
        <Text style={styles.updateScoreIcon}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  counter: {
    flex: 3,
    flexDirection: 'row',
  },
  updateScoreMinus: {
    flex: 2,
    backgroundColor: '#dd2323',
    flexDirection: 'row',
    alignItems: 'center',
  },
  updateScorePlus: {
    flex: 2,
    backgroundColor: '#33bb33',
    flexDirection: 'row',
    alignItems: 'center',
  },
  updateScoreIcon: {
    flex: 1,
    textAlign: 'center',
    color: '#fff',
  },
  scoreValue: {
    flex: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  scoreValueText: {
    flex: 1,
    textAlign: 'center',
    color: '#ddd',
    fontWeight: '900',
    fontSize: 15,
  },
});

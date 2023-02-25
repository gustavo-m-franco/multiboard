import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Badge, Icon } from '@rneui/themed';
import { Counter } from '../counter';
import {
  PlayerStatus,
  UpdatePlayerScore,
  UpdatePlayerStatus,
} from '../../screens/players/players-types';
import { GameStatus } from '../../screens/scoreboard/game-reducer';

interface PlayerProps {
  name: string;
  score: number;
  status: PlayerStatus;
  maxScore: number;
  isMaxScoreWins: boolean;
  gameStatus: GameStatus;
  removePlayer: (id: string) => void;
  updatePlayerScore: (data: UpdatePlayerScore) => void;
  selectPlayer: (name: string) => void;
  updatePlayerStatus: (data: UpdatePlayerStatus) => void;
  calculateGameStatus: () => void;
  showDeleteWinnerMessage: () => void;
}

export const Player: React.FC<PlayerProps> = ({
  status,
  gameStatus,
  maxScore,
  name,
  score,
  isMaxScoreWins,
  selectPlayer,
  updatePlayerScore,
  removePlayer,
  calculateGameStatus,
  updatePlayerStatus,
  showDeleteWinnerMessage,
}) => {
  const onRemovePlayer = () => {
    if (status !== PlayerStatus.WON) {
      removePlayer(name);
    } else {
      showDeleteWinnerMessage();
    }
  };

  const trimName = (untrimmedName: string) => {
    if (untrimmedName.length > 15) {
      const shortName = `${untrimmedName.substring(0, 13)}...`;
      return shortName;
    }
    return untrimmedName;
  };

  const badge =
    status === PlayerStatus.WON ? (
      <Badge
        value="Winner"
        textStyle={styles.badge}
        containerStyle={styles.winnerBadgeBackground}
      />
    ) : status === PlayerStatus.LOST ? (
      <Badge
        value="Lost"
        textStyle={styles.badge}
        containerStyle={styles.looserBadgeBackground}
      />
    ) : undefined;
  return (
    <View style={styles.player}>
      <View style={styles.nameContainer}>
        <TouchableOpacity style={styles.removeButton} onPress={onRemovePlayer}>
          <Icon color="#dd2323" name="cancel" />
        </TouchableOpacity>
        <Text
          style={styles.name}
          onPress={() => {
            selectPlayer(name);
          }}>
          {trimName(name)}
        </Text>
        <View style={styles.playerWonLost}>{badge}</View>
      </View>
      <Counter
        score={score}
        status={status}
        playerName={name}
        maxScore={maxScore}
        isMaxScoreWins={isMaxScoreWins}
        gameStatus={gameStatus}
        updatePlayerStatus={updatePlayerStatus}
        updatePlayerScore={updatePlayerScore}
        calculateGameStatus={calculateGameStatus}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  player: {
    flexDirection: 'row',
    backgroundColor: '#2f2f2f',
    borderColor: '#444',
    borderBottomWidth: 2,
  },
  playerWonLost: {
    position: 'absolute',
    top: 8,
    right: 5,
  },
  nameContainer: {
    flex: 4,
    flexDirection: 'row',
  },
  removeButton: {
    zIndex: 100,
    paddingLeft: 10,
    paddingRight: 0,
    paddingTop: 17,
    paddingBottom: 18,
  },
  name: {
    flex: 1,
    textAlign: 'center',
    color: '#fff',
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 5,
    paddingRight: 5,
    marginLeft: -30,
    fontWeight: '900',
  },
  badge: { color: 'white', fontWeight: '900', fontSize: 10 },
  winnerBadgeBackground: { backgroundColor: '#7c7' },
  looserBadgeBackground: { backgroundColor: '#b66' },
});

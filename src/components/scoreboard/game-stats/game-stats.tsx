import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  sortPlayersMaxScoreLoses,
  sortPlayersMaxScoreWins,
} from '../../../utility/sort';
import { AnimatedButton } from '../../button/animated-button';
import PositionsTable from './positions-table';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../../get-store';
import {
  gameActions,
  GameStatus,
} from '../../../screens/scoreboard/game-reducer';

export const GameStats: React.FC<{}> = () => {
  const players = useSelector((state: AppState) => state.players.players);
  const game = useSelector((state: AppState) => state.game);
  const dispatch = useDispatch();
  // TODO useMemo
  const updateDisplayStats = (display: boolean) =>
    dispatch(gameActions.updateDisplayStats(display));
  const { isMaxScoreWins, timed, gameStatus } = game;
  const isGameFinished = gameStatus === GameStatus.ENDED;
  const sortedPlayers = isMaxScoreWins
    ? sortPlayersMaxScoreWins(players)
    : sortPlayersMaxScoreLoses(players);
  const gameFinishedTitleComponent = () => {
    if (isGameFinished) {
      return (
        <View>
          <Text style={styles.titleName}>{sortedPlayers[0].name}</Text>
          <Text style={styles.titleWin}>WON!!!</Text>
        </View>
      );
    }
  };

  return (
    <View style={styles.overlayContainer}>
      <View style={styles.overlay} />
      <View style={styles.container}>
        {gameFinishedTitleComponent()}
        <Text style={styles.subTitle}>Scores</Text>
        <PositionsTable
          players={sortedPlayers}
          showTime={isGameFinished && timed}
          maxScoreWins={isMaxScoreWins}
        />
        <AnimatedButton
          onPress={() => {
            updateDisplayStats(false);
          }}
          text="Continue"
          width={120}
          delay={700}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlayContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    zIndex: 10,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: '#666',
    opacity: 0.3,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  container: {
    position: 'absolute',
    top: 100,
    zIndex: 10,
    width: 300,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#222',
    borderColor: '#444',
    borderWidth: 3,
    borderRadius: 15,
    paddingBottom: 30,
  },
  titleName: {
    textAlign: 'center',
    color: '#fff',
    paddingTop: 15,
    paddingBottom: 0,
    paddingLeft: 5,
    paddingRight: 5,
    fontWeight: '900',
    fontSize: 20,
  },
  titleWin: {
    textAlign: 'center',
    color: '#fff',
    paddingTop: 10,
    paddingBottom: 0,
    paddingLeft: 5,
    paddingRight: 5,
    fontWeight: '900',
    fontSize: 30,
  },
  subTitle: {
    textAlign: 'center',
    color: '#fff',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 5,
    paddingRight: 5,
    fontWeight: '600',
    fontSize: 15,
    textDecorationLine: 'underline',
  },
});

import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, Screens } from '../navigation/navigation-types';
import {
  Players,
  PlayerStatus,
  UpdatePlayerScore,
  UpdatePlayerStatus,
} from '../players/players-types';
import { useDispatch, useSelector } from 'react-redux';
import { getSelectedPlayerName } from '../players/players-selector';
import { AppState } from '../../get-store';
import { playersActions } from '../players/players-reducer';
import { gameActions, GameStatus } from './game-reducer';
import { ScoreboardComponent } from '../../components/scoreboard/scoreboard-component';

type ScoreboardScreenProps = NativeStackScreenProps<
  RootStackParamList,
  Screens.Scoreboard
>;

const getAmountOfPlayersWhoFinished = (
  isMaxScoreWins: boolean,
  players: Players,
) => {
  let finished = 0;
  console.log('Players:::::', players);
  for (const playerName in players) {
    if (
      (isMaxScoreWins && players[playerName].status === PlayerStatus.WON) ||
      (!isMaxScoreWins && players[playerName].status === PlayerStatus.LOST)
    ) {
      console.log('PlayerName:', playerName);
      finished++;
    }
  }
  return finished;
};

export const Scoreboard: React.FC<ScoreboardScreenProps> = ({ navigation }) => {
  const players = useSelector((state: AppState) => state.players.players);
  const selectedPlayerName = useSelector(getSelectedPlayerName);
  const game = useSelector((state: AppState) => state.game);
  const running = useSelector((state: AppState) => state.stopwatch.running);
  const dispatch = useDispatch();

  const finishGame = () => {
    game.gameStatus !== GameStatus.ENDED &&
      dispatch(gameActions.updateGameStatus(GameStatus.ENDED));
    modifyAllPlayerStatuses(
      game.isMaxScoreWins ? PlayerStatus.LOST : PlayerStatus.WON,
      PlayerStatus.PLAYING,
    );
  };

  const setGameOnCourse = () => {
    game.gameStatus === GameStatus.ENDED &&
      dispatch(gameActions.updateGameStatus(GameStatus.IN_COURSE));
    game.isMaxScoreWins
      ? modifyAllPlayerStatuses(PlayerStatus.PLAYING)
      : modifyAllPlayerStatuses(PlayerStatus.PLAYING, PlayerStatus.WON);
  };

  const modifyAllPlayerStatuses = (
    toStatus: PlayerStatus,
    fromStatus?: PlayerStatus,
  ) => {
    for (const playerName in players) {
      const player = players[playerName];
      if (player.status === fromStatus || !fromStatus) {
        dispatch(
          playersActions.updatePlayerStatus({
            status: toStatus,
            name: playerName,
          }),
        );
      }
    }
  };

  const calculateGameStatus = () => {
    const { isMaxScoreWins } = game;
    const amountOfPlayersWhoFinished = getAmountOfPlayersWhoFinished(
      isMaxScoreWins,
      players,
    );
    const playersAmount = Object.keys(players).length;
    const isGameEnded = isMaxScoreWins
      ? amountOfPlayersWhoFinished > 0
      : amountOfPlayersWhoFinished >= playersAmount - 1 && playersAmount > 1;
    console.log('isGameEnded::::', isGameEnded);
    console.log('amountOfPlayersWhoFinished::::', amountOfPlayersWhoFinished);
    console.log('playersAmount - 1::::', playersAmount - 1);
    if (isGameEnded) {
      finishGame();
    } else {
      setGameOnCourse();
    }
  };
  const updatePlayerScore = (data: UpdatePlayerScore) =>
    dispatch(playersActions.updatePlayerScore(data));
  const updatePlayerStatus = (data: UpdatePlayerStatus) =>
    dispatch(playersActions.updatePlayerStatus(data));
  const removePlayer = (name: string) =>
    dispatch(playersActions.removePlayer(name));
  const addPlayer = (name: string) => dispatch(playersActions.addPlayer(name));
  const selectPlayer = (name?: string) =>
    dispatch(playersActions.selectPlayer(name));
  const updateDisplayStats = (display: boolean) =>
    dispatch(gameActions.updateDisplayStats(display));
  const updateGameStatus = (status: GameStatus) =>
    dispatch(gameActions.updateGameStatus(status));
  // TODO const calculateGameStatus = () => dispatch()
  return (
    <ScoreboardComponent
      updatePlayerStatus={updatePlayerStatus}
      updatePlayerScore={updatePlayerScore}
      removePlayer={removePlayer}
      calculateGameStatus={calculateGameStatus}
      gameStatus={game.gameStatus}
      players={players}
      maxScore={game.maxScore}
      isMaxScoreWins={game.isMaxScoreWins}
      timed={game.timed}
      time={game.time}
      selectPlayer={selectPlayer}
      selectedPlayerName={selectedPlayerName}
      updateGameStatus={updateGameStatus}
      addPlayer={addPlayer}
      navigation={navigation}
      updateDisplayStats={updateDisplayStats}
      displayStats={game.displayStats}
      running={running}
    />
  );
};

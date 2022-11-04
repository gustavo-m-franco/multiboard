import { connect, MapStateToProps } from 'react-redux';
import { AppState } from '../../get-store';
import { mainMenuActions } from '../main-menu/main-menu-reducer';
import { GameSettings } from './game-settings';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, Screens } from '../navigation';
import { gameActions } from '../game/game-reducer';

type NewGameScreenProps = NativeStackScreenProps<
  RootStackParamList,
  Screens.NewGame
>;

interface NewGameReduxToProps {
  maxScore: number;
  isMaxScoreWins: boolean;
  players: {};
  timed: boolean;
  time: string;
}

// TODO selectors
const mapStateToProps: MapStateToProps<
  NewGameReduxToProps,
  NewGameScreenProps,
  AppState
> = (state, ownProps) => ({
  maxScore: state.mainMenu.maxScore,
  isMaxScoreWins: state.mainMenu.isMaxScoreWins,
  players: {},
  timed: state.mainMenu.timed,
  time: state.mainMenu.time,
  ...ownProps,
});

const { startNewGame } = gameActions;

const {
  updateGameWinOrLose,
  updateGameMaxScore,
  updateTimedGame,
  updateGameTimeLimit,
} = mainMenuActions;

interface MapDispatchToProps {
  updateGameWinOrLose: typeof updateGameWinOrLose;
  updateGameMaxScore: typeof updateGameMaxScore;
  startNewGame: typeof startNewGame;
  updateTimedGame: typeof updateTimedGame;
  updateGameTimeLimit: typeof updateGameTimeLimit;
}

const mapDispatchToProps: MapDispatchToProps = {
  updateGameWinOrLose,
  updateGameMaxScore,
  startNewGame,
  updateTimedGame,
  updateGameTimeLimit,
};

export const NewGameScreen = connect<
  NewGameReduxToProps,
  MapDispatchToProps,
  NewGameScreenProps,
  AppState
>(
  mapStateToProps,
  mapDispatchToProps,
)(GameSettings);

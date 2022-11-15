import { connect, MapStateToProps } from 'react-redux';
import { AppState } from '../../get-store';
import { GameSettings } from '../../components/game-settings';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, Screens } from '../navigation';
import { gameActions } from '../game/game-reducer';

type NewGameScreenProps = NativeStackScreenProps<
  RootStackParamList,
  Screens.NewGame
>;

const mapStateToProps: MapStateToProps<{}, NewGameScreenProps, AppState> = (
  state,
  ownProps,
) => ({
  ...ownProps,
});

const { startNewGame } = gameActions;

interface MapDispatchToProps {
  startNewGame: typeof startNewGame;
}

const mapDispatchToProps: MapDispatchToProps = {
  startNewGame,
};

export const NewGameScreen = connect<
  {},
  MapDispatchToProps,
  NewGameScreenProps,
  AppState
>(
  mapStateToProps,
  mapDispatchToProps,
)(GameSettings);

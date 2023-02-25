import { connect, MapStateToProps } from 'react-redux';
import { AppState } from '../../get-store';
import { GameSettingsForm } from '../../components/game-settings-form';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  gameActions,
  GameState,
  initialState,
} from '../scoreboard/game-reducer';
import { RootStackParamList, Screens } from '../navigation/navigation-types';

type NewGameScreenProps = NativeStackScreenProps<
  RootStackParamList,
  Screens.NewGame
>;

interface DefaultValuesProps {
  defaultValues: GameState;
}

const mapStateToProps: MapStateToProps<
  DefaultValuesProps,
  NewGameScreenProps,
  AppState
> = (state, ownProps) => ({
  ...ownProps,
  defaultValues: initialState,
});

const { startNewGame } = gameActions;

interface MapDispatchToProps {
  save: typeof startNewGame;
}

const mapDispatchToProps: MapDispatchToProps = {
  save: startNewGame,
};

export const NewGameScreen = connect(
  mapStateToProps,
  mapDispatchToProps,
)(GameSettingsForm);

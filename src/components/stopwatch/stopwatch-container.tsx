import { connect, MapStateToProps } from 'react-redux';
import { Stopwatch } from './stopwatch';
import { AppState } from '../../get-store';
import { stopwatchActions } from '../../screens/stopwatch/stopwatch-reducer';
import { GameStatus } from '../../screens/game/game-reducer';

interface StopwatchReduxProps {
  gameStatus: GameStatus;
  time: string;
  running: boolean;
  elapsedTime: number;
}

const mapStateToProps: MapStateToProps<
  StopwatchReduxProps,
  {},
  AppState
> = state => {
  return {
    gameStatus: state.game.gameStatus,
    time: state.stopwatch.time,
    running: state.stopwatch.running,
    elapsedTime: state.stopwatch.elapsedTime,
  };
};

const { updateElapsedTime, updateTimeRunning } = stopwatchActions;

interface MapDispatchToProps {
  updateElapsedTime: typeof updateElapsedTime;
  updateTimeRunning: typeof updateTimeRunning;
}

const mapDispatchToProps: MapDispatchToProps = {
  updateElapsedTime,
  updateTimeRunning,
};

export const StopwatchContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Stopwatch);

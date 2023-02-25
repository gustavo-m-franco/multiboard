import { connect, MapStateToProps } from 'react-redux';
import { Stopwatch } from './stopwatch';
import { AppState } from '../../../get-store';
import { stopwatchActions } from '../../../screens/stopwatch/stopwatch-reducer';
import { GameStatus } from '../../../screens/scoreboard/game-reducer';

// TODO simplify with hooks
interface StopwatchReduxProps {
  gameStatus: GameStatus;
  time: string;
  running: boolean;
  elapsedTime: number;
}

interface StopwatchOwnProps {
  myRef: (ref: Stopwatch) => void;
  showTimerAlert: () => void;
  scheduleNotification: () => void;
}

const mapStateToProps: MapStateToProps<
  StopwatchReduxProps,
  StopwatchOwnProps,
  AppState
> = (state, ownProps) => ({
  gameStatus: state.game.gameStatus,
  time: state.stopwatch.time,
  running: state.stopwatch.running,
  elapsedTime: state.stopwatch.elapsedTime,
  ...ownProps,
});

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

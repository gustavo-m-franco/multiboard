import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Players } from '../../screens/players/players-types';
import { StopwatchContainer } from './stopwatch/stopwatch-container';
import { StatsContainer } from '../stats-container';
import { Stopwatch } from './stopwatch/stopwatch';

export interface HeaderProps {
  players: Players;
  maxScore: number;
  isMaxScoreWins: boolean;
  timed: boolean;
  myRef: (header: Header) => void;
  showTimerAlert: () => void;
  scheduleNotification: () => void;
}

// TODO forward ref https://stackoverflow.com/questions/37949981/call-child-method-from-parent
export class Header extends React.PureComponent<HeaderProps> {
  stopwatch?: Stopwatch;
  componentDidMount(): void {
    this.props.myRef(this);
  }

  render(): React.ReactNode {
    return (
      <View style={styles.header}>
        <StatsContainer />
        {this.props.timed && (
          <StopwatchContainer
            myRef={(stopwatch) => {
              this.stopwatch = stopwatch;
            }}
            showTimerAlert={this.props.showTimerAlert}
            scheduleNotification={this.props.scheduleNotification}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    backgroundColor: '#222',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#444',
  },
});

import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Player, PlayerStatus } from '../../../screens/players/players-types';
import { formatTime } from '../../../utility/format';
import { GrowToScrollView } from '../../animation/grow-to-scroll-view';

interface PositionsTablePros {
  players: Player[];
  showTime: boolean;
  maxScoreWins: boolean;
}

const PositionsTable: React.FC<PositionsTablePros> = (props) => {
  // TODO fix {isNaN(Number(elapsedTime)) ? '---' : formatTime(Number(elapsedTime))}
  const timeColumnMaxScoreWins = (player: Player) => {
    let elapsedTime;
    if (props.showTime) {
      if (player.status === PlayerStatus.WON) {
        elapsedTime = player.elapsedTime?.toString();
      } else {
        elapsedTime = '---';
      }
      return (
        <Text style={[styles.col3, styles.label]}>
          {isNaN(Number(elapsedTime))
            ? elapsedTime
            : formatTime(Number(elapsedTime))}
        </Text>
      );
    }
  };

  // TODO fix {isNaN(Number(elapsedTime)) ? '---' : formatTime(Number(elapsedTime))}
  const timeColumnMaxScoreLoses = (
    player: Player,
    lastElapsedTime?: number,
  ) => {
    let elapsedTime;
    if (props.showTime) {
      if (player.status === PlayerStatus.LOST) {
        elapsedTime = player.elapsedTime
          ? player.elapsedTime.toString()
          : '---';
      } else {
        elapsedTime = lastElapsedTime;
      }
      return (
        <Text style={[styles.col3, styles.label]}>
          {isNaN(Number(elapsedTime)) ? '---' : formatTime(Number(elapsedTime))}
        </Text>
      );
    }
  };

  const playersListComponent = props.players.map((player, index) => (
    <View key={index} style={styles.detail}>
      <Text style={[styles.col1, styles.label]}>{index + 1}</Text>
      <Text style={[styles.col2, styles.label]}>{player.name}</Text>
      <Text style={[styles.col3, styles.label]}>{player.score}</Text>
      {props.maxScoreWins
        ? timeColumnMaxScoreWins(player)
        : timeColumnMaxScoreLoses(player, props.players[1].elapsedTime)}
    </View>
  ));

  return (
    <GrowToScrollView delay={0} style={styles.animatedContainerStyle}>
      <View style={styles.positionsTable}>
        <View style={styles.detail}>
          <Text style={[styles.col1, styles.titleLabel]}>Rank</Text>
          <Text style={[styles.col2, styles.titleLabel]}>Name</Text>
          <Text style={[styles.col3, styles.titleLabel]}>Score</Text>
          {props.showTime ? (
            <Text style={[styles.col3, styles.titleLabel]}>Time</Text>
          ) : undefined}
        </View>
        <ScrollView>{playersListComponent}</ScrollView>
      </View>
    </GrowToScrollView>
  );
};

const styles = StyleSheet.create({
  positionsTable: {
    alignSelf: 'stretch',
    paddingTop: 10,
    paddingBottom: 15,
    flexDirection: 'column',
  },
  animatedContainerStyle: {
    alignSelf: 'stretch',
    paddingTop: 0,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 30,
    marginBottom: 0,
    alignContent: 'center',
    flexDirection: 'column',
  },
  detail: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    color: '#fff',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 5,
    paddingRight: 5,
    fontWeight: '600',
    fontSize: 12,
  },
  titleLabel: {
    color: '#fff',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 5,
    paddingRight: 5,
    fontWeight: '900',
    fontSize: 12,
  },
  col1: {
    textAlign: 'center',
    flex: 1,
  },
  col2: {
    textAlign: 'center',
    flex: 2,
  },
  col3: {
    textAlign: 'center',
    flex: 1,
  },
});

export default PositionsTable;

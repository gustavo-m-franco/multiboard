import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { formatDate } from './../../utility/format';
import { Detail } from './Detail';
import { GrowToScrollView } from '../animation/grow-to-scroll-view';
import { AnimatedButton } from '../button/animated-button';
import { Player } from '../../screens/players/players-types';

interface PlayerInfoProps {
  player: Player;
  selectPlayer: (id?: string) => void;
  rank?: number;
}

export const PlayerInfo: React.FC<PlayerInfoProps> = ({
  player,
  selectPlayer,
  rank,
}) => (
  <View style={styles.overlayContainer}>
    <View style={styles.overlay} />
    <View style={styles.playerInfo}>
      <GrowToScrollView delay={0} style={styles.animatedContainerStyle}>
        <Text style={styles.name}>{player.name}</Text>
        <Detail label="Score:" value={player.score.toString()} />
        <Detail label="Rank:" value={rank?.toString() ?? 'Unranked'} />
        <Detail label="Status:" value={player.status} />
        <Detail label="Created:" value={formatDate(player.created)} />
        <Detail label="Updated:" value={formatDate(player.updated)} />
        <View style={styles.closeButton}>
          <AnimatedButton
            onPress={() => {
              selectPlayer(undefined);
            }}
            text="Close"
            width={80}
            delay={500}
          />
        </View>
      </GrowToScrollView>
    </View>
  </View>
);

const styles = StyleSheet.create({
  animatedContainerStyle: {
    alignSelf: 'stretch',
    paddingTop: 10,
    paddingBottom: 30,
    paddingLeft: 20,
    paddingRight: 30,
    alignContent: 'center',
    flexDirection: 'column',
  },
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
  playerInfo: {
    position: 'absolute',
    top: 160,
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
    paddingBottom: 10,
  },
  name: {
    flex: 1,
    textAlign: 'center',
    color: '#fff',
    paddingTop: 30,
    paddingBottom: 20,
    paddingLeft: 5,
    paddingRight: 5,
    fontWeight: '900',
    fontSize: 20,
  },
  closeButton: {
    marginTop: 30,
  },
});

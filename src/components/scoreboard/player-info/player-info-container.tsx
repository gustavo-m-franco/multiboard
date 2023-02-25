import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../../get-store';
import { PlayerInfo } from './player-info';
import { View } from 'react-native';
import { Player } from '../../../screens/players/players-types';
import {
  getSelectedPlayer,
  getSelectedPlayerRank,
} from '../../../screens/players/players-selector';
import { playersActions } from '../../../screens/players/players-reducer';

export const PlayerInfoContainer: React.FC<{}> = () => {
  const selectedPlayer = useSelector<AppState, Player | undefined>(
    getSelectedPlayer,
  );
  const selectedPlayerRank = useSelector<AppState, number | undefined>(
    getSelectedPlayerRank,
  );
  const dispatch = useDispatch();
  const selectPlayer = (id: string | undefined) =>
    dispatch(playersActions.selectPlayer(id));
  return selectedPlayer ? (
    <PlayerInfo
      player={selectedPlayer}
      selectPlayer={selectPlayer}
      rank={selectedPlayerRank}
    />
  ) : (
    <View />
  );
};

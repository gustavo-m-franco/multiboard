import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, Screens } from '../navigation/navigation-types';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../get-store';
import { PlayerInfo } from '../../components/player-info/player-info';
import {
  getSelectedPlayer,
  getSelectedPlayerRank,
} from '../players/players-selector';
import { Player } from '../players/players-types';
import { View } from 'react-native';
import { playersActions } from '../players/players-reducer';

type ScoreboardScreenProps = NativeStackScreenProps<
  RootStackParamList,
  Screens.Scoreboard
>;

export const Scoreboard: React.FC<ScoreboardScreenProps> = () => {
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

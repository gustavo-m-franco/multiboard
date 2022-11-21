import { createSelector } from '@reduxjs/toolkit';
import { AppState } from '../../get-store';
import { Player, Players } from './players-types';
import {
  sortPlayersMaxScoreLoses,
  sortPlayersMaxScoreWins,
} from '../../utility/sort';

export const getSelectedPlayer: (state: AppState) => Player | undefined =
  createSelector(
    (state: AppState): string | undefined => state.players.selectedPlayerId,
    (state: AppState): Players => state.players.players,
    (selectedPlayerId, players): Player | undefined =>
      selectedPlayerId ? players[selectedPlayerId] : undefined,
  );

export const getSelectedPlayerRank: (state: AppState) => number | undefined =
  createSelector(
    getSelectedPlayer,
    (state: AppState): Players => state.players.players,
    (state: AppState): boolean => state.game.isMaxScoreWins,
    (selectedPlayer, players, isMaxScoreWins) => {
      if (!selectedPlayer) {
        return;
      }
      const sortedPlayers = isMaxScoreWins
        ? sortPlayersMaxScoreWins(players)
        : sortPlayersMaxScoreLoses(players);
      let rank: number | undefined;
      sortedPlayers.forEach((player, index) => {
        if (sortedPlayers[index].name === selectedPlayer.name) {
          rank = index + 1;
        }
      });
      return rank;
    },
  );

import { createSelector } from '@reduxjs/toolkit';
import { AppState } from '../../get-store';
import { Player, Players } from './players-types';
import {
  sortPlayersMaxScoreLoses,
  sortPlayersMaxScoreWins,
} from '../../utility/sort';

export const getSelectedPlayerName = createSelector(
  (state: AppState): string | undefined => state.players.selectedPlayerName,
  (selectedPlayerName) => selectedPlayerName,
);

export const getSelectedPlayer: (state: AppState) => Player | undefined =
  createSelector(
    getSelectedPlayerName,
    (state: AppState): Players => state.players.players,
    (selectedPlayerName, players): Player | undefined =>
      selectedPlayerName ? players[selectedPlayerName] : undefined,
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

export const getTotalPoints = createSelector(
  (state: AppState) => {
    const playersArray = Object.values(state.players.players);
    let total = 0;
    for (const player of playersArray) {
      total += player.score;
    }
    return total;
  },
  (totalPoints) => totalPoints,
);

export const getAmountOfPlayers = createSelector(
  (state: AppState) => Object.values(state.players.players).length,
  (amountOfPlayers) => amountOfPlayers,
);

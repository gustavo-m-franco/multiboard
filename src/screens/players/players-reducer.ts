import { createSlice } from '@reduxjs/toolkit';
import uuid from 'react-native-uuid';
import { gameActions } from '../game/game-reducer';
import {
  PlayersCaseReducers,
  PlayersState,
  PlayerStatus,
} from './players-types';
import { playersStub } from './players-mock';

export const initialState: PlayersState = {
  selectedPlayerId: '3c92ce94-1663-46b4-a418-49d5a89e9ae5',
  edited: false,
  players: playersStub,
};

const playersSlice = createSlice<PlayersState, PlayersCaseReducers>({
  name: 'game',
  initialState,
  reducers: {
    addPlayer: (state, { payload: name }) => ({
      ...state,
      edited: true,
      players: {
        ...state.players,
        [uuid.v4() as string]: {
          id: uuid.v4() as string,
          name: name.trim().toUpperCase(),
          score: 0,
          status: PlayerStatus.PLAYING,
          created: Date.now(),
        },
      },
    }),
    removePlayer: (state, { payload: id }) => {
      const { [id]: removedPlayer, ...players } = state.players;
      return {
        ...state,
        edited: true,
        players,
      };
    },
    selectPlayer: (state, { payload: selectedPlayerId }) => ({
      ...state,
      edited: true,
      selectedPlayerId,
    }),
    updatePlayerScore: (state, { payload: { id, delta } }) => {
      state.players[id] = {
        ...state.players[id],
        updated: Date.now(),
        score: state.players[id].score + delta,
      };
    },
    updatePlayerStatus: (state, { payload: { id, status, elapsedTime } }) => ({
      ...state,
      edited: true,
      players: {
        ...state.players,
        [id]: {
          ...state.players[id],
          elapsedTime,
          status,
          finished: status !== PlayerStatus.PLAYING ? Date.now() : undefined,
        },
      },
    }),
    updatePlayerElapsedTime: (state, { payload: { id, elapsedTime } }) => {
      state.players[id] = {
        ...state.players[id],
        elapsedTime,
      };
    },
  },
  extraReducers: builder => {
    builder.addCase(
      gameActions.loadGame,
      (state, { payload: { players } }) => players,
    );
  },
});
export const playersReducer = playersSlice.reducer;
export const playersActions = playersSlice.actions;

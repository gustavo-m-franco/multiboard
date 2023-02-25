import { createSlice } from '@reduxjs/toolkit';
import { gameActions } from '../scoreboard/game-reducer';
import {
  PlayersState,
  PlayerStatus,
  UpdatePlayerScore,
  UpdatePlayerStatus,
} from './players-types';
import { PayloadAction } from '@reduxjs/toolkit/src/createAction';

export const initialState: PlayersState = {
  edited: false,
  players: {},
};

const playersSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    addPlayer: (state, { payload: name }: PayloadAction<string>) => ({
      ...state,
      edited: true,
      players: {
        ...state.players,
        [name]: {
          name: name.trim(),
          score: 0,
          status: PlayerStatus.PLAYING,
          created: Date.now(),
        },
      },
    }),
    removePlayer: (state, { payload: id }: PayloadAction<string>) => {
      const { [id]: removedPlayer, ...players } = state.players;
      return {
        ...state,
        edited: true,
        players,
      };
    },
    selectPlayer: (
      state,
      { payload: selectedPlayerId }: PayloadAction<string | undefined>,
    ) => ({
      ...state,
      edited: true,
      selectedPlayerName: selectedPlayerId,
    }),
    updatePlayerScore: (
      state,
      { payload: { name, delta } }: PayloadAction<UpdatePlayerScore>,
    ) => {
      state.players[name] = {
        ...state.players[name],
        updated: Date.now(),
        score: state.players[name].score + delta,
      };
    },
    updatePlayerStatus: (
      state,
      {
        payload: { name, status, elapsedTime },
      }: PayloadAction<UpdatePlayerStatus>,
    ) => ({
      ...state,
      edited: true,
      players: {
        ...state.players,
        [name]: {
          ...state.players[name],
          elapsedTime,
          status,
          finished: status !== PlayerStatus.PLAYING ? Date.now() : undefined,
        },
      },
    }),
    updatePlayerElapsedTime: (
      state,
      {
        payload: { id, elapsedTime },
      }: PayloadAction<{ id: string; elapsedTime: number }>,
    ) => {
      state.players[id] = {
        ...state.players[id],
        elapsedTime,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      gameActions.loadGame,
      (state, { payload: { players } }) => players,
    );
  },
});
export const playersReducer = playersSlice.reducer;
export const playersActions = playersSlice.actions;

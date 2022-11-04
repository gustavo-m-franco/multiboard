import { SliceCaseReducers } from '@reduxjs/toolkit/src/createSlice';
import { CaseReducer } from '@reduxjs/toolkit/src/createReducer';
import { PayloadAction } from '@reduxjs/toolkit/src/createAction';
import { createSlice } from '@reduxjs/toolkit';
import uuid from 'react-native-uuid';
import { gameActions } from '../game/game-reducer';

export enum PlayerStatus {
  PLAYING = 'PLAYING',
  WON = 'WON',
  LOST = 'LOST',
}

export interface Player {
  id: string;
  name: string;
  score: number;
  status: PlayerStatus;
  created?: number;
  updated?: number;
  finished?: number;
  elapsedTime?: number;
}

export interface PlayersState {
  selectedPlayerId?: string;
  edited: boolean;
  players: { [key: string]: Player };
}

export const initialState: PlayersState = {
  selectedPlayerId: undefined,
  edited: false,
  players: {},
};

interface PlayersCaseReducers extends SliceCaseReducers<PlayersState> {
  addPlayer: CaseReducer<PlayersState, PayloadAction<string>>;
  removePlayer: CaseReducer<PlayersState, PayloadAction<string>>;
  selectPlayer: CaseReducer<PlayersState, PayloadAction<string>>;
  updatePlayerScore: CaseReducer<
    PlayersState,
    PayloadAction<{ id: string; delta: number }>
  >;
  updatePlayerStatus: CaseReducer<
    PlayersState,
    PayloadAction<{ id: string; status: PlayerStatus; elapsedTime: number }>
  >;
  updatePlayerElapsedTime: CaseReducer<
    PlayersState,
    PayloadAction<{ id: string; elapsedTime: number }>
  >;
}

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

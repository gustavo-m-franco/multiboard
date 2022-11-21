import { SliceCaseReducers } from '@reduxjs/toolkit/src/createSlice';
import { CaseReducer } from '@reduxjs/toolkit/src/createReducer';
import { PayloadAction } from '@reduxjs/toolkit/src/createAction';

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

export interface Players {
  [key: string]: Player;
}

export interface PlayersState {
  selectedPlayerId?: string;
  edited: boolean;
  players: Players;
}

export interface PlayersCaseReducers extends SliceCaseReducers<PlayersState> {
  addPlayer: CaseReducer<PlayersState, PayloadAction<string>>;
  removePlayer: CaseReducer<PlayersState, PayloadAction<string>>;
  selectPlayer: CaseReducer<PlayersState, PayloadAction<string | undefined>>;
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

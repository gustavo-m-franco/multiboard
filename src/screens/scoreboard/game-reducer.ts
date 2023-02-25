import { PayloadAction } from '@reduxjs/toolkit/src/createAction';
import { createSlice } from '@reduxjs/toolkit';
import { StopwatchState } from '../stopwatch/stopwatch-reducer';
import { PlayersState } from '../players/players-types';

export enum GameStatus {
  ENDED = 'ENDED',
  IN_COURSE = 'IN_COURSE',
  STOPPED = 'STOPPED',
  LOADING = 'LOADING',
}

export interface GameState {
  id: string;
  selectedPlayer?: number;
  isMaxScoreWins: boolean;
  maxScore: number;
  displayStats?: boolean;
  gameStatus: GameStatus;
  gameName: string;
  edited?: boolean;
  lastSaved?: number;
  timed: boolean;
  time: string;
}

export const initialState: GameState = {
  id: '',
  isMaxScoreWins: true,
  maxScore: 10,
  gameStatus: GameStatus.IN_COURSE,
  gameName: '',
  timed: false,
  time: '01:00',
};

// TODO remove unused actions
// TODO remove generics
const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    updateWinOrLose: (
      state,
      { payload: isMaxScoreWins }: PayloadAction<boolean>,
    ) => ({
      ...state,
      edited: true,
      isMaxScoreWins,
    }),
    updateMaxScore: (state, { payload: maxScore }: PayloadAction<number>) => ({
      ...state,
      edited: true,
      maxScore,
    }),
    updateDisplayStats: (
      state,
      { payload: displayStats }: PayloadAction<boolean>,
    ) => ({
      ...state,
      edited: true,
      displayStats,
    }),
    updateGameStatus: (
      state,
      { payload: gameStatus }: PayloadAction<GameStatus>,
    ) => ({
      ...state,
      edited: true,
      gameStatus,
    }),
    updateTimedGame: (state, { payload: timed }: PayloadAction<boolean>) => ({
      ...state,
      edited: true,
      timed,
    }),
    startNewGame: (state, { payload }: PayloadAction<GameState>) => ({
      ...initialState,
      ...payload,
    }),
    saveProgress: (state, { payload: gameName }: PayloadAction<string>) => ({
      ...state,
      edited: false,
      lastSaved: Date.now(),
      gameName,
    }),
    loadGame: (
      state,
      {
        payload: { game },
      }: PayloadAction<{
        game: GameState;
        players: PlayersState;
        stopwatch: StopwatchState;
      }>,
    ) => game,
  },
});

export const gameReducer = gameSlice.reducer;

export const gameActions = gameSlice.actions;

import { SliceCaseReducers } from '@reduxjs/toolkit/src/createSlice';
import { CaseReducer } from '@reduxjs/toolkit/src/createReducer';
import { PayloadAction } from '@reduxjs/toolkit/src/createAction';
import { createSlice } from '@reduxjs/toolkit';
import uuid from 'react-native-uuid';
import { PlayersState } from '../players/players-reducer';
import { StopwatchState } from '../stopwatch/stopwatch-reducer';

enum GameStatus {
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
  maxScore: 0,
  gameStatus: GameStatus.IN_COURSE,
  gameName: '',
  timed: false,
  time: '01:00',
};

export interface StartNewGamePayload extends GameState {
  gameName: string;
  isMaxScoreWins: boolean;
  maxScore: number;
  timed: boolean;
  time: string;
}

interface GameCaseReducers extends SliceCaseReducers<GameState> {
  updateWinOrLose: CaseReducer<GameState, PayloadAction<boolean>>;
  updateMaxScore: CaseReducer<GameState, PayloadAction<number>>;
  updateDisplayStats: CaseReducer<GameState, PayloadAction<boolean>>;
  updateGameStatus: CaseReducer<GameState, PayloadAction<GameStatus>>;
  updateTimedGame: CaseReducer<GameState, PayloadAction<boolean>>;
  startNewGame: CaseReducer<GameState, PayloadAction<StartNewGamePayload>>;
  saveProgress: CaseReducer<GameState, PayloadAction<string>>;
  loadGame: CaseReducer<
    GameState,
    PayloadAction<{
      game: GameState;
      players: PlayersState;
      stopwatch: StopwatchState;
    }>
  >;
}

const gameSlice = createSlice<GameState, GameCaseReducers>({
  name: 'game',
  initialState,
  reducers: {
    updateWinOrLose: (state, { payload: isMaxScoreWins }) => ({
      ...state,
      edited: true,
      isMaxScoreWins,
    }),
    updateMaxScore: (state, { payload: maxScore }) => ({
      ...state,
      edited: true,
      maxScore,
    }),
    updateDisplayStats: (state, { payload: displayStats }) => ({
      ...state,
      edited: true,
      displayStats,
    }),
    updateGameStatus: (state, { payload: gameStatus }) => ({
      ...state,
      edited: true,
      gameStatus,
    }),
    updateTimedGame: (state, { payload: timed }) => ({
      ...state,
      edited: true,
      timed,
    }),
    startNewGame: (
      state,
      { payload: { gameName, isMaxScoreWins, maxScore, timed } },
    ) => ({
      ...initialState,
      id: uuid.v4() as string,
      gameName,
      isMaxScoreWins,
      maxScore,
      timed,
    }),
    saveProgress: (state, { payload: gameName }) => ({
      ...state,
      edited: false,
      lastSaved: Date.now(),
      gameName,
    }),
    loadGame: (state, { payload: { game } }) => game,
  },
});

export const gameReducer = gameSlice.reducer;

export const gameActions = gameSlice.actions;

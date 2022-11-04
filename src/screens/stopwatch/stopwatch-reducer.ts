import { SliceCaseReducers } from '@reduxjs/toolkit/src/createSlice';
import { CaseReducer } from '@reduxjs/toolkit/src/createReducer';
import { PayloadAction } from '@reduxjs/toolkit/src/createAction';
import { createSlice } from '@reduxjs/toolkit';
import { gameActions } from '../game/game-reducer';

export interface StopwatchState {
  edited: boolean;
  time: string;
  running: boolean;
  elapsedTime: number;
}

const initialState: StopwatchState = {
  edited: false,
  time: '01:00',
  running: false,
  elapsedTime: 0,
};

interface StopwatchCaseReducers extends SliceCaseReducers<StopwatchState> {
  updateTimeLimit: CaseReducer<StopwatchState, PayloadAction<string>>;
  updateElapsedTime: CaseReducer<StopwatchState, PayloadAction<number>>;
  updateTimeRunning: CaseReducer<StopwatchState, PayloadAction<boolean>>;
}

const stopwatchSlice = createSlice<StopwatchState, StopwatchCaseReducers>({
  name: 'stopwatch',
  initialState,
  reducers: {
    updateTimeLimit: (state, { payload: time }) => ({
      ...state,
      edited: true,
      time,
    }),
    updateElapsedTime: (state, { payload: elapsedTime }) => ({
      ...state,
      edited: true,
      elapsedTime,
    }),
    updateTimeRunning: (state, { payload: running }) => ({
      ...state,
      edited: true,
      running,
    }),
  },
  extraReducers: builder => {
    builder.addCase(gameActions.saveProgress, state => ({
      ...state,
      edited: false,
    }));
    builder.addCase(
      gameActions.loadGame,
      (state, { payload: { stopwatch } }) => stopwatch,
    );
  },
});

export const stopwatchReducer = stopwatchSlice.reducer;

export const stopwatchActions = stopwatchSlice.actions;

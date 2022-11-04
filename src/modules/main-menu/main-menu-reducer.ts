import { createSlice } from '@reduxjs/toolkit';
import { SliceCaseReducers } from '@reduxjs/toolkit/src/createSlice';
import { CaseReducer } from '@reduxjs/toolkit/src/createReducer';
import { PayloadAction } from '@reduxjs/toolkit/src/createAction';
import { gameActions, GameState } from '../game/game-reducer';
import { PlayersState } from '../players/players-reducer';
import { StopwatchState } from '../stopwatch/stopwatch-reducer';

interface SavedGame {
  gameSettings: GameState;
  players: PlayersState;
  stopwatch: StopwatchState;
}

export interface SavedGames {
  [key: string]: SavedGame;
}

export interface MainMenuState {
  isMaxScoreWins: boolean;
  maxScore: number;
  activeGame?: string;
  savedGames: SavedGames;
  timed: boolean;
  time: string;
  edited: boolean;
}

const initialState: MainMenuState = {
  isMaxScoreWins: true,
  maxScore: 10,
  activeGame: undefined,
  savedGames: {},
  timed: false,
  time: '01:00',
  edited: false,
};

interface MainMenuCaseReducers extends SliceCaseReducers<MainMenuState> {
  updateGameWinOrLose: CaseReducer<MainMenuState, PayloadAction<boolean>>;
  updateGameMaxScore: CaseReducer<MainMenuState, PayloadAction<number>>;
  saveGame: CaseReducer<MainMenuState, PayloadAction<SavedGame>>;
  updateSavedGame: CaseReducer<MainMenuState, PayloadAction<SavedGame>>;
  removeGame: CaseReducer<MainMenuState, PayloadAction<string>>;
  updateTimedGame: CaseReducer<MainMenuState, PayloadAction<boolean>>;
  updateGameTimeLimit: CaseReducer<MainMenuState, PayloadAction<string>>;
}

const mainMenuSlice = createSlice<MainMenuState, MainMenuCaseReducers>({
  name: 'mainMenu',
  initialState,
  reducers: {
    updateGameWinOrLose: (state, { payload: isMaxScoreWins }) => ({
      ...state,
      isMaxScoreWins,
    }),
    updateGameMaxScore: (state, { payload: maxScore }) => ({
      ...state,
      maxScore,
    }),
    saveGame: (state, { payload: savedGame }) =>
      savedGame.gameSettings.id
        ? {
            ...state,
            activeGame: savedGame.gameSettings.id,
            savedGames: {
              ...state.savedGames,
              [savedGame.gameSettings.id]: savedGame,
            },
          }
        : state,
    updateSavedGame: (state, { payload: savedGame }) =>
      savedGame.gameSettings.id
        ? {
            ...state,
            savedGames: {
              ...state.savedGames,
              [savedGame.gameSettings.id]: savedGame,
            },
          }
        : state,
    removeGame: (state, { payload: id }) => {
      const { [id]: removedGame, ...savedGames } = state.savedGames;
      return {
        ...state,
        savedGames,
      };
    },
    updateTimedGame: (state, { payload: timed }) => ({
      ...state,
      timed,
    }),
    updateGameTimeLimit: (state, { payload: time }) => ({
      ...state,
      time,
    }),
  },
  extraReducers: builder => {
    builder.addCase(gameActions.loadGame, (state, { payload: { game } }) => ({
      ...state,
      activeGame: game.id,
    }));
  },
});
export const mainMenuReducer = mainMenuSlice.reducer;
export const mainMenuActions = mainMenuSlice.actions;

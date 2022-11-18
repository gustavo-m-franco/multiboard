import { createSlice } from '@reduxjs/toolkit';
import { SliceCaseReducers } from '@reduxjs/toolkit/src/createSlice';
import { CaseReducer } from '@reduxjs/toolkit/src/createReducer';
import { PayloadAction } from '@reduxjs/toolkit/src/createAction';
import { gameActions, GameState } from '../game/game-reducer';
import { PlayersState } from '../players/players-reducer';
import { StopwatchState } from '../stopwatch/stopwatch-reducer';
import uuid from 'react-native-uuid';

interface SavedGame {
  gameSettings: GameState;
  players?: PlayersState;
  stopwatch?: StopwatchState;
}

export interface SavedGames {
  [key: string]: SavedGame;
}

export interface GamesState {
  edited?: boolean;
  activeGame?: string;
  savedGames: SavedGames;
}

const initialState: GamesState = {
  activeGame: undefined,
  savedGames: {},
};

interface GamesCaseReducers extends SliceCaseReducers<GamesState> {
  startNewGame: CaseReducer<GamesState, PayloadAction<GameState>>;
  saveGame: CaseReducer<GamesState, PayloadAction<SavedGame>>;
  updateSavedGame: CaseReducer<GamesState, PayloadAction<SavedGame>>;
  removeGame: CaseReducer<GamesState, PayloadAction<string>>;
}

const gamesSlice = createSlice<GamesState, GamesCaseReducers>({
  name: 'games',
  initialState,
  reducers: {
    startNewGame: (state, { payload: gameSettings }) => ({
      ...state,
      savedGames: {
        ...state.savedGames,
        [uuid.v4() as string]: {
          gameSettings,
        },
      },
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
  },
  extraReducers: builder => {
    builder.addCase(gameActions.loadGame, (state, { payload: { game } }) => ({
      ...state,
      activeGame: game.id,
    }));
  },
});
export const gamesReducer = gamesSlice.reducer;
export const gamesActions = gamesSlice.actions;

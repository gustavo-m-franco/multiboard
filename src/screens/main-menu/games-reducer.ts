import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit/src/createAction';
import { GameState } from '../game/game-reducer';
import { StopwatchState } from '../stopwatch/stopwatch-reducer';
import uuid from 'react-native-uuid';
import { PlayersState } from '../players/players-types';

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

// TODO saveGame and updateSavedGame are the same?
const gamesSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {
    startNewGame: (
      state: GamesState,
      { payload: gameSettings }: PayloadAction<GameState>,
    ) => ({
      ...state,
      savedGames: {
        ...state.savedGames,
        [uuid.v4() as string]: {
          gameSettings,
        },
      },
    }),
    saveGame: (
      state: GamesState,
      { payload: savedGame }: PayloadAction<SavedGame>,
    ) =>
      state.activeGame
        ? {
            ...state,
            savedGames: {
              ...state.savedGames,
              [state.activeGame]: savedGame,
            },
          }
        : state,
    removeGame: (state: GamesState, { payload: id }: PayloadAction<string>) => {
      const { [id]: removedGame, ...savedGames } = state.savedGames;
      return {
        ...state,
        savedGames,
      };
    },
    selectGame: (
      state: GamesState,
      { payload: id }: PayloadAction<string>,
    ) => ({
      ...state,
      activeGame: id,
    }),
  },
});
export const gamesReducer = gamesSlice.reducer;
export const gamesActions = gamesSlice.actions;

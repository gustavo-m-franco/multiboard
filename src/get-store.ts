import flipper from 'redux-flipper';
import { configureStore, combineReducers, Middleware } from '@reduxjs/toolkit';
import {
  gamesReducer as games,
  GamesState,
} from './screens/main-menu/games-reducer';
import { gameReducer as game, GameState } from './screens/game/game-reducer';
import { playersReducer as players } from './screens/players/players-reducer';
import {
  stopwatchReducer as stopwatch,
  StopwatchState,
} from './screens/stopwatch/stopwatch-reducer';
import { PlayersState } from './screens/players/players-types';
// import { persistStore, persistReducer, } from 'redux-persist'
// import storage from 'redux-persist/lib/storage'
// import { composeWithDevTools, } from 'redux-devtools-extension';
// import { composeWithDevTools, } from 'remote-redux-devtools';
// import createSagaMiddleware from 'redux-saga';
// import { createReduxBoundAddListener, createReactNavigationReduxMiddleware, } from 'react-navigation-redux-helpers';
// import { updatePlayersStatusSaga, updateGameStatusSaga, saveGameSaga, } from './sagas';
// import { game, games, players, stopwatch,} from './reducers';
// import nav from './reducers/nav';
// import screenTracking from './utility/gaTracking';

// const sagaMiddleware = createSagaMiddleware();

// const reactNavigationMiddleware = createReactNavigationReduxMiddleware(
//   "root",
//   state => state.nav,
// );
// this needs to be called after crteateReactNavigationReduxMiddleware in order to work
// export const addListener = createReduxBoundAddListener("root");
//
// let enhancer
const middleware: Middleware[] = [];
if (__DEV__) {
  middleware.push(flipper());
}
// else {
//   enhancer = compose(
//     applyMiddleware(
//       sagaMiddleware,
//       //reactNavigationMiddleware,
//       screenTracking,
//     ),
//   );
// }

export interface AppState {
  games: GamesState;
  game: GameState;
  players: PlayersState;
  stopwatch: StopwatchState;
}
const reducer = combineReducers<AppState>({
  games,
  game,
  players,
  stopwatch,
});

// const persistConfig = {
//   key: 'root',
//   storage,
// }
//
// const persistedReducer = persistReducer(persistConfig, combinedReducer)

export const store = configureStore({ reducer, devTools: true, middleware });

// export const persistor = persistStore(store)

// sagaMiddleware.run(updatePlayersStatusSaga);
// sagaMiddleware.run(updateGameStatusSaga);
// sagaMiddleware.run(saveGameSaga);

import { AppState } from '../../get-store';
import { GamesState } from './games-reducer';

export const mainMenuSelector = (state: AppState): GamesState => state.games;

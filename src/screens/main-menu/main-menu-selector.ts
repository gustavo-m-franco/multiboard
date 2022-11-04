import { AppState } from '../../get-store';
import { MainMenuState } from './main-menu-reducer';

export const mainMenuSelector = (state: AppState): MainMenuState =>
  state.mainMenu;

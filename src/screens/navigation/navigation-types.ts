import { ParamListBase } from '@react-navigation/native';

export enum Screens {
  MainMenu = 'MainMenu',
  NewGame = 'NewGame',
}

export interface RootStackParamList extends ParamListBase {
  MainMenu: undefined;
  NewGame: undefined;
}

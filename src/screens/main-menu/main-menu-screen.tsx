import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, Screens } from '../navigation';
import { MainMenu } from './main-menu';
import { useSelector } from 'react-redux';
import { MainMenuState } from './main-menu-reducer';
import { AppState } from '../../get-store';
import { mainMenuSelector } from './main-menu-selector';
// TODO
// import {
//   NewGameSettings,
//   Scoreboard,
//   SavedGames,
// } from './../../utility/constants';

type MainMenuScreenProps = NativeStackScreenProps<
  RootStackParamList,
  Screens.MainMenu
>;

export const MainMenuScreen: React.FC<MainMenuScreenProps> = props => {
  const { edited, savedGames, activeGame, isMaxScoreWins, maxScore } =
    useSelector<AppState>(mainMenuSelector) as MainMenuState;
  const { navigation } = props;
  return (
    <MainMenu
      edited={edited}
      savedGames={savedGames}
      activeGame={activeGame}
      maxScoreWins={isMaxScoreWins}
      maxScore={maxScore}
      navigation={navigation}
    />
  );
};

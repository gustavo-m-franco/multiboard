import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, Screens } from '../navigation/navigation-types';
import { MainMenu } from './main-menu';
import { useSelector } from 'react-redux';
import { GamesState } from './games-reducer';
import { AppState } from '../../get-store';
import { mainMenuSelector } from './main-menu-selector';

type MainMenuScreenProps = NativeStackScreenProps<
  RootStackParamList,
  Screens.MainMenu
>;

export const MainMenuScreen: React.FC<MainMenuScreenProps> = (props) => {
  const { edited, savedGames, activeGame } = useSelector<AppState>(
    mainMenuSelector,
  ) as GamesState;
  const { navigation } = props;
  return (
    <MainMenu
      edited={edited}
      savedGames={savedGames}
      activeGame={activeGame}
      navigation={navigation}
    />
  );
};

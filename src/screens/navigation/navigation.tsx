import React from 'react';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { MainMenuScreen } from '../main-menu/main-menu-screen';
import { NewGameScreen } from '../new-game/new-game-screen';
import { useFlipper } from '@react-navigation/devtools';
import { RootStackParamList, Screens } from './navigation-types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigation: React.FC = () => {
  const navigationRef = useNavigationContainerRef();

  useFlipper(navigationRef);
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName={Screens.MainMenu}
        screenOptions={{ headerShown: false }}>
        <Stack.Screen name={Screens.MainMenu} component={MainMenuScreen} />
        <Stack.Screen name={Screens.NewGame} component={NewGameScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;

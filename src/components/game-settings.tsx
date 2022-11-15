import React, { useState } from 'react';
import { StyleSheet, View, ImageBackground } from 'react-native';
// @ts-expect-error
// TODO
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { useForm, Controller } from 'react-hook-form';

import { TimeLimitSettings } from './settings/time-limit-settings';
import {
  GameState,
  initialState,
  StartNewGamePayload,
} from '../screens/game/game-reducer';
import { NativeStackNavigationProp } from '@react-navigation/native-stack/lib/typescript/src/types';
import type { RouteProp } from '@react-navigation/native';
import { RootStackParamList, Screens } from '../screens/navigation';
import { BringFromBottom } from './animation/bring-from-bottom';
import { WinLoseSetting } from './settings/win-lose-seeting';
import { MaxScoreSetting } from './settings/max-score-setting';
import { TimeSetting } from './settings/time-setting';
import { Alert } from '../screens/alert';
import { GameNameControl } from './settings/game-name-control';
import { FooterSaveGame } from './settings/footer-saved-name';

const NAME_MAX_LENGTH = 10;

interface GamesSettingsProps {
  route: RouteProp<RootStackParamList>;
  navigation: NativeStackNavigationProp<RootStackParamList>;
  currentGameDetails?: GameState;
  saveProgress?: (gameData: StartNewGamePayload) => void;
  startNewGame?: (newGameDetails: StartNewGamePayload) => void;
}

export const GameSettings: React.FC<GamesSettingsProps> = ({
  route,
  currentGameDetails,
  startNewGame,
  saveProgress,
  navigation,
}) => {
  // TODO use alert or remove it
  const [messageText, setMessageText] = useState<string | undefined>(undefined);
  // TODO
  // useEffect(() => {
  //   if (timed && route.name !== Screens.NewGame) {
  //     setMessageText(
  //       'Any change to top score or win or lose settings in a timed game will cause all progress to be reset.',
  //     );
  //   }
  // }, []);

  // static navigationOptions = ({ navigation, }) => {
  //   return {
  //     headerTitle: navigation.state.routeName === NewGameSettings?
  //       <NavigationHeader
  //         title="New Game"
  //         />:
  //       <NavigationHeader
  //         title="Settings"
  //         />,
  //     headerStyle: {
  //       backgroundColor: '#0000',
  //       height: 85,
  //       borderBottomWidth: 0,
  //       alignSelf: 'center',
  //     },
  //     headerTintColor: '#0000',
  //     headerTransparent: true,
  //     headerLeft: <Icon name={'chevron-left'} color='#fff' size={45} onPress={ () => { if (navigation.state.routeName === NewGameSettings) navigation.goBack(); else navigation.navigate(Scoreboard);} }  />,
  // };
  // };

  const isNewGame = route.name === Screens.NewGame;
  const defaultValues: GameState = isNewGame
    ? initialState
    : currentGameDetails ?? initialState;

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<StartNewGamePayload>({
    defaultValues,
  });

  const watchTimed = watch('timed');
  const watchIsMaxScoreWins = watch('isMaxScoreWins');
  const onSubmit = (data: StartNewGamePayload) => {
    isNewGame ? startNewGame?.(data) : saveProgress?.(data);
  };

  const onHideMessage = () => {
    setMessageText(undefined);
  };

  // TODO Add error rules to max score
  return (
    <ImageBackground
      resizeMode="cover"
      style={styles.container}
      source={require('../assets/images/falling_dices_final.png')}>
      <BringFromBottom style={styles.animationContainer}>
        <KeyboardAwareScrollView
          behavior="position"
          enabled={true}
          style={styles.settingsScrollviewContainer}>
          <View style={styles.settingsContainer}>
            <View style={styles.header} />
            <View>
              <Controller
                name="gameName"
                control={control}
                rules={{
                  required: { value: true, message: 'You must provide a name' },
                  maxLength: {
                    value: 10,
                    message: `The name must be less than ${NAME_MAX_LENGTH} characters`,
                  },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <GameNameControl
                    onChange={onChange}
                    onBlur={onBlur}
                    gameName={value}
                    error={errors.gameName}
                  />
                )}
              />
              <Controller
                name="isMaxScoreWins"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <WinLoseSetting
                    description="Top score:"
                    isMaxScoreWins={value}
                    onChange={onChange}
                  />
                )}
              />
              <Controller
                name="maxScore"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <MaxScoreSetting
                    description={`Top score to ${
                      watchIsMaxScoreWins ? 'win:' : 'lose:'
                    }`}
                    maxScore={value}
                    onChange={onChange}
                  />
                )}
              />
              <Controller
                name="timed"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TimeSetting
                    description={'Timed game:'}
                    timed={value}
                    onChange={onChange}
                  />
                )}
              />

              {watchTimed && (
                <Controller
                  name="time"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <TimeLimitSettings
                      description="Counter time (mm:ss):"
                      time={value}
                      onChange={onChange}
                      error={errors.time}
                    />
                  )}
                />
              )}
            </View>
            <FooterSaveGame
              navigation={navigation}
              isNewGame={true}
              onSubmit={handleSubmit(onSubmit)}
            />
          </View>
        </KeyboardAwareScrollView>
      </BringFromBottom>
      <Alert
        show={Boolean(messageText)}
        showProgress={false}
        message={messageText ?? ''}
        showCancelButton={false}
        showConfirmButton={true}
        confirmText="Ok"
        onConfirmPressed={onHideMessage}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 0,
  },
  animationContainer: {
    flex: 1,
    marginBottom: 100,
  },
  settingsScrollviewContainer: {
    alignSelf: 'stretch',
    marginLeft: 15,
    marginRight: 15,
  },
  settingsContainer: {
    backgroundColor: '#444',
    borderRadius: 25,
  },
  header: {
    flexDirection: 'column',
    backgroundColor: '#222',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#444',
    padding: 20,
  },
});

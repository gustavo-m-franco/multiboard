import React from 'react';
import { StyleSheet, View, ImageBackground } from 'react-native';
// @ts-expect-error
// TODO
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';

import { TimeLimitSettings } from '../../components/settings/time-limit-settings';
import { StartNewGamePayload } from '../game/game-reducer';
import { Player } from '../players/players-reducer';
import { NativeStackNavigationProp } from '@react-navigation/native-stack/lib/typescript/src/types';
import { RootStackParamList, Screens } from '../navigation';
import { BringFromBottom } from '../../components/animation/bring-from-bottom';
import { WinLoseSetting } from '../../components/settings/win-lose-seeting';
import { MaxScoreSetting } from '../../components/settings/max-score-setting';
import { TimeSetting } from '../../components/settings/time-setting';
import { FooterNewGame } from '../../components/settings/footer-new-game';
import { FooterSaveGame } from '../../components/settings/footer-saved-name';
import { Alert } from '../alert';
import { TimeLimitOptions } from '../../components/settings/time-limit-options';

interface GamesSettingsProps {
  navigation: NativeStackNavigationProp<RootStackParamList>;
  players: { [key: string]: Player };
  gameName?: string;
  saved?: boolean;
  edited?: boolean;
  timed: boolean;
  time: string;
  maxScore: number;
  isMaxScoreWins: boolean;
  updateGameWinOrLose: (isMaXScoreWins: boolean) => void;
  updateGameMaxScore: (maxScore: number) => void;
  saveProgress?: (gameName: string) => void;
  startNewGame: (newGameDetails: StartNewGamePayload) => void;
  updateTimedGame: (timed: boolean) => void;
  updateGameTimeLimit: (time: string) => void;
}

interface GameSettingsState {
  showEmptyNameMessage: boolean;
  showWrongTimeMessage: boolean;
  showWinLoseOptions: boolean;
  showTimedGameSettingsMessage: boolean;
  messageText: string;
  showMessage: boolean;
}

export class GameSettings extends React.Component<
  GamesSettingsProps,
  GameSettingsState
> {
  constructor(props: GamesSettingsProps) {
    super(props);
    this.state = {
      showEmptyNameMessage: false,
      showWrongTimeMessage: false,
      showWinLoseOptions: false,
      showTimedGameSettingsMessage: false,
      messageText: '',
      showMessage: false,
    };
  }

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

  componentDidMount(): void {
    if (
      this.props.timed &&
      this.props.navigation.getState().key !== Screens.NewGame
    ) {
      this.showTimedGameSettingsMessage();
    }
  }

  showEmptyNameMessage = () => {
    this.setState({
      showMessage: true,
      messageText: 'The name cannot be empty or longer than 30 characters.',
    });
  };

  showWrongTimeMessage = () => {
    this.setState({
      showMessage: true,
      messageText: 'You´ve enter a wrong time. (ei. 01:70 should be 02:10)',
    });
  };

  showTimedGameSettingsMessage = () => {
    this.setState({
      showMessage: true,
      messageText:
        'Any change to top score or win or lose settings in a timed game will cause all progress to be reset.',
    });
  };

  hideMessage = () => {
    this.setState({
      showMessage: false,
    });
  };

  showWinLoseOptions = () => {
    this.setState({
      ...this.state,
      showWinLoseOptions: true,
    });
  };

  hideWinLoseOptions = () => {
    this.setState({
      ...this.state,
      showWinLoseOptions: false,
    });
  };

  timeLimitInput = () => {
    const { timed, time, updateGameTimeLimit } = this.props;
    if (timed) {
      return (
        <TimeLimitSettings
          description="Time alert at (mm:ss)"
          timed={timed}
          time={time}
          updateTimeLimit={updateGameTimeLimit}
          showWrongTimeMessage={this.showWrongTimeMessage}
        />
      );
    }
  };

  render(): React.ReactNode {
    return (
      <ImageBackground
        resizeMode="cover"
        style={styles.container}
        source={require('./../../assets/images/falling_dices_final.png')}>
        <BringFromBottom style={animationContainer}>
          <KeyboardAwareScrollView
            behavior="position"
            enabled={true}
            style={styles.settingsScrollviewContainer}>
            <View style={styles.settingsContainer}>
              <View style={styles.header} />
              <View>
                <WinLoseSetting
                  description="Top score to:"
                  isMaxScoreWins={this.props.isMaxScoreWins}
                  showWinLoseOptions={this.showWinLoseOptions}
                />
                <MaxScoreSetting
                  description={
                    'Top score (to ' +
                    (this.props.isMaxScoreWins ? 'win)' : 'lose)')
                  }
                  maxScore={this.props.maxScore}
                  updateMaxScore={this.props.updateGameMaxScore}
                />
                <TimeSetting
                  description={'Timed game'}
                  timed={this.props.timed}
                  updateTimedGame={this.props.updateTimedGame}
                />
                {this.timeLimitInput()}
              </View>
              {this.props.navigation.getState().key === Screens.NewGame ? (
                <FooterNewGame
                  navigation={this.props.navigation}
                  maxScore={this.props.maxScore}
                  isMaxScoreWins={this.props.isMaxScoreWins}
                  timed={this.props.timed}
                  time={this.props.time}
                  startNewGame={this.props.startNewGame}
                />
              ) : (
                <FooterSaveGame
                  edited={this.props.edited}
                  gameName={this.props.gameName}
                  saved={this.props.saved}
                  navigation={this.props.navigation}
                  saveProgress={this.props.saveProgress}
                  showEmptyNameMessage={this.showEmptyNameMessage}
                />
              )}
            </View>
          </KeyboardAwareScrollView>
        </BringFromBottom>
        <Alert
          show={this.state.showMessage}
          showProgress={false}
          message={this.state.messageText}
          showCancelButton={false}
          showConfirmButton={true}
          confirmText="Ok"
          onConfirmPressed={() => {
            this.hideMessage();
          }}
        />
        {this.state.showWinLoseOptions ? (
          <TimeLimitOptions
            hideWinLoseOptions={this.hideWinLoseOptions}
            updateWinOrLose={this.props.updateGameWinOrLose}
          />
        ) : undefined}
      </ImageBackground>
    );
  }
}

const animationContainer = {
  flex: 1,
  marginBottom: 100,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 0,
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

import React from 'react';
import {
  Platform,
  StyleSheet,
  View,
  ImageBackground,
  AppState,
  Vibration,
  NativeEventSubscription,
} from 'react-native';
// TODO push notifications
// import PushNotification from 'react-native-push-notification';
// TODO KeyboardAware???
// @ts-expect-error
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { Alert } from '../alert/alert';

import { sortPlayersByName } from './../../utility/sort';
// import { PushController } from './../PushController';
import {
  Players,
  PlayerStatus,
  UpdatePlayerScore,
  UpdatePlayerStatus,
} from '../../screens/players/players-types';
import { GameStatus } from '../../screens/scoreboard/game-reducer';
import { NativeStackNavigationProp } from '@react-navigation/native-stack/lib/typescript/src/types';
import { RootStackParamList } from '../../screens/navigation/navigation-types';
import { Header } from './header';
import { Player } from './player';
import { GameStats } from './game-stats/game-stats';
import CustomAlert from '../alert/custom-alert';
import { BringFromBottom } from '../animation/bring-from-bottom';
import { PlayerInfoContainer } from './player-info/player-info-container';
import { AddPlayerComponent } from './add-player-component';

interface ScoreboardProps {
  players: Players;
  updatePlayerScore: (data: UpdatePlayerScore) => void;
  updatePlayerStatus: (data: UpdatePlayerStatus) => void;
  removePlayer: (name: string) => void;
  addPlayer: (name: string) => void;
  selectPlayer: (name?: string) => void;
  updateDisplayStats: (display: boolean) => void;
  updateGameStatus: (status: GameStatus) => void;
  calculateGameStatus: () => void;
  navigation: NativeStackNavigationProp<RootStackParamList>;
  maxScore: number;
  isMaxScoreWins: boolean;
  gameStatus: GameStatus;
  selectedPlayerName?: string;
  displayStats?: boolean;
  timed: boolean;
  running: boolean;
  time: string;
}

interface ScoreboardState {
  showTimerAlert: boolean;
  background: boolean;
  appState: string;
  messageText?: string;
}

export class ScoreboardComponent extends React.PureComponent<
  ScoreboardProps,
  ScoreboardState
> {
  // TODO Navigation
  // static navigationOptions = ({ navigation }) => {
  //   const params = navigation.state.params || {};
  //   return {
  //     headerLeft: <LeftHeader title="Bridge game" />,
  //     headerRight: <RightHeader navigation={navigation} />,
  //     headerStyle: {
  //       backgroundColor: '#00000000',
  //       height: 85,
  //       borderBottomWidth: 0,
  //     },
  //     headerTintColor: '#fff',
  //     headerTransparent: true,
  //   };
  // };
  private subscription?: NativeEventSubscription;
  private header?: Header;
  constructor(props: ScoreboardProps) {
    super(props);
    this.handleAppStateChange = this.handleAppStateChange.bind(this);
    this.state = {
      showTimerAlert: false,
      background: false,
      appState: 'active',
      messageText: undefined,
    };
  }

  componentDidMount(): void {
    this.subscription = AppState.addEventListener(
      'change',
      this.handleAppStateChange,
    );
  }

  componentWillUnmount(): void {
    this.subscription?.remove();
  }

  handleAppStateChange = (appState: string) => {
    if (appState === 'inactive') {
      if (!this.state.background && this.props.timed && this.props.running) {
        // TODO push notifications
        // PushNotification.localNotification({
        //   ticker: 'The timer is running in background',
        //   message:
        //     Platform.OS === 'ios'
        //       ? 'The timer is running in background. You will be notified when the time is out.'
        //       : 'You will be notified when the time is out.',
        //   vibration: 300,
        //   playSound: true,
        //   title: 'The timer is running in background',
        //   color: '#666',
        // });
      }
    }
    if (appState === 'background') {
      this.setState({ background: true });
      if (this.props.timed && this.props.running) {
        // TODO push notifications
        // PushNotification.localNotification({
        //   ticker: 'The timer is running in background',
        //   message:
        //     Platform.OS === 'ios'
        //       ? 'The timer is running in background. You will be notified when the time is out.'
        //       : 'You will be notified when the time is out.',
        //   vibration: 300,
        //   playSound: true,
        //   title: 'The timer is running in background',
        // });
      }
    }
    if (appState === 'active') {
      this.setState({ background: false });
    }
  };

  scheduleNotification = () => {
    // const delay = 1000;
    // const currentTime = this.header.stopwatch.getTime();
    // const limitTime = formatMilliseconds(this.props.time);
    // const difference = limitTime - currentTime;
    // if (difference > 1000) {
    //   // TODO push notificaitons
    //   // PushNotification.localNotificationSchedule({
    //   //   ticker: 'Time is out!!!',
    //   //   message:
    //   //     Platform.OS === 'ios'
    //   //       ? 'Time is out!!! Check your scores.'
    //   //       : 'Check your scores.',
    //   //   date: new Date(Date.now() + (limitTime - currentTime + delay)),
    //   //   vibration: 300,
    //   //   playSound: true,
    //   //   title: 'Time is out!!!',
    //   //   color: '#666',
    //   // });
    // }
  };

  // TODO add player form
  isValidPlayer = (name: string) => {
    let playerExists = false;
    if (name && name.length < 31) {
      for (const player of Object.values(this.props.players)) {
        if (player.name.trim().toUpperCase() === name.trim().toUpperCase()) {
          playerExists = true;
        }
      }
      if (!playerExists) {
        return true;
      }
    }
    if (name.length > 30) {
      this.showWrongNameMessage(
        'Player names cannot be longer than 30 characters.',
      );
    } else if (!name) {
      this.showWrongNameMessage('Player names cannot be blank.');
    } else if (playerExists) {
      this.showWrongNameMessage('Player names cannot be repeated.');
    }
    return false;
  };

  updatePlayerStatus = (data: UpdatePlayerStatus) => {
    const { status, name } = data;
    if (
      this.props.timed &&
      (status === PlayerStatus.WON || status === PlayerStatus.LOST)
    ) {
      const elapsedTime = this.header?.stopwatch?.getTime();
      elapsedTime &&
        this.props.updatePlayerStatus({ name, status, elapsedTime });
    } else {
      this.props.updatePlayerStatus({ name, status, elapsedTime: 0 });
    }
  };

  getPlayers = () => {
    const playersComponent = sortPlayersByName(this.props.players).map(
      (player) => (
        <View key={player.name}>
          <Player
            name={player.name}
            score={player.score}
            status={player.status}
            maxScore={this.props.maxScore}
            isMaxScoreWins={this.props.isMaxScoreWins}
            gameStatus={this.props.gameStatus}
            removePlayer={this.props.removePlayer}
            updatePlayerScore={this.props.updatePlayerScore}
            updatePlayerStatus={this.updatePlayerStatus}
            selectPlayer={this.props.selectPlayer}
            calculateGameStatus={this.props.calculateGameStatus}
            showDeleteWinnerMessage={this.showDeleteWinnerMessage}
          />
        </View>
      ),
    );
    return playersComponent;
  };

  showDeleteWinnerMessage = () => {
    this.setState({
      messageText: 'You cannot delete the winner.',
    });
  };

  showWrongNameMessage = (messageText: string) => {
    this.setState({ messageText });
  };

  hideMessage = () => {
    this.setState({ messageText: undefined });
  };

  showTimerAlert = () => {
    this.setState(
      {
        showTimerAlert: true,
      },
      () => {
        if (this.playersLength() > 0) {
          this.props.updateDisplayStats(false);
        }
        if (!this.state.background) {
          const androidPattern = [200, 200, 800];
          const iosPattern = [
            300, 300, 100, 100, 100, 100, 300, 300, 100, 100, 100, 100,
          ];
          if (Platform.OS === 'ios') Vibration.vibrate(iosPattern);
          else Vibration.vibrate(androidPattern);
        } else {
          // TODO
          // PushNotification.cancelAllLocalNotifications();
        }
      },
    );
  };

  hideTimerAlert = () => {
    this.setState({
      showTimerAlert: false,
    });
  };

  playersLength = () => Object.keys(this.props.players).length;

  render(): React.ReactNode {
    return (
      <ImageBackground
        style={styles.container}
        resizeMode="cover"
        source={require('./../../assets/images/back_nice.png')}>
        <PlayerInfoContainer />
        {this.props.displayStats && <GameStats />}
        <BringFromBottom style={scoreboardContainer}>
          <KeyboardAwareScrollView>
            <Header
              players={this.props.players}
              maxScore={this.props.maxScore}
              isMaxScoreWins={this.props.isMaxScoreWins}
              timed={this.props.timed}
              showTimerAlert={this.showTimerAlert}
              scheduleNotification={this.scheduleNotification}
              myRef={(header) => {
                this.header = header;
              }}
            />
            <View>{this.getPlayers()}</View>
            <AddPlayerComponent
              addPlayer={this.props.addPlayer}
              checkGameStatus={this.props.calculateGameStatus}
              isValidPlayer={this.isValidPlayer}
              showPlayersInfoReading={this.playersLength() > 0}
            />
          </KeyboardAwareScrollView>
        </BringFromBottom>
        <Alert
          show={Boolean(this.state.messageText)}
          showProgress={false}
          message={this.state.messageText ?? ''}
          showCancelButton={false}
          showConfirmButton={true}
          confirmText="Ok"
          onConfirmPressed={this.hideMessage}
        />
        {this.state.showTimerAlert && (
          <CustomAlert
            title="Time is out!!!"
            message="Check the scores to find out your ranks."
            confirmText="Ok"
            onConfirmPressed={() => {
              this.hideTimerAlert();
              if (this.playersLength() > 0) {
                this.props.updateDisplayStats(true);
              }
            }}
          />
        )}
        {/* // TODO push notifications */}
        {/* {this.props.timed && <PushController />} */}
      </ImageBackground>
    );
  }
}

const scoreboardContainer = {
  flex: 1,
  marginBottom: 100,
  marginTop: -20,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
  },
});

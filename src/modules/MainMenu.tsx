import React, { Component } from 'react'
import { StyleSheet, Text, View, Image, Animated, BackHandler } from 'react-native'
import { Alert } from './Alert'
// import {
//   NewGameSettings,
//   Scoreboard,
//   SavedGames,
// } from './../../utility/constants';
import AnimatedButton from './AnimatedButton'

interface MainMenuProps {
  navigation: unknown;
  activeGame?: unknown;
  maxScore: number;
  maxScoreWins: boolean;
  savedGames: unknown[];
  edited: boolean;
}

interface MainMenuState {
  key?: number;
  bringMenusAnimationOne: Animated.Value;
  bringMenusAnimationTwo: Animated.Value;
  showGameInProgressAlert: boolean;
}

const DELAY_INTERVAL = 250
const BUTTON_1_ANIMATION_DELAY = 1400
const BUTTON_2_ANIMATION_DELAY = BUTTON_1_ANIMATION_DELAY + DELAY_INTERVAL
const BUTTON_3_ANIMATION_DELAY = BUTTON_1_ANIMATION_DELAY + (2 * DELAY_INTERVAL)
const BUTTON_4_ANIMATION_DELAY = BUTTON_1_ANIMATION_DELAY + (3 * DELAY_INTERVAL)

class MainMenu extends Component<MainMenuProps, MainMenuState> {
  constructor(props: MainMenuProps) {
    super(props)
    this.state = {
      bringMenusAnimationOne: new Animated.Value(-120),
      bringMenusAnimationTwo: new Animated.Value(800),
      showGameInProgressAlert: false,
    }
  }

  static navigationOptions = () => {
    return {
      headerTitle: null,
      header: null,
    }
  };

  componentDidMount() {
    this.startAnimation()
    this.setState({ key: Math.random() })
  }

  startAnimation = () => {
    const delayOffset = 1400
    Animated.parallel([
      Animated.timing(this.state.bringMenusAnimationOne, {
        toValue: 70,
        duration: 400,
        delay: delayOffset - 700,
        useNativeDriver: true,
      }),
      Animated.timing(this.state.bringMenusAnimationTwo, {
        delay: delayOffset - 600,
        toValue: 100,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start()
  };

  startNewGame = () => {
    const { edited, navigation } = this.props
    if (edited) {
      this.setState({ showGameInProgressAlert: true })
    } else {
      // navigation.navigate(NewGameSettings);
    }
  };

  hideGameInProgressAlert = () => {
    this.setState({ showGameInProgressAlert: false })
  };

  continueGame = () => {
    // navigation.navigate(Scoreboard);
  };

  savedGames = () => {
    // navigation.navigate(SavedGames);
  };

  exitGame = () => {
    BackHandler.exitApp();
  }

  render() {
    const {
      bringMenusAnimationOne,
      bringMenusAnimationTwo,
    } = this.state
    const { edited, savedGames } = this.props
    const hasSavedGames = savedGames.length > 0
    const animationSavedGameButtonDelay = !edited
      ? BUTTON_2_ANIMATION_DELAY
      : BUTTON_3_ANIMATION_DELAY
    const animationExitButtonDelay =
      edited && hasSavedGames
        ? BUTTON_4_ANIMATION_DELAY
        : !edited && !hasSavedGames
          ? BUTTON_2_ANIMATION_DELAY
          : BUTTON_3_ANIMATION_DELAY
    return (
      <View style={ styles.container }>
        <Image
          source={ require('./../assets/images/cards_dices.png') }
          style={ [
            StyleSheet.absoluteFill,
            styles.backgroundImage,
          ] }
          resizeMode="cover"
        />
        <Animated.View
          style={ {
            ...styles.titleContainer,
            transform: [{ translateY: bringMenusAnimationOne }],
          } }>
          <Text style={ styles.title }>MULTIBOARD</Text>
        </Animated.View>
        <Animated.View
          style={ {
            ...styles.menuContainer,
            transform: [{ translateY: bringMenusAnimationTwo }],
          } }>
          <Text style={ styles.header }>Main Menu</Text>
          <View style={ styles.body }>
            <AnimatedButton
              onPress={ this.startNewGame }
              delay={ BUTTON_1_ANIMATION_DELAY }
              text="New Game"
              width={ 250 }
            />
            { edited &&
              <AnimatedButton
                onPress={ this.continueGame }
                delay={ BUTTON_2_ANIMATION_DELAY }
                text="Continue game"
                width={ 250 }
              />
            }
            { savedGames.length > 0 && (
              <AnimatedButton
                onPress={ this.savedGames }
                delay={ animationSavedGameButtonDelay }
                text="Saved Games"
                width={ 250 }
              />
            ) }
            <AnimatedButton
              onPress={ this.exitGame }
              delay={ animationExitButtonDelay }
              text="Exit"
              width={ 250 }
            />
          </View>
        </Animated.View>
        <Alert
          show={ this.state.showGameInProgressAlert }
          showProgress={ false }
          title="Unsaved game"
          message="There is a game in progress. Do you want to start a new game anyway?"
          showCancelButton={ true }
          showConfirmButton={ true }
          cancelText="No"
          confirmText="Yes"
          onCancelPressed={ () => {
            this.hideGameInProgressAlert()
          } }
          onConfirmPressed={ () => {
            this.hideGameInProgressAlert()
            // this.props.navigation.navigate(NewGameSettings);
          } }
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#000',
  },
  backgroundImage: { flex: 1, height: undefined, width: undefined },
  title: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: '900',
    color: '#fff',
  },
  header: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: '900',
    color: '#fff',
    padding: 40,
  },
  body: {
    flexDirection: 'column',
    alignItems: 'center',
    alignContent: 'center',
  },
  titleContainer: {
    alignSelf: 'stretch',
    alignContent: 'center',
    flexDirection: 'column',
    backgroundColor: '#222',
    marginLeft: 15,
    marginRight: 15,
    borderRadius: 20,
    padding: 20,
    marginTop: 25,
  },
  menuContainer: {
    alignSelf: 'stretch',
    paddingBottom: 60,
    borderRadius: 20,
    marginLeft: 15,
    marginRight: 15,
    backgroundColor: '#222',
  },
})

export default MainMenu

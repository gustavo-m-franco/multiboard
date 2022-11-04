import React from 'react';
import { StyleSheet, View } from 'react-native';
import { StartNewGamePayload } from '../../modules/game/game-reducer';
import AnimatedButton from '../button/animated-button';
import { NativeStackNavigationProp } from '@react-navigation/native-stack/lib/typescript/src/types';
import { RootStackParamList } from '../../modules/navigation';

interface FooterNewGameProps {
  navigation: NativeStackNavigationProp<RootStackParamList>;
  startNewGame: (newGame: StartNewGamePayload) => void;
  maxScore: number;
  isMaxScoreWins: boolean;
  timed: boolean;
  time: string;
}

export const FooterNewGame: React.FC<FooterNewGameProps> = ({
  maxScore,
  isMaxScoreWins,
  time,
  timed,
  startNewGame,
  navigation,
}) => {
  const onStartNewGame = (): void => {
    startNewGame({
      maxScore,
      isMaxScoreWins,
      timed,
      time,
    });
    // props.navigation.navigate(Screens.Scoreboard);
  };

  return (
    <View style={styles.footer}>
      <AnimatedButton
        onPress={onStartNewGame}
        text="Start"
        width={150}
        delay={1000}
      />
      <AnimatedButton
        onPress={() => {
          navigation.goBack();
        }}
        text="Back to menu"
        width={150}
        delay={1000}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'column',
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: '#222',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingTop: 25,
    paddingBottom: 15,
  },
});

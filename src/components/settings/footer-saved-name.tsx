import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack/lib/typescript/src/types';
import { RootStackParamList } from '../../screens/navigation';
import { AnimatedButton } from '../button/animated-button';

interface FooterSaveGameProps {
  navigation: NativeStackNavigationProp<RootStackParamList>;
  isNewGame?: boolean;
  onSubmit: () => void;
}

export const FooterSaveGame: React.FC<FooterSaveGameProps> = ({
  navigation,
  isNewGame,
  onSubmit,
}) => {
  const goToMainMenu = () => {
    navigation.pop(3);
  };

  return (
    <View style={styles.saveGameForm}>
      <AnimatedButton
        onPress={onSubmit}
        text={isNewGame ? 'Start game' : 'Save changes'}
        width={170}
        delay={500}
      />
      <AnimatedButton
        onPress={goToMainMenu}
        text="Main menu"
        width={170}
        delay={1000}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  saveGameForm: {
    flexDirection: 'column',
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: '#222',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingTop: 15,
    paddingBottom: 10,
  },
});

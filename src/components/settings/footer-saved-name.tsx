import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Icon } from '@rneui/themed';
import { trimName } from './../../utility/format';
import { NativeStackNavigationProp } from '@react-navigation/native-stack/lib/typescript/src/types';
import { RootStackParamList, Screens } from '../../screens/navigation';
import { AnimatedButton } from '../button/animated-button';

interface FooterSaveGameProps {
  navigation: NativeStackNavigationProp<RootStackParamList>;
  gameName?: string;
  saved?: boolean;
  edited?: boolean;
  saveProgress?: (gameName: string) => void;
  showEmptyNameMessage: () => void;
}

interface FooterSaveState {
  gameName?: string;
  allowEditGame: boolean;
  saveProgressDelay: number;
}

export class FooterSaveGame extends Component<
  FooterSaveGameProps,
  FooterSaveState
> {
  constructor(props: FooterSaveGameProps) {
    super(props);
    this.state = {
      gameName: props.gameName,
      allowEditGame: false,
      saveProgressDelay: 100,
    };
  }

  // TODO
  UNSAFE_componentWillMount(): void {
    if (this.props.edited) this.setState({ saveProgressDelay: 1000 });
  }

  saveProgress = () => {
    if (this.state.gameName && this.state.gameName.length < 31) {
      this.props.saveProgress(this.state.gameName);
      this.setState({ allowEditGame: false });
    } else {
      this.props.showEmptyNameMessage();
    }
    this.setState({ saveProgressDelay: 100 });
  };

  editGameName = () => {
    this.setState({ allowEditGame: true });
  };

  onChangeText = (gameName: string) => {
    this.setState({ gameName });
  };

  gameNameControl = () => {
    let saveProgressButton;
    if (this.props.edited) {
      saveProgressButton = (
        <AnimatedButton
          onPress={this.saveProgress}
          text="Save progress"
          width={170}
          delay={this.state.saveProgressDelay}
        />
      );
    }
    if (this.props.saved) {
      if (this.state.allowEditGame) {
        return (
          <View style={styles.saveGameContainer}>
            <TextInput
              value={this.state.gameName}
              style={styles.saveGameName}
              placeholder="Game name (ei. BestScore)"
              placeholderTextColor="#999"
              onChangeText={this.onChangeText}
              onSubmitEditing={this.saveProgress}
              underlineColorAndroid="rgba(0,0,0,0)"
            />
            <TouchableOpacity
              style={styles.saveGameButton}
              onPress={this.saveProgress}>
              <Text style={styles.optionButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        );
      } else {
        return (
          <View style={styles.savedGameContainer}>
            <View style={styles.editGameNameContainer}>
              <Text style={styles.savedGameName}>
                <Text style={styles.savedGameNameLabel}>Game:</Text>
                {trimName(` ${this.props.gameName ?? ''}`, 25)}
              </Text>
              <TouchableOpacity onPress={this.editGameName}>
                <Icon name="edit" size={20} color="#aaa" />
              </TouchableOpacity>
            </View>
            {saveProgressButton}
          </View>
        );
      }
    } else {
      return (
        <View style={styles.saveGameContainer}>
          <TextInput
            value={this.state.gameName}
            style={[
              styles.saveGameName,
              !this.props.gameName ? undefined : styles.noDisplay,
            ]}
            placeholder="Game name (ei. BestScore)"
            placeholderTextColor="#999"
            onChangeText={gameName => {
              this.setState({ gameName });
            }}
            onSubmitEditing={this.saveProgress}
            underlineColorAndroid="rgba(0,0,0,0)"
          />
          <TouchableOpacity
            style={styles.saveGameButton}
            onPress={this.saveProgress}>
            <Text style={styles.optionButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      );
    }
  };

  render(): React.ReactNode {
    return (
      <View style={styles.saveGameForm}>
        {this.gameNameControl()}
        <AnimatedButton
          onPress={() => {
            this.props.navigation.goBack();
          }}
          text="Continue playing"
          width={170}
          delay={1000}
        />
        <AnimatedButton
          onPress={() => {
            this.props.navigation.navigate(Screens.MainMenu);
          }}
          text="Main menu"
          width={170}
          delay={1000}
        />
      </View>
    );
  }
}

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
  optionButtonText: {
    color: '#999',
    fontWeight: '900',
    padding: 3,
    fontSize: 15,
    textAlign: 'center',
  },
  saveGameButton: {
    height: 44,
    flex: 1,
    backgroundColor: '#333',
    marginBottom: 15,
    marginLeft: 10,
    marginRight: 20,
    padding: 10,
    borderRadius: 10,
  },
  saveGameName: {
    flex: 4,
    height: 44,
    fontSize: 15,
    textAlign: 'center',
    backgroundColor: '#333',
    marginBottom: 15,
    marginLeft: 20,
    padding: 10,
    borderRadius: 10,
    color: '#fff',
    letterSpacing: 2,
  },
  savedGameName: {
    flexDirection: 'column',
    height: 44,
    fontSize: 15,
    textAlign: 'center',
    backgroundColor: '#222',
    marginBottom: 15,
    padding: 10,
    color: '#fff',
    letterSpacing: 2,
  },
  savedGameNameLabel: {
    paddingTop: 20,
    marginRight: 10,
    fontWeight: '900',
  },
  editGameNameContainer: {
    flexDirection: 'row',
  },
  noDisplay: {
    display: 'none',
  },
  saveGameContainer: {
    flexDirection: 'row',
  },
  savedGameContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
});

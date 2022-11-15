import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Platform,
} from 'react-native';

interface MaxScoreControlProps {
  maxScore: number;
  onChange: (maxScore: number) => void;
}

interface MaxScoreControlState {
  newScore: string;
  newScoreRefresh: number;
}

export class MaxScoreControl extends Component<
  MaxScoreControlProps,
  MaxScoreControlState
> {
  inputRef: TextInput | null = null;
  constructor(props: MaxScoreControlProps) {
    super(props);
    this.state = {
      newScore: props.maxScore.toString(),
      newScoreRefresh: props.maxScore,
    };
  }

  onChanged = (text: string) => {
    this.setState({
      ...this.state,
      newScore: this.state.newScoreRefresh.toString(),
    });
    const newScore = Number(text.replace(/[^0-9]/g, ''));
    this.setState({ newScore: newScore.toString() });
  };

  addToMaxScore = (delta: number) => {
    this.props.onChange(this.props.maxScore + delta);
    this.setState({ newScore: (+this.state.newScore + delta).toString() });
  };

  onKeyPress = () => {
    Platform.OS === 'ios' &&
      this.setState({
        newScore: '...',
        newScoreRefresh: Number(this.state.newScore),
      });
  };

  updateMaxScore = () => {
    this.props.onChange(Number(this.state.newScore));
  };

  onPress = () => Number(this.state.newScore) > 1 && this.addToMaxScore(-1);

  onBlur = () =>
    this.state.newScore && this.props.onChange(Number(this.state.newScore));

  render(): React.ReactNode {
    return (
      <View style={styles.counter}>
        <TouchableOpacity
          style={styles.updateScoreMinus}
          onPress={this.onPress}>
          <Text style={styles.updateScoreIcon}>-</Text>
        </TouchableOpacity>
        <View style={styles.scoreValue}>
          <TextInput
            ref={input => {
              this.inputRef = input;
            }}
            keyboardType="numeric"
            style={styles.scoreValueText}
            value={this.state.newScore.toString()}
            onChangeText={this.onChanged}
            onKeyPress={this.onKeyPress}
            onSubmitEditing={this.updateMaxScore}
            onBlur={this.onBlur}
            underlineColorAndroid="rgba(0,0,0,0)"
          />
        </View>
        <TouchableOpacity
          style={styles.updateScorePlus}
          onPress={() => {
            this.addToMaxScore(1);
          }}>
          <Text style={styles.updateScoreIcon}>+</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  counter: {
    flex: 2,
    flexDirection: 'row',
  },
  updateScoreMinus: {
    width: 40,
    backgroundColor: '#dd2323',
    flexDirection: 'row',
    alignItems: 'center',
  },
  updateScorePlus: {
    width: 40,
    backgroundColor: '#33bb33',
    flexDirection: 'row',
    alignItems: 'center',
  },
  updateScoreIcon: {
    flex: 1,
    textAlign: 'center',
    color: '#fff',
  },
  scoreValue: {
    flex: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  scoreValueText: {
    flex: 1,
    textAlign: 'center',
    color: '#fff',
    fontWeight: '900',
    fontSize: 15,
  },
});

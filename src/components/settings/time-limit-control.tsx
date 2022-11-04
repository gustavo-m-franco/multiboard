import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { Icon } from '@rneui/themed';

interface TimeLimitControlProps {
  time: string;
  updateTimeLimit: (time: string) => void;
  showWrongTimeMessage: () => void;
}

interface TimeLimitControlState {
  time: string;
  editing: boolean;
}

export class TimeLimitControl extends Component<
  TimeLimitControlProps,
  TimeLimitControlState
> {
  inputRef: TextInput | null = null;

  constructor(props: TimeLimitControlProps) {
    super(props);
    this.state = {
      time: props.time,
      editing: false,
    };
  }

  onChanged = (text: string) => {
    const time = this.formatTimeDisplay(text);
    this.setState({ time });
  };

  formatTimeDisplay = (time: string) => {
    let result = time.replace(/[^0-9]/g, '');
    if (result.length > 4) {
      result = result.substring(result.length - 4, result.length);
    }
    const length = 4 - result.length;
    for (let i = 0; i < length; i++) {
      result = `0${result}`;
    }
    const firstPart = result.substring(0, 2);
    const secondPart = result.substring(2, 4);
    result = `${firstPart}:${secondPart}`;
    return result;
  };

  isValidTime = (time: string) => {
    const isRightLength = time.length === 5;
    const isNumber = !isNaN(+time.replace(':', ''));
    const isInteger = Number.isInteger(Number(time.replace(':', '')));
    const isSecondsAmountValid =
      Number(time.replace(':', '').substring(2, 4)) < 60;
    if (isRightLength && isNumber && isInteger && isSecondsAmountValid) {
      return true;
    }
    return false;
  };

  updateTime = () => {
    if (this.isValidTime(this.state.time)) {
      this.props.updateTimeLimit(this.state.time);
    } else {
      this.setState({ time: this.props.time });
      this.props.showWrongTimeMessage();
    }
  };

  onBlur = () => {
    this.setState({ editing: false });
    this.updateTime();
  };

  onFocus = () => {
    this.inputRef?.focus();
    this.setState({ editing: true });
  };

  render(): void {
    return (
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <TextInput
            ref={input => {
              this.inputRef = input;
            }}
            keyboardType="numeric"
            style={styles.value}
            value={this.state.time.toString()}
            onChangeText={text => this.onChanged(text)}
            onSubmitEditing={this.updateTime}
            onKeyPress={() => {
              if (Platform.OS === 'ios') this.setState({ time: '...' });
            }}
            onBlur={this.onBlur}
            onFocus={this.onFocus}
            underlineColorAndroid="rgba(0,0,0,0)"
          />
          <TouchableOpacity style={styles.edit} onPress={this.onFocus}>
            <Icon
              name={this.state.editing ? 'done' : 'edit'}
              size={20}
              color="#fff"
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    alignSelf: 'stretch',
    height: 54,
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: '#2b2b2b',
  },
  innerContainer: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'center',
    height: 54,
    alignItems: 'center',
    backgroundColor: '#2b2b2b',
  },
  value: {
    textAlign: 'center',
    fontWeight: '900',
    color: '#FFF',
  },
  edit: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
});

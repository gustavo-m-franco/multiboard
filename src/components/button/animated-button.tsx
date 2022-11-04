import React from 'react';
import { StyleSheet, Text, TouchableOpacity, Animated } from 'react-native';

interface AnimatedButtonProps {
  delay?: number;
  width: number;
  onPress: () => void;
  text: string;
}

interface AnimatedButtonState {
  springAnimation: Animated.Value;
}

const styles = StyleSheet.create({
  animationContainer: { height: 54, alignSelf: 'center' },
  optionButton: {
    height: 40,
    flex: 1,
    backgroundColor: '#333',
    marginBottom: 15,
    borderRadius: 10,
  },
  optionButtonText: {
    textAlign: 'center',
    color: '#999',
    fontWeight: '900',
    margin: 10,
  },
});

export class AnimatedButton extends React.PureComponent<
  AnimatedButtonProps,
  AnimatedButtonState
> {
  constructor(props: AnimatedButtonProps) {
    super(props);
    this.state = {
      springAnimation: new Animated.Value(0),
    };
  }

  componentDidMount(): void {
    const bounciness = 12;
    const speed = 1;

    Animated.spring(this.state.springAnimation, {
      toValue: 1,
      delay: this.props.delay ? this.props.delay : 100,
      speed,
      bounciness,
      useNativeDriver: true,
    }).start();
  }

  render(): React.ReactNode {
    const { width, onPress, text } = this.props;
    const { springAnimation: animation } = this.state;
    return (
      <Animated.View
        style={[
          styles.animationContainer,
          {
            width,
            transform: [{ scale: animation }, { perspective: 1000 }],
            opacity: animation,
          },
        ]}>
        <TouchableOpacity style={styles.optionButton} onPress={onPress}>
          <Text style={styles.optionButtonText}>{text}</Text>
        </TouchableOpacity>
      </Animated.View>
    );
  }
}

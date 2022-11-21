import React, { Component } from 'react';
import { StyleSheet, Text, View, Animated } from 'react-native';

interface NavigationHeaderProps {
  title: string;
}

interface NavigationHeaderState {
  animation: Animated.Value;
}

export class NavigationHeader extends Component<
  NavigationHeaderProps,
  NavigationHeaderState
> {
  constructor(props: NavigationHeaderProps) {
    super(props);
    this.state = {
      animation: new Animated.Value(200),
    };
  }

  componentDidMount() {
    Animated.spring(this.state.animation, {
      toValue: 0,
      speed: 1,
      bounciness: 8,
      useNativeDriver: true,
    }).start();
  }

  render() {
    const { animation } = this.state;
    return (
      <View style={styles.container}>
        <Animated.View style={{ transform: [{ translateY: animation }] }}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{this.props.title}</Text>
          </View>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    flexDirection: 'row',
  },
  titleContainer: {
    width: 220,
    padding: 10,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: '#333',
    marginBottom: 0,
    borderRadius: 20,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    fontWeight: '900',
    color: '#fff',
  },
});

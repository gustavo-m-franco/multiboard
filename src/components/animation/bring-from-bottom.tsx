import React from 'react';
import { Animated, StyleSheet, ViewStyle } from 'react-native';

interface BringFromBottomProps {
  children: React.ReactNode;
  style: ViewStyle;
  delay?: number;
}

interface BringFromBottomState {
  bringUp: Animated.Value;
}

export class BringFromBottom extends React.Component<
  BringFromBottomProps,
  BringFromBottomState
> {
  constructor(props: BringFromBottomProps) {
    super(props);
    this.state = {
      bringUp: new Animated.Value(800),
    };
  }

  componentDidMount(): void {
    Animated.timing(this.state.bringUp, {
      toValue: 100,
      delay: this.props.delay ? this.props.delay : 300,
      useNativeDriver: true,
    }).start();
  }

  render(): React.ReactNode {
    const { bringUp } = this.state;

    return (
      <Animated.View
        style={[
          styles.container,
          this.props.style,
          { transform: [{ translateY: bringUp }] },
        ]}>
        {this.props.children}
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
  },
});

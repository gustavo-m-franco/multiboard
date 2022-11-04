import React, { ReactNode } from 'react';
import { Animated, ViewStyle } from 'react-native';

interface GrowToScrollViewProps {
  children?: ReactNode;
  delay: number;
  style: ViewStyle;
}

interface GrowToScrollViewState {
  scale: Animated.Value;
}

export class GrowToScrollView extends React.Component<
  GrowToScrollViewProps,
  GrowToScrollViewState
> {
  constructor(props: GrowToScrollViewProps) {
    super(props);
    this.state = {
      scale: new Animated.Value(0),
    };
  }

  componentDidMount(): void {
    Animated.timing(this.state.scale, {
      toValue: 1,
      delay: this.props.delay,
      useNativeDriver: true,
    }).start();
  }

  render(): React.ReactNode {
    const { scale } = this.state;

    return (
      <Animated.ScrollView
        scrollEnabled={true}
        showsVerticalScrollIndicator={true}
        style={{
          transform: [{ scale }, { perspective: 1000 }],
          opacity: scale,
          ...this.props.style,
        }}>
        {this.props.children}
      </Animated.ScrollView>
    );
  }
}

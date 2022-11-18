import React from 'react';
import { StyleSheet, View, Switch } from 'react-native';
import { ControlInputWrapper } from './control/control-input-wrapper';

interface TimedControlProps {
  description: string;
  onChange: (timed: boolean) => void;
  timed: boolean;
}

// TODO deprecated props
export const TimedControl: React.FC<TimedControlProps> = props => {
  const onChange = (): void => props.onChange(!props.timed);
  return (
    <ControlInputWrapper description={props.description}>
      <View style={styles.switchContainer}>
        <View style={styles.switchComponent}>
          <Switch
            thumbTintColor={props.timed ? '#FFF' : '#999'}
            tintColor="#444"
            value={props.timed}
            onValueChange={onChange}
          />
        </View>
      </View>
    </ControlInputWrapper>
  );
};

const styles = StyleSheet.create({
  switchContainer: {
    flex: 2,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#2b2b2b',
  },
  switchComponent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 5,
    marginRight: 5,
  },
});

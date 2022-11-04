import React from 'react';
import { StyleSheet, Text, View, Switch } from 'react-native';

interface TimeSettingProps {
  description: string;
  updateTimedGame: (timed: boolean) => void;
  timed: boolean;
}

export const TimeSetting: React.FC<TimeSettingProps> = props => {
  const updateTimedGame = (): void => props.updateTimedGame(!props.timed);
  return (
    <View style={styles.setting}>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>{props.description}</Text>
      </View>
      <View style={styles.switchContainer}>
        <View style={styles.switchComponent}>
          <Switch
            thumbTintColor={props.timed ? '#FFF' : '#999'}
            tintColor="#444"
            value={props.timed}
            onValueChange={updateTimedGame}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  setting: {
    flexDirection: 'row',
    backgroundColor: '#333',
    borderBottomColor: '#444',
    borderBottomWidth: 2,
  },
  labelContainer: {
    flex: 3,
    flexDirection: 'row',
  },
  label: {
    flex: 3,
    textAlign: 'center',
    color: '#fff',
    paddingTop: 18,
    paddingBottom: 18,
    paddingLeft: 5,
    paddingRight: 5,
    fontWeight: '900',
  },
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

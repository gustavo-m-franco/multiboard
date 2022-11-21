import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface DetailProps {
  label: string;
  value: string;
}

export const Detail: React.FC<DetailProps> = ({ label, value }) => {
  return (
    <View style={styles.detail}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  detail: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailLabel: {
    flex: 1,
    textAlign: 'right',
    color: '#fff',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 5,
    paddingRight: 5,
    fontWeight: '600',
    fontSize: 12,
  },
  detailValue: {
    flex: 1,
    textAlign: 'left',
    color: '#999',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 5,
    paddingRight: 5,
    fontWeight: '300',
    fontSize: 12,
  },
});

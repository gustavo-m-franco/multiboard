import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { GrowToScrollView } from '../animation/grow-to-scroll-view';

interface CustomAlertProps {
  message: string;
  title?: string;
  confirmText: string;
  onConfirmPressed: () => void;
}

const CustomAlert: React.FC<CustomAlertProps> = (props) => (
  <View style={styles.overlayContainer}>
    <View style={styles.overlay} />
    <GrowToScrollView style={styles.container} delay={100}>
      <Text style={styles.title}>{props.title}</Text>
      <Text style={styles.message}>{props.message}</Text>
      <TouchableOpacity
        style={styles.confirmButton}
        onPress={props.onConfirmPressed}>
        <Text style={styles.confirmButtonText}>{props.confirmText}</Text>
      </TouchableOpacity>
    </GrowToScrollView>
  </View>
);

const styles = StyleSheet.create({
  overlayContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  container: {
    borderRadius: 10,
    backgroundColor: '#555',
    padding: 15,
    width: 250,
    alignItems: 'center',
    flexDirection: 'column',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: '#222',
    opacity: 0.3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#FFF',
    fontWeight: '900',
    fontSize: 18,
    marginTop: 5,
    marginBottom: 15,
  },
  message: {
    color: '#FFF',
    fontWeight: '400',
    fontSize: 15,
  },
  confirmButton: {
    marginTop: 15,
    marginBottom: 5,
    backgroundColor: '#77CC77',
    padding: 7,
    borderRadius: 5,
  },
  confirmButtonText: {
    color: '#FFF',
    fontWeight: '900',
  },
});

export default CustomAlert;

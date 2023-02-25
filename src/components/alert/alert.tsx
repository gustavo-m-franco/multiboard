import React from 'react';
import AwesomeAlert from 'react-native-awesome-alerts';
import { StyleSheet } from 'react-native';

interface AlertProps {
  show?: boolean;
  showProgress: boolean;
  message: string;
  title?: string;
  showCancelButton: boolean;
  showConfirmButton: boolean;
  confirmText: string;
  cancelText?: string;
  onConfirmPressed?: () => void;
  onCancelPressed?: () => void;
}

export const Alert: React.FC<AlertProps> = ({
  show,
  showProgress,
  title,
  message,
  showCancelButton,
  showConfirmButton,
  confirmText,
  onConfirmPressed,
  onCancelPressed,
  cancelText,
}) => (
  <AwesomeAlert
    show={show}
    showProgress={showProgress}
    title={title}
    message={message}
    closeOnTouchOutside={false}
    closeOnHardwareBackPress={false}
    showCancelButton={showCancelButton}
    showConfirmButton={showConfirmButton}
    confirmText={confirmText}
    cancelText={cancelText}
    confirmButtonColor="#77CC77"
    cancelButtonColor="#CC7777"
    onConfirmPressed={onConfirmPressed}
    onCancelPressed={onCancelPressed}
    titleStyle={styles.title}
    messageStyle={styles.message}
    alertContainerStyle={styles.alertContainer}
    contentContainerStyle={styles.container}
    cancelButtonTextStyle={styles.cancelButtonText}
    confirmButtonTextStyle={styles.confirmButtonText}
    cancelButtonStyle={styles.cancelButton}
    confirmButtonStyle={styles.confirmButton}
  />
);

const styles = StyleSheet.create({
  title: { color: '#FFF', fontWeight: '900' },
  message: { color: '#FFF', fontWeight: '400' },
  alertContainer: { borderRadius: 10, backgroundColor: '#2224' },
  container: { borderRadius: 10, backgroundColor: '#555', padding: 15 },
  cancelButtonText: { color: '#FFF', fontWeight: '900' },
  cancelButton: { margin: 10 },
  confirmButtonText: { color: '#FFF', fontWeight: '900' },
  confirmButton: { margin: 10 },
});

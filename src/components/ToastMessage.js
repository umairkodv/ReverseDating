import React from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import Toast from 'react-native-simple-toast';

export const ToastMessage = message => {
  if (message) {
    Toast.showWithGravity(message, Toast.SHORT, Toast.BOTTOM, [
      'RCTModalHostViewController',
      'UIAlertController',
    ]);
  } else {
    Toast.showWithGravity('Something went wrong.', Toast.BOTTOM, [
      'RCTModalHostViewController',
      'UIAlertController',
    ]);
  }
};

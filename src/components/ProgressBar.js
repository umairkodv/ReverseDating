import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS} from '../utils/constants';

export default function ProgressBar({progress}) {
  return (
    <View style={styles.progressBarBackground}>
      <LinearGradient
        colors={[COLORS.linear1, COLORS.linear2]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={[styles.progressBar, {width: `${progress}%`}]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  progressBarBackground: {
    width: '100%',
    height: 12,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    overflow: 'hidden',
    borderColor: COLORS.primary,
    borderWidth: 1,
    marginTop: 40,
  },
  progressBar: {
    height: '100%',
    borderRadius: 10,
  },
});

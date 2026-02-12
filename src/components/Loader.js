import {Image, StyleSheet, Text, View, Dimensions, Modal} from 'react-native';
import React from 'react';
import imagePath from '../utils/imagePath';
import LottieView from 'lottie-react-native';
export default function Loader() {
  return (
    <View style={styles.mainView}>
      <LottieView
        style={styles.image}
        source={imagePath.reverseLoader}
        autoPlay
        loop
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: -20,
    left: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    // backgroundColor: 'rgba(0, 0, 0, 0.2)',
    zIndex: 9999,
  },
  image: {
    height: 70,
    width: 70,
  },
});

import React, {useEffect, useRef, useState} from 'react';
import {View, Image, Animated, StyleSheet} from 'react-native';
import imagePath from '../utils/imagePath';

const HeartAnimation = () => {
  const animations = Array(6)
    .fill()
    .map(() => ({
      scale: useRef(new Animated.Value(0)).current,
      opacity: useRef(new Animated.Value(0)).current,
    }));

  const images = [
    imagePath.loader1,
    imagePath.loader2,
    imagePath.loader3,
    imagePath.loader4,
    imagePath.loader6,
    imagePath.loader5,
  ];

  useEffect(() => {
    const createAnimation = (scale, opacity, delay) => {
      return Animated.sequence([
        Animated.delay(delay),
        Animated.parallel([
          Animated.timing(scale, {
            toValue: 1.2, // Scale up slightly
            duration: 400, // Slow down scaling up
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 1, // Fade in
            duration: 400, // Slow down fade in
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(scale, {
            toValue: 1, // Scale down back to original
            duration: 400, // Slow down scaling down
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 0, // Fade out
            duration: 400, // Slow down fade out
            useNativeDriver: true,
          }),
        ]),
      ]);
    };

    // Create a continuous looping animation sequence
    Animated.loop(
      Animated.stagger(
        700,
        animations.map((anim, index) =>
          createAnimation(anim.scale, anim.opacity, index * 180),
        ),
      ),
    ).start();
  }, []);

  return (
    <View style={styles.container}>
      {images.map((image, index) => (
        <Animated.Image
          key={index}
          source={image}
          style={[
            styles.image,
            {
              transform: [{scale: animations[index].scale}],
              opacity: animations[index].opacity,
            },
          ]}
          resizeMode="contain"
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%', // Full height to ensure it centers vertically
  },
  image: {
    width: 120, // Adjust size as needed
    height: 120,
    position: 'absolute', // Overlay each image in the center
  },
});

export default HeartAnimation;

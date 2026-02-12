import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {LinearTextGradient} from 'react-native-text-gradient';
import {COLORS, FONT_FAMILIES, FONT_SIZES} from '../utils/constants';
import LinearGradient from 'react-native-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';

export default function TextComponent({text, textStyle}) {
  return (
    <MaskedView
      maskElement={
        <Text
          style={[styles.text, textStyle, {backgroundColor: 'transparent'}]}>
          {text}
        </Text>
      }>
      <LinearGradient
        style={[styles.text, textStyle]}
        colors={[COLORS.linear1, COLORS.linear2]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}>
        <Text style={[styles.text, textStyle, {opacity: 0}]}>{text}</Text>
      </LinearGradient>
    </MaskedView>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: FONT_FAMILIES.bold,
    fontSize: FONT_SIZES.twenty,
  },
});

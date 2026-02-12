import React from 'react';
import {TouchableOpacity, Text, StyleSheet, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS, FONT_FAMILIES, FONT_SIZES} from '../utils/constants';
const CustomButton = ({
  title,
  onPress,
  style,
  textStyle,
  image,
  imgStyle,
  disabled,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={style} disabled={disabled}>
      <LinearGradient
        colors={[COLORS.linear1, COLORS.linear2]}
        start={{x: 0, y: 0}}
        end={{x: 0.83, y: 0}}
        style={image ? [styles.linearGradient2] : [styles.linearGradient]}>
        <Text style={[styles.buttonText, textStyle]}>{title}</Text>
        {image && <Image source={image} style={imgStyle} />}
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    // flex: 1,
    height: 48,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
  },

  linearGradient2: {
    // flex: 1,
    height: 42,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  buttonText: {
    color: COLORS.gray,
    fontSize: FONT_SIZES.sixteen,
    textAlign: 'center',
    fontFamily: FONT_FAMILIES.bold,
  },
});

export default CustomButton;

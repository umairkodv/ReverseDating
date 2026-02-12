import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Right from '../assets/svgs/rightArrow.svg';
import {COLORS, FONT_FAMILIES, FONT_SIZES} from '../utils/constants';
import i18n from '../translation/i18n';

export default function SettingsComponent({image, text, onPress}) {
  return (
    <TouchableOpacity style={styles.commonContainer} onPress={onPress}>
      <View style={styles.imgTextview}>
        {image}
        <Text style={styles.text}>{text}</Text>
      </View>
      <Right />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  commonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  imgTextview: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  text: {
    fontSize: FONT_SIZES.sixteen,
    color: COLORS.black,
    fontFamily: FONT_FAMILIES.semiBold,
  },
});

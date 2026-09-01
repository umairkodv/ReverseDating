import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {COLORS, FONT_FAMILIES, FONT_SIZES} from '../utils/constants';
import imagePath from '../utils/imagePath';
import Line from '../assets/svgs/line.svg';

export default function CatFishComponent({data}) {
  console.log('data', data);

  return (
    <View style={styles.container}>
      <View style={styles.imgView}>
        <Image source={imagePath.user} />
        <View style={styles.textView}>
          <Text style={styles.nameText}>Anonymous</Text>
          <Text style={styles.messgText}>Dated Emily</Text>
        </View>
      </View>
      <Line style={styles.arrow} />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: COLORS.primary,
    height: 75,
    marginBottom: 16,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 14,
  },
  textView: {
    gap: 6,
  },
  nameText: {
    color: COLORS.black,
    fontSize: FONT_SIZES.fourteen,
    fontFamily: FONT_FAMILIES.semiBold,
  },
  messgText: {
    color: COLORS.black,
    fontSize: FONT_SIZES.twelve,
    fontFamily: FONT_FAMILIES.regular,
  },
  imgView: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  arrow: {marginRight: 30},
});

import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS, FONT_FAMILIES, FONT_SIZES} from '../utils/constants';

export default function FieldsKeyComponent({text1, text2}) {
  return (
    <View style={styles.textView}>
      <View style={styles.questionView}>
        <Text style={styles.nameText}>{text1}</Text>
      </View>
      <View style={styles.answerView}>
        <Text style={styles.answerText}>{text2}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textView: {
    flexDirection: 'row',
    gap: 40,
    marginBottom: 10,
  },
  nameText: {
    color: COLORS.black,
    fontSize: FONT_SIZES.sixteen,
    fontFamily: FONT_FAMILIES.medium,
  },
  answerText: {
    color: COLORS.black,
    fontSize: FONT_SIZES.sixteen,
    fontFamily: FONT_FAMILIES.medium,
  },
  answerView: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flex: 0.68,
    // backgroundColor: 'yellow',
  },
  questionView: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flex: 0.37,
    // backgroundColor: 'pink',
  },
});

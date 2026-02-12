import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';

import {COLORS, FONT_SIZES, FONT_FAMILIES} from '../utils/constants';
export default function CustomTextInputWImage({
  value,
  onChangeText,
  placeholder,
  inputStyle,
  inputContainerStyle,
  label,
  onBlur,
  props,
  keyboardType,
  maxLength,
  labelStyle,
  multiline,
  textAlignVertical,
  editable,
  image,
  rightImageVisible,
  secureTextEntry,
  onPressRight,
  onPressLeft,
  imageStyle,
  leftImageVisible,
  imageLeft,
}) {
  return (
    <>
      {/* <Text style={[styles.labelButton, labelStyle]}>{label}</Text> */}

      <View style={{...styles.textInputView, ...inputContainerStyle}}>
        {leftImageVisible && (
          <TouchableOpacity style={imageStyle} onPress={onPressLeft}>
            {imageLeft}
          </TouchableOpacity>
        )}
        <TextInput
          placeholder={placeholder}
          style={{...styles.inputText, ...inputStyle}}
          placeholderTextColor={COLORS.textGray}
          onBlur={onBlur}
          maxLength={maxLength}
          onChangeText={onChangeText}
          value={value}
          {...props}
          editable={editable}
          multiline={multiline}
          selectionColor={COLORS.primary}
          textAlignVertical={textAlignVertical}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
        />

        {rightImageVisible && (
          <TouchableOpacity style={imageStyle} onPress={onPressRight}>
            {imageRight}
          </TouchableOpacity>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  textInputView: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.lightGray,
    borderRadius: 12,
    marginBottom: 24,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    gap: 10,
    borderColor: COLORS.primary,
    borderWidth: 1,
  },
  inputText: {
    color: COLORS.black,
    fontSize: FONT_SIZES.fourteen,
    fontFamily: FONT_FAMILIES.regular,
    flex: 1,
  },
  // labelButton: {
  //   fontSize: FONT_SIZES.fourteen,
  //   fontFamily: FONT_FAMILIES.medium,
  //   color: COLORS.black,
  //   marginBottom: 8,
  // },
});

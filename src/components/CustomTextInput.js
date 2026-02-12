import {StyleSheet, Text, View, TextInput} from 'react-native';
import React from 'react';

import {COLORS, FONT_SIZES, FONT_FAMILIES} from '../utils/constants';
export default function CustomTextInput({
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
  secureTextEntry,
  autoFocus,
}) {
  return (
    <>
      {/* <Text style={[styles.labelButton, labelStyle]}>
        {label}
        // 
      </Text> */}
      {label && <Text style={[styles.labelButton, labelStyle]}>{label}</Text>}
      <View style={{...styles.textInputView, ...inputContainerStyle}}>
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
          autoFocus={autoFocus}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  textInputView: {
    height: 56,
    backgroundColor: COLORS.lightGray,
    borderRadius: 12,
    marginBottom: 24,
    paddingHorizontal: 20,
    justifyContent: 'center',
    borderColor: COLORS.primary,
    borderWidth: 1,
  },
  inputText: {
    color: COLORS.black,
    fontSize: FONT_SIZES.fourteen,
    fontFamily: FONT_FAMILIES.regular,
  },
  labelButton: {
    fontSize: FONT_SIZES.sixteen,
    fontFamily: FONT_FAMILIES.semiBold,
    color: COLORS.black,
    marginBottom: 8,
  },
});

import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import BaseView from '../BaseView';
import {COLORS, FONT_SIZES} from '../../utils/constants';
import CustomButton from '../../components/CustomButton';
import i18n from '../../translation/i18n';
import TextComponent from '../../components/TextComponent';
import BeginText from '../../assets/svgs/begin.svg';
import Back from '../../assets/svgs/back.svg';
export default function Begin(props) {
  return (
    <BaseView
      safeView={{backgroundColor: COLORS.white}}
      topView={{flex: 0, backgroundColor: COLORS.white}}
      baseViewStyle={{backgroundColor: COLORS.white, paddingHorizontal: 20}}>
      <View style={styles.mainView}>
        {/* <TextComponent
          text={i18n.t('get.upload')}
          textStyle={styles.uploadText}
        /> */}
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <Back />
        </TouchableOpacity>
        <BeginText style={{marginTop: 60, alignSelf: 'center'}} />
      </View>
      <CustomButton
        style={{marginBottom: 30}}
        title={i18n.t('get.continue')}
        onPress={() => props.navigation.navigate('NamePartner')}
      />
    </BaseView>
  );
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    marginTop: 20,
  },
  uploadText: {
    textAlign: 'center',
    fontSize: FONT_SIZES.twentyEight,
    marginBottom: 40,
  },
});

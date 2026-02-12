import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import BaseView from '../BaseView';
import {COLORS, FONT_SIZES} from '../../utils/constants';
import CustomButton from '../../components/CustomButton';
import i18n from '../../translation/i18n';
import TextComponent from '../../components/TextComponent';
import Logo from '../../assets/svgs/logo2.svg';
import Upload from '../../assets/svgs/upload.svg';
export default function GetStarted(props) {
  return (
    <BaseView
      safeView={{backgroundColor: COLORS.white}}
      topView={{flex: 0, backgroundColor: COLORS.white}}
      baseViewStyle={{backgroundColor: COLORS.white, paddingHorizontal: 20}}>
      <Logo style={{marginTop: 40, alignSelf: 'center'}} />
      <View style={styles.mainView}>
        {/* <TextComponent
          text={i18n.t('get.upload')}
          textStyle={styles.uploadText}
        /> */}
        <Upload style={{marginBottom: 70}} />
      </View>
      <CustomButton
        style={{marginBottom: 30}}
        title={i18n.t('get.get')}
        onPress={() => props.navigation.navigate('SignUp')}
      />
    </BaseView>
  );
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadText: {
    textAlign: 'center',
    fontSize: FONT_SIZES.twentyEight,
    marginBottom: 40,
  },
});

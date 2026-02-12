import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import BaseView from '../BaseView';
import {COLORS, FONT_FAMILIES, FONT_SIZES} from '../../utils/constants';
import i18n from '../../translation/i18n';
import Welcome from '../../assets/svgs/Welcome.svg';
import Back from '../../assets/svgs/back.svg';
import CustomTextInput from '../../components/CustomTextInput';
import CustomButton from '../../components/CustomButton';
import {ToastMessage} from '../../components/ToastMessage';
import Loader from '../../components/Loader';
import TextComponent from '../../components/TextComponent';
import {NewPassApi} from '../../services/actions/AuthApi';
export default function NewPassword(props) {
  const email = props.route?.params?.email;

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const checkRequiredFields = () => {
    if (password.trim() == '') {
      ToastMessage(i18n.t('toastMessage.password'));
      return false;
    } else if (password.length < 6) {
      ToastMessage(i18n.t('toastMessage.passwordLength'));
      return false;
    } else if (confirmPassword !== password) {
      ToastMessage(i18n.t('toastMessage.passwordMismatch'));
      return false;
    } else {
      return true;
    }
  };

  const handleNewPass = async () => {
    const isValid = checkRequiredFields();
    if (isValid) {
      setLoading(true);
      const data = {
        email: email,
        newPassword: password,
      };

      const response = await NewPassApi(data);
      console.log('responseformotp', response);
      if (response?.statusCode === 200) {
        setLoading(false);
        props.navigation.replace('Login');
      } else {
        setLoading(false);
        ToastMessage(response?.data?.message);
      }
    }
  };

  return (
    <BaseView
      safeView={{backgroundColor: COLORS.white}}
      topView={{flex: 0, backgroundColor: COLORS.white}}
      baseViewStyle={{backgroundColor: COLORS.white, paddingHorizontal: 20}}>
      <TouchableOpacity
        onPress={() => props.navigation.goBack()}
        style={{marginTop: 20}}>
        <Back />
      </TouchableOpacity>
      <View style={styles.mainView}>
        <TextComponent
          text={i18n.t('login.Create')}
          textStyle={styles.createText}
        />
        <CustomTextInput
          placeholder={'New Password'}
          value={password}
          inputContainerStyle={{marginTop: 50}}
          onChangeText={setPassword}
        />
        <CustomTextInput
          placeholder={'Confirm Password'}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
      </View>
      <CustomButton
        title={i18n.t('login.submit')}
        style={{marginBottom: 30}}
        onPress={handleNewPass}
      />

      {loading && <Loader />}
    </BaseView>
  );
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    marginTop: 30,
  },
  welcomeText: {
    fontSize: FONT_SIZES.sixteen,
    fontFamily: FONT_FAMILIES.bold,
    color: COLORS.lightBlack,
  },
  welcomeImg: {
    marginTop: 20,
    alignSelf: 'center',
  },
  forgotView: {
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginTop: -10,
    marginBottom: 90,
  },
  forgotText: {
    fontSize: FONT_SIZES.fourteen,
    fontFamily: FONT_FAMILIES.regular,
    color: COLORS.textGray,
  },
  orView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 22,
    marginTop: 60,
  },
  lineView: {
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    flex: 1,
  },
  orText: {
    fontSize: FONT_SIZES.sixteen,
    fontFamily: FONT_FAMILIES.bold,
    color: COLORS.black,
  },
  socialView: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'center',
    height: 48,
    borderRadius: 12,
    backgroundColor: COLORS.social,
    marginBottom: 24,
  },
  socialText: {
    fontSize: FONT_SIZES.sixteen,
    fontFamily: FONT_FAMILIES.bold,
    color: COLORS.linear1,
  },
  createText: {
    fontSize: FONT_SIZES.twentyEight,
    // color: COLORS.linear1,
    paddingHorizontal: 10,
    textAlign: 'center',
  },
});

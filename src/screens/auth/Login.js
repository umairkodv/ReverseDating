import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import BaseView from '../BaseView';
import {COLORS, FONT_FAMILIES, FONT_SIZES} from '../../utils/constants';
import i18n from '../../translation/i18n';
import Welcome from '../../assets/svgs/Welcome.svg';
import Back from '../../assets/svgs/back.svg';
import CustomTextInput from '../../components/CustomTextInput';
import CustomButton from '../../components/CustomButton';
import Google from '../../assets/svgs/google.svg';
import Apple from '../../assets/svgs/apple.svg';
import ForgotPasswordModal from '../modals/ForgotPasswordModal';
import {ToastMessage} from '../../components/ToastMessage';
import Loader from '../../components/Loader';
import {
  LoginApi,
  SocialLoginApi,
  forgotPassApi,
} from '../../services/actions/AuthApi';
import SocialLogin from '../../components/SocialLogin';
export default function Login(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const openModal = () => {
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
  };

  const checkRequiredFields = () => {
    const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailPattern.test(email.trim())) {
      ToastMessage(i18n.t('toastMessage.emailPattern'));
      return false;
    } else if (password.trim().length < 8) {
      ToastMessage(i18n.t('toastMessage.passwordLength'));
      return false;
    } else {
      return true;
    }
  };

  const handleLogin = async () => {
    const isValid = checkRequiredFields();
    if (isValid) {
      setLoading(true);
      const data = {
        email: email,
        password: password,
      };
      console.log('data', data);
      const response = await LoginApi(data);
      console.log('response', response);
      if (response?.statusCode === 200) {
        setLoading(false);
        props.navigation.navigate('AppStackNavigator');
      } else {
        setLoading(false);
        ToastMessage(response?.data?.message);
      }
    }
  };
  const handleSocialFailure = () => {};
  const handleSocialSuccess = async object => {
    console.log('object', object);
    const dataResponse = {
      data: object,
    };
    const response = await SocialLoginApi(dataResponse);
    console.log('responsefromsociallogin', response);
    if (response?.statusCode === 200) {
      ToastMessage(response?.message);
      props?.navigation?.navigate('Begin');
    } else {
      ToastMessage(response?.data?.message);
    }
  };

  const handleForgotPassword = async email => {
    const data = {
      email: email,
    };
    console.log('datafoing', data);
    const response = await forgotPassApi(data);
    console.log('responsefromreset', response);
    if (response?.statusCode === 200) {
      props.navigation.navigate('Verification', {email: email});
    } else {
      ToastMessage(response?.data?.message);
    }
  };

  return (
    <BaseView
      safeView={{backgroundColor: COLORS.white}}
      topView={{flex: 0, backgroundColor: COLORS.white}}
      baseViewStyle={{backgroundColor: COLORS.white, paddingHorizontal: 20}}>
      <View style={styles.mainView}>
        {/* <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <Back />
        </TouchableOpacity> */}
        <Welcome style={styles.welcomeImg} />
        <CustomTextInput
          placeholder={'Email'}
          //   label={'User Name'}
          inputContainerStyle={{marginTop: 30}}
          value={email}
          onChangeText={setEmail}
        />
        <CustomTextInput
          placeholder={'Password'}
          // label={'Email'}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.forgotView} onPress={openModal}>
          <Text style={styles.forgotText}>{i18n.t('login.forgot')}</Text>
        </TouchableOpacity>
        <CustomButton title={i18n.t('login.login')} onPress={handleLogin} />
        <View style={styles.alreadyView}>
          <Text style={styles.alreadyText}>{i18n.t('join.didnt')}</Text>
          <TouchableOpacity onPress={() => props.navigation.navigate('SignUp')}>
            <Text style={styles.alreadyText2}>{i18n.t('join.signup')}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.orView}>
          <View style={styles.lineView} />
          <Text style={styles.orText}>{i18n.t('join.or')}</Text>
          <View style={styles.lineView} />
        </View>
        <SocialLogin
          onLoginFailure={handleSocialFailure}
          onLoginSuccess={handleSocialSuccess}
        />
      </View>
      {modalVisible && (
        <ForgotPasswordModal
          visible={modalVisible}
          closeModal={closeModal}
          handleVerify={handleForgotPassword}
        />
      )}
      {loading && <Loader />}
    </BaseView>
  );
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    marginTop: 40,
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
  alreadyView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  alreadyText: {
    color: COLORS.black,
    fontSize: FONT_SIZES.sixteen,
    fontFamily: FONT_FAMILIES.semiBold,
    marginRight: 4,
    alignSelf: 'center',
  },
  alreadyText2: {
    color: COLORS.linear1,
    fontSize: FONT_SIZES.sixteen,
    fontFamily: FONT_FAMILIES.bold,
    marginRight: 4,
    // marginTop: 30,
    alignSelf: 'center',
  },
});

import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import BaseView from '../BaseView';
import i18n from '../../translation/i18n';
import Back from '../../assets/svgs/back.svg';
import {COLORS, FONT_FAMILIES, FONT_SIZES} from '../../utils/constants';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import CustomButton from '../../components/CustomButton';
import imagePath from '../../utils/imagePath';
import Loader from '../../components/Loader';
import {ToastMessage} from '../../components/ToastMessage';
import {saveToken, saveUserPrefs} from '../../utils/UserPrefs';
import {VARIABLES} from '../../utils/globalVariables';
import TextComponent from '../../components/TextComponent';
import {VerifyOtpApi, forgotPassApi} from '../../services/actions/AuthApi';

export default function Verification(props) {
  const [otp, setOtp] = useState('');
  const email = props.route?.params?.email;
  console.log('email', email);
  const [loading, setLoading] = useState(false);

  const checkRequiredFields = () => {
    if (otp == '') {
      ToastMessage(i18n.t('toastMessage.otp'));
      return false;
    } else return true;
  };

  const handleVerify = async () => {
    const isValid = checkRequiredFields();
    if (isValid) {
      setLoading(true);
      const data = {
        email: email,
        otp: otp,
      };
      console.log('otpgoing', otp);
      const response = await VerifyOtpApi(data);
      console.log('responseformotp', response);
      if (response?.statusCode === 200) {
        setLoading(false);
        props.navigation.replace('NewPassword', {email: email});
      } else {
        setLoading(false);
        ToastMessage(response?.data?.message);
      }
    }
  };

  const handleResendOtp = async () => {
    setLoading(true);
    const data = {
      email: email,
    };
    console.log('datagoinginresendotp', data);
    const response = await forgotPassApi(data);
    console.log('responseformresendotp', response);
    if (response?.statusCode === 200) {
      setLoading(false);
      ToastMessage('New otp has been sent to your email.');
    } else {
      setLoading(false);
      ToastMessage(response?.data?.message);
    }
  };

  return (
    <BaseView
      safeView={{backgroundColor: COLORS.white}}
      topView={{flex: 0, backgroundColor: COLORS.white}}
      baseViewStyle={{backgroundColor: COLORS.white, paddingHorizontal: 20}}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 30 : 30}
        style={styles.contentContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.mainView}>
            <TextComponent
              text={i18n.t('login.verification')}
              textStyle={styles.verificationText}
            />
            {/* <Text style={styles.verificationText}>
              {i18n.t('login.verification')}
            </Text> */}
            <Text style={styles.enterText}>{i18n.t('login.enter')}</Text>

            <OTPInputView
              style={styles.otpInput}
              pinCount={4}
              codeInputFieldStyle={styles.underlineStyleBase}
              selectionColor={COLORS.black}
              onCodeChanged={code => setOtp(code)}
              code={otp}
              keyboardType="number-pad"
              autoFocusOnLoad={false}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <CustomButton
        title={i18n.t('login.submit')}
        // onPress={() => props.navigation.navigate('Congratulations')}
        onPress={handleVerify}
      />
      <View style={styles.dontTextView}>
        <Text style={styles.dontText}>{i18n.t('login.didnt')}</Text>
        <TouchableOpacity onPress={handleResendOtp}>
          <Text style={styles.signText}>{i18n.t('login.resend')}</Text>
        </TouchableOpacity>
      </View>
      {loading && <Loader />}
    </BaseView>
  );
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    // paddingHorizontal: 20,
    paddingTop: 70,
  },
  verificationText: {
    color: COLORS.black,
    fontFamily: FONT_FAMILIES.bold,
    fontSize: FONT_SIZES.thirty,
    textAlign: 'center',
  },
  enterText: {
    color: COLORS.black,
    fontFamily: FONT_FAMILIES.light,
    fontSize: FONT_SIZES.sixteen,
    paddingHorizontal: 40,
    textAlign: 'center',
    marginTop: 15,
  },
  timeText: {
    color: COLORS.black,
    fontFamily: FONT_FAMILIES.medium,
    fontSize: FONT_SIZES.sixteen,
    textAlign: 'center',
    marginTop: 100,
  },

  underlineStyleBase: {
    height: 48,
    width: 48,
    borderWidth: 1.2,
    borderRadius: 4,
    borderColor: COLORS.linear2,
    color: COLORS.black,
    fontFamily: FONT_FAMILIES.medium,
    fontSize: FONT_SIZES.twentyFour,
  },
  otpInput: {
    marginTop: 34,
    flex: 1 / 4,
    marginHorizontal: 30,
    marginBottom: 20,
  },
  dontTextView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  dontText: {
    fontSize: FONT_SIZES.fourteen,
    color: COLORS.black,
    fontFamily: FONT_FAMILIES.light,
    lineHeight: 22,
  },
  signText: {
    fontSize: FONT_SIZES.fourteen,
    color: COLORS.black,
    fontFamily: FONT_FAMILIES.medium,
  },
  contentContainer: {
    flex: 1,
  },
});

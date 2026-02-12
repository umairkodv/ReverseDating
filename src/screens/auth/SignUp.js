import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import BaseView from '../BaseView';
import {COLORS, FONT_FAMILIES, FONT_SIZES} from '../../utils/constants';
import CustomTextInput from '../../components/CustomTextInput';
import CustomButton from '../../components/CustomButton';
import i18n from '../../translation/i18n';
import imagePath from '../../utils/imagePath';
import {ToastMessage} from '../../components/ToastMessage';
import {SignupApi, SocialLoginApi} from '../../services/actions/AuthApi';
import Loader from '../../components/Loader';
import SocialLogin from '../../components/SocialLogin';
import CountryPicker from 'react-native-country-picker-modal';

export default function SignUp(props) {
  const [name, setName] = useState('');
  const [country, setCountry] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [countryPickerVisible, setCountryPickerVisible] = useState(false);
  const [phone, setPhone] = useState('');

  const checkRequiredFields = () => {
    const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (name.trim() == '') {
      ToastMessage(i18n.t('toastMessage.name'));
      return false;
    } else if (!emailPattern.test(email.trim())) {
      ToastMessage(i18n.t('toastMessage.emailPattern'));
      return false;
    } else if (password.trim().length < 8) {
      ToastMessage(i18n.t('toastMessage.passwordLength'));
      return false;
    } else {
      return true;
    }
  };

  const handleSignUp = async () => {
    const isValid = checkRequiredFields();
    if (isValid) {
      setLoading(true);
      const data = {
        name: name,
        email: email,
        password: password,
      };
      console.log('data:', data);
      const response = await SignupApi(data);
      console.log('response from signup', response);
      if (response?.statusCode === 201) {
        setLoading(false);
        ToastMessage(response?.message);
        props?.navigation?.navigate('Begin');
      } else {
        setLoading(false);
        ToastMessage(response?.data?.message);
      }
    }
  };

  const onSelect = country => {
    setCountry(country);
    setCountryPickerVisible(false);
  };

  const handleSocialFailure = result => {};

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

  return (
    <BaseView
      safeView={{backgroundColor: COLORS.white}}
      topView={{flex: 0, backgroundColor: COLORS.white}}
      baseViewStyle={{backgroundColor: COLORS.white, paddingHorizontal: 20}}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 10}
        style={styles.contentContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.mainView}>
            <Image source={imagePath.join} style={styles.joinText} />
            <CustomTextInput
              placeholder={'Name'}
              inputContainerStyle={{marginTop: 30}}
              value={name}
              onChangeText={setName}
              autoFocus={true}
            />
            <CustomTextInput
              placeholder={'Email'}
              value={email}
              onChangeText={setEmail}
            />
            <View style={styles.textInputView3}>
              <TouchableOpacity onPress={() => setCountryPickerVisible(true)}>
                {country !== null ? (
                  <Text style={styles.callingText}>
                    {'+' + country?.callingCode}
                  </Text>
                ) : (
                  <Text style={styles.callingText}>{'+1'}</Text>
                )}
              </TouchableOpacity>
              <View style={styles.line2} />
              <TextInput
                style={styles.inputText3}
                keyboardType="numeric"
                placeholder={i18n.t('question.phone')}
                placeholderTextColor={COLORS.textGray}
                value={phone}
                onChangeText={text => setPhone(text)} // Bind phone state
              />
            </View>
            <CustomTextInput
              placeholder={'Create Password'}
              value={password}
              onChangeText={setPassword}
            />
            <CustomButton
              title={i18n.t('join.signup')}
              style={{marginTop: 10}}
              // onPress={() => props.navigation.navigate('Begin')}
              onPress={handleSignUp}
            />
            <Text style={styles.byText}>{i18n.t('join.by')}</Text>
            <View style={styles.alreadyView}>
              <Text style={styles.alreadyText}>{i18n.t('join.have')}</Text>
              <TouchableOpacity
                onPress={() => props.navigation.navigate('Login')}>
                <Text style={styles.alreadyText2}>{i18n.t('join.login')}</Text>
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
        </ScrollView>
      </KeyboardAvoidingView>
      <View style={styles.countryPicker}>
        <CountryPicker
          countryCode={country ? country.cca2 : 'US'}
          withFilter
          withCallingCode
          withEmoji
          withFlag
          visible={countryPickerVisible}
          onSelect={onSelect}
          onClose={() => setCountryPickerVisible(false)}
        />
      </View>
      {loading && <Loader />}
    </BaseView>
  );
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    marginTop: 60,
  },
  joinText: {
    alignSelf: 'center',
    resizeMode: 'contain',
    width: '100%',
  },
  byText: {
    color: COLORS.textGray,
    fontSize: FONT_SIZES.fourteen,
    fontFamily: FONT_FAMILIES.regular,
    marginTop: 20,
  },
  haveText: {
    color: COLORS.textGray,
    fontSize: FONT_SIZES.fourteen,
    fontFamily: FONT_FAMILIES.regular,
    marginTop: 20,
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
  orView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 22,
    marginTop: 20,
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
  contentContainer: {
    flex: 1,
  },
  countryPicker: {
    position: 'absolute',
    top: -90,
  },

  textInputView3: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.lightGray,
    marginBottom: 20,
    paddingHorizontal: 20,
    gap: 10,
    borderRadius: 12,
    borderColor: COLORS.primary,
    borderWidth: 1,
    alignItems: 'center',
  },
  callingText: {
    fontSize: FONT_SIZES.fourteen,
    fontFamily: FONT_FAMILIES.regular,
    color: COLORS.textGray,
    // marginLeft: ,
    marginRight: 6,
  },
  line2: {
    borderRightWidth: 1,
    borderRightColor: COLORS.textGray,
    height: 28,
    marginVertical: -8,
  },
  inputText3: {
    color: COLORS.black,
    fontSize: FONT_SIZES.fourteen,
    fontFamily: FONT_FAMILIES.light,
    // backgroundColor: 'red',
    flex: 1,
  },
});

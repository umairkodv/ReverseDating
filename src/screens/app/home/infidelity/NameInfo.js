import {useState} from 'react';
import BaseView from '../../../BaseView';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  ScrollView,
  Platform,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import CountryPicker from 'react-native-country-picker-modal';
import CustomTextInput from '../../../../components/CustomTextInput';
import CustomButton from '../../../../components/CustomButton';
import {COLORS, FONT_FAMILIES, FONT_SIZES} from '../../../../utils/constants';
import i18n from '../../../../translation/i18n';
import Back from '../../../../assets/svgs/back.svg';
import {ToastMessage} from '../../../../components/ToastMessage';

export default function NameInfo(props) {
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState(null);
  const [name, setName] = useState(null);

  const [countryPickerVisible, setCountryPickerVisible] = useState(false);
  const [phone, setPhone] = useState('');
  const location = props?.route?.params?.location;
  const description = props?.route?.params?.description;
  const socialMedia = props?.route?.params?.socialMedia;
  const cheaterName = props?.route?.params?.cheaterName;
  const incidentDate = props?.route?.params?.incidentDate;
  const incidentTime = props?.route?.params?.incidentTime;
  const callingCode = props?.route?.params?.callingCode;
  const contactEmail = props?.route?.params?.contactEmail;
  const contactNumber = props?.route?.params?.contactNumber;

  const handleNext = () => {
    const isValidEmail =
      email === '' || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isValidPhone = phone === '' || /^\d{10,15}$/.test(phone);

    if (!isValidEmail) {
      ToastMessage('Please enter a valid email address.');
      return;
    }

    if (!isValidPhone) {
      ToastMessage('Please enter a valid phone number.');
      return;
    }

    props.navigation.navigate('UploadEvidence', {
      incidentDate,
      incidentTime,
      cheaterName,
      location,
      description,
      contactNumber,
      contactEmail,
      socialMedia,
      callingCode,
      victimName: name,
      victimEmail: email,
      victimCallingCode:
        country !== null ? country?.callingCode.toString() : '1',
      victimContactNumber: phone,
    });
  };

  const onSelect = country => {
    setCountry(country);
    setCountryPickerVisible(false);
  };

  return (
    <BaseView
      safeView={{backgroundColor: COLORS.white}}
      topView={{flex: 0, backgroundColor: COLORS.white}}
      baseViewStyle={{
        backgroundColor: COLORS.white,
        paddingHorizontal: 20,
      }}>
      <TouchableOpacity
        onPress={() => props.navigation.goBack()}
        style={{marginTop: 20}}>
        <Back />
      </TouchableOpacity>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 40}
        style={styles.contentContainer}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scroll}>
          <View style={styles.mainView}>
            <Text style={styles.basicText}>{i18n.t('infidelity.nameand')}</Text>
            <Text style={styles.pleaseText}>{i18n.t('infidelity.share')}</Text>

            <CustomTextInput
              placeholder={i18n.t('infidelity.person')}
              inputContainerStyle={{marginTop: 20, marginBottom: 10}}
              value={name}
              onChangeText={setName}
            />
            <CustomTextInput
              placeholder={i18n.t('infidelity.emailPerson')}
              inputContainerStyle={{marginTop: 16}}
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
                onChangeText={text => setPhone(text)}
              />
            </View>

            <CustomButton
              title={i18n.t('infidelity.continue')}
              style={{marginTop: 30}}
              onPress={handleNext}
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
    </BaseView>
  );
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    marginTop: 70,
  },
  box: {
    height: 12,
    marginTop: 40,
    borderColor: COLORS.primary,
    borderWidth: 1,
    borderRadius: 7,
  },
  joinText: {
    alignSelf: 'center',
    resizeMode: 'contain',
    width: '100%',
    marginTop: 50,
  },
  basicText: {
    color: COLORS.black,
    fontSize: FONT_SIZES.eighteen,
    fontFamily: FONT_FAMILIES.bold,
    marginTop: 50,
  },
  basicText2: {
    color: COLORS.black,
    fontSize: FONT_SIZES.twelve,
    fontFamily: FONT_FAMILIES.regular,
  },
  skip: {
    color: COLORS.black,
    fontSize: FONT_SIZES.sixteen,
    fontFamily: FONT_FAMILIES.bold,
    textDecorationLine: 'underline',
    textAlign: 'right',
    marginTop: 14,
  },
  ongoingView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  ongoingText: {
    color: COLORS.black,
    fontSize: FONT_SIZES.fourteen,
    fontFamily: FONT_FAMILIES.bold,
  },

  contentContainer: {
    flex: 1,
  },
  textinputStyle: {
    color: COLORS.textGray,
    fontSize: FONT_SIZES.sixteen,
    fontFamily: FONT_FAMILIES.regular,
    padding: 0,
    flex: 1,
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
    // marginTop: 10,
  },
  callingText: {
    fontSize: FONT_SIZES.fourteen,
    fontFamily: FONT_FAMILIES.regular,
    color: COLORS.textGray,
    // marginLeft: ,
    marginRight: 6,
  },
  countryPicker: {
    position: 'absolute',
    top: -90,
  },

  ifText: {
    color: COLORS.black,
    fontSize: FONT_SIZES.twelve,
    fontFamily: FONT_FAMILIES.regular,
  },
  boxStyle: {
    height: 56,
    backgroundColor: COLORS.lightGray,
    borderRadius: 12,
    marginBottom: 5,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    borderColor: COLORS.primary,
    borderWidth: 1,
    alignItems: 'center',
    // marginTop: 22,
  },
  dropdownStyles: {
    backgroundColor: COLORS.lightGray,
    borderRadius: 12,
    borderColor: COLORS.primary,
    borderWidth: 1,
  },
  dropdownText: {
    color: COLORS.textGray,
    fontSize: FONT_SIZES.sixteen,
    fontFamily: FONT_FAMILIES.regular,
  },
  scroll: {
    paddingBottom: 50,
  },
  pleaseText: {
    color: COLORS.black,
    fontSize: FONT_SIZES.fourteen,
    fontFamily: FONT_FAMILIES.medium,
    textAlign: 'center',
    marginTop: 4,
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

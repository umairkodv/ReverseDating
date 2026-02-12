import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import BaseView from '../BaseView';
import {COLORS, FONT_FAMILIES, FONT_SIZES} from '../../utils/constants';
import Back from '../../assets/svgs/back.svg';
import Text3 from '../../assets/svgs/text3.svg';
import CountryPicker, {
  getAllCountries,
} from 'react-native-country-picker-modal';
import i18n from '../../translation/i18n';
import CustomTextInput from '../../components/CustomTextInput';
import CustomButton from '../../components/CustomButton';
import ProgressBar from '../../components/ProgressBar';
import ContactModal from '../modals/ContactModal';
import imagePath from '../../utils/imagePath';
import {ToastMessage} from '../../components/ToastMessage';

export default function Contact(props) {
  const [countryPickerVisible, setCountryPickerVisible] = useState(false);
  const [country, setCountry] = useState(null);
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const partnerName = props?.route?.params?.partnerName;
  const datingAppName = props.route?.params?.datingAppName;
  const meetingSource = props.route?.params?.meetingSource;
  const meetingDescription = props.route?.params?.meetingDescription;
  const relationshipStartDate = props.route?.params?.relationshipStartDate;
  const relationshipEndDate = props.route?.params?.relationshipEndDate;
  const relationshipOngoingStatus =
    props.route?.params?.relationshipOngoingStatus;
  const relationshipStatus = props.route?.params?.relationshipStatus;

  console.log(
    'callingCode',
    country !== null ? country?.callingCode.toString() : '1',
  );
  console.log(
    partnerName,
    datingAppName,
    meetingDescription,
    meetingSource,
    relationshipStartDate,
    relationshipEndDate,
    relationshipOngoingStatus,
    relationshipStatus,
  );

  const onSelect = country => {
    setCountry(country);
    setCountryPickerVisible(false);
  };
  const [modalVisible, setModalVisible] = useState(false);
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    if (!toggle) {
      openModal();
    }
  }, []);

  const openModal = () => {
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
    setToggle(true);
  };

  const handleToggle = () => {
    setToggle(true);
    closeModal();
  };

  const checkRequiredFields = () => {
    const phonePattern = /^(?!0+$)[0-9]{6,15}$/;
    const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    const trimmedEmail = email.trim();
    const trimmedPhone = phone.trim();

    if (!trimmedEmail && !trimmedPhone) {
      ToastMessage('Please enter atleast one field.');
      return false;
    }
    if (trimmedEmail && !emailPattern.test(trimmedEmail)) {
      ToastMessage(i18n.t('toastMessage.emailPattern'));
      return false;
    }
    if (trimmedPhone && !phonePattern.test(trimmedPhone)) {
      ToastMessage(i18n.t('toastMessage.phonePattern'));
      return false;
    }
    return true;
  };

  const handleNext = () => {
    const isValid = checkRequiredFields();
    if (isValid) {
      props.navigation.navigate('Social', {
        partnerName,
        datingAppName,
        meetingDescription,
        meetingSource,
        relationshipStartDate,
        relationshipEndDate,
        relationshipOngoingStatus,
        relationshipStatus,
        contactNumber: phone,
        contactEmail: email,
        callingCode: country !== null ? country?.callingCode.toString() : '1',
      });
    }
  };

  return (
    <BaseView
      safeView={{backgroundColor: COLORS.white}}
      topView={{flex: 0, backgroundColor: COLORS.white}}
      baseViewStyle={{
        backgroundColor: COLORS.white,
        paddingHorizontal: 20,
      }}>
      <View style={styles.mainView}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 40}
          style={styles.contentContainer}>
          <ScrollView
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}>
            <TouchableOpacity onPress={() => props.navigation.goBack()}>
              <Back />
            </TouchableOpacity>
            <ProgressBar progress={75} />
            <Image source={imagePath.addd} style={styles.joinText} />

            <Text style={styles.basicText}>{i18n.t('question.contact')}</Text>
            <CustomTextInput
              placeholder={i18n.t('question.email')}
              inputContainerStyle={{marginTop: 20}}
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
                value={phone}
                placeholderTextColor={COLORS.textGray}
                onChangeText={text => setPhone(text)}
              />
            </View>
            <CustomButton
              title={i18n.t('question.next')}
              style={{marginTop: 30}}
              // onPress={() => props.navigation.navigate('Social')}
              onPress={handleNext}
            />
            <TouchableOpacity
              style={styles.skipView}
              onPress={() =>
                props.navigation.navigate('Social', {
                  partnerName,
                  datingAppName,
                  meetingDescription,
                  meetingSource,
                  relationshipStartDate,
                  relationshipEndDate,
                  relationshipOngoingStatus,
                  relationshipStatus,
                  contactNumber: '',
                  contactEmail: '',
                  callingCode: '',
                })
              }>
              <Text style={styles.skip}>{i18n.t('question.skip')}</Text>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
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
      <ContactModal
        visible={modalVisible}
        closeModal={closeModal}
        handleToggle={handleToggle}
      />
    </BaseView>
  );
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    marginTop: 20,
  },
  box: {
    height: 12,
    marginTop: 40,
    borderColor: COLORS.primary,
    borderWidth: 1,
    borderRadius: 7,
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

    marginBottom: 16,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    gap: 10,
    // flex: 1,

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
  inputText3: {
    color: COLORS.black,
    fontSize: FONT_SIZES.fourteen,
    fontFamily: FONT_FAMILIES.light,
    // backgroundColor: 'red',
    flex: 1,
  },
  line2: {
    borderRightWidth: 1,
    borderRightColor: COLORS.textGray,
    height: 28,
    marginVertical: -8,
  },
  joinText: {
    alignSelf: 'center',
    resizeMode: 'contain',
    width: '100%',
    marginTop: 50,
  },
  skipView: {
    alignSelf: 'flex-end',

    marginTop: 14,
  },
});

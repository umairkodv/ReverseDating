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
import Untick from '../../../../assets/svgs/Guntick.svg';
import Tick from '../../../../assets/svgs/Gtick.svg';
import i18n from '../../../../translation/i18n';
import Back from '../../../../assets/svgs/back.svg';
import {SelectList} from 'react-native-dropdown-select-list';
import Drop from '../../../../assets/svgs/drop.svg';
import Insta from '../../../../assets/svgs/insta.svg';
import Fb from '../../../../assets/svgs/fb.svg';
import Discord from '../../../../assets/svgs/discord.svg';
import Twitter from '../../../../assets/svgs/twitter.svg';
import {ToastMessage} from '../../../../components/ToastMessage';

export default function Email(props) {
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState(null);
  const [handle, setHandle] = useState(null);
  const [social, setSocial] = useState('');
  const [countryPickerVisible, setCountryPickerVisible] = useState(false);
  const [phone, setPhone] = useState('');
  const location = props?.route?.params?.location;
  const description = props?.route?.params?.description;
  const cheaterName = props?.route?.params?.cheaterName;
  const incidentDate = props?.route?.params?.incidentDate;
  const incidentTime = props?.route?.params?.incidentTime;
  const [selectedSocial, setSelectedSocial] = useState([]);
  const [describe, setDescribe] = useState('');
  const [showDropDown, setShowDropDown] = useState(false);
  const [handleNames, setHandleNames] = useState([]);

  const toggleDropDown = () => {
    setShowDropDown(!showDropDown);
  };
  const handleSelection = item => {
    if (selectedSocial?.includes(item)) {
      setSelectedSocial(prev => prev.filter(i => i !== item));
    } else {
      setSelectedSocial(prev => [...prev, item]);
      setShowDropDown(!showDropDown);
    }
  };

  const data = ['Instagram', 'Facebook', 'Twitter', 'Discord'];
  const icons = [
    {name: 'Instagram', image: <Insta />},
    {name: 'Facebook', image: <Fb />},
    {name: 'Twitter', image: <Twitter />},
    {name: 'Discord', image: <Discord />},
  ];

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

    props.navigation.navigate('NameInfo', {
      incidentDate,
      incidentTime,
      cheaterName,
      location,
      description,
      contactNumber: phone,
      contactEmail: email,
      socialMedia: handleNames,
      callingCode: country !== null ? country?.callingCode.toString() : '1',
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
            <Text style={styles.basicText}>
              {i18n.t('infidelity.email')}
              <Text style={styles.ifText}>{i18n.t('infidelity.if')}</Text>
            </Text>
            <Text style={styles.pleaseText}>{i18n.t('infidelity.share2')}</Text>
            <CustomTextInput
              placeholder={i18n.t('infidelity.mail')}
              inputContainerStyle={{marginTop: 20, marginBottom: 10}}
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
            <TouchableOpacity onPress={toggleDropDown} style={styles.social}>
              <Text style={styles.socialText} numberOfLines={1}>
                {selectedSocial.length > 0
                  ? selectedSocial.join(', ')
                  : 'Social Media'}
              </Text>
              <Drop />
            </TouchableOpacity>
            {showDropDown && (
              <View style={styles.container}>
                {data?.map(item => (
                  <TouchableOpacity
                    style={styles.singleItem}
                    activeOpacity={0.8}
                    onPress={() => handleSelection(item)}>
                    <Text
                      style={
                        selectedSocial.includes(item)
                          ? styles.mediaSText
                          : styles.mediaText
                      }>
                      {item}
                    </Text>
                    {selectedSocial.includes(item) ? <Tick /> : <Untick />}
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {selectedSocial?.map(item => {
              const image = icons?.find(i => i?.name == item);
              console.log('image', image);
              return (
                <View style={styles.textInputView}>
                  {image?.image}
                  <TextInput
                    placeholder="Enter the handle name"
                    placeholderTextColor={COLORS.textGray}
                    style={styles.inputStyle}
                    value={handleNames[item] || ''}
                    onChangeText={text =>
                      setHandleNames(prev => ({
                        ...prev,
                        [item]: text,
                      }))
                    }
                  />
                </View>
              );
            })}

            <CustomButton
              title={i18n.t('infidelity.next')}
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
    marginTop: 60,
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
    marginTop: 10,
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
  container: {
    backgroundColor: COLORS.lightGray,
    // height: 180,
    borderRadius: 12,
    borderRadius: 12,
    borderColor: COLORS.primary,
    borderWidth: 1,
    marginTop: 10,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  singleItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  mediaText: {
    color: COLORS.textGray,
    fontSize: FONT_SIZES.sixteen,
    fontFamily: FONT_FAMILIES.regular,
    marginBottom: 16,
  },
  mediaSText: {
    color: COLORS.textGray,
    fontSize: FONT_SIZES.sixteen,
    fontFamily: FONT_FAMILIES.semiBold,
    marginBottom: 16,
  },
  social: {
    height: 56,
    backgroundColor: COLORS.lightGray,
    borderRadius: 12,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    borderColor: COLORS.primary,
    borderWidth: 1,
    // marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  socialText: {
    color: COLORS.textGray,
    fontSize: FONT_SIZES.sixteen,
    fontFamily: FONT_FAMILIES.regular,
    flex: 1,
  },
  textInputView: {
    height: 56,
    backgroundColor: COLORS.lightGray,
    borderRadius: 12,
    paddingHorizontal: 20,
    borderColor: COLORS.primary,
    borderWidth: 1,
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  inputText3: {
    color: COLORS.black,
    fontSize: FONT_SIZES.fourteen,
    fontFamily: FONT_FAMILIES.light,
    // backgroundColor: 'red',
    flex: 1,
  },
});

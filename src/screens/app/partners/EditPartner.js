import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import BaseView from '../../BaseView';
import {
  COLORS,
  FONT_FAMILIES,
  FONT_SIZES,
  selectMeet,
  selectSocial,
} from '../../../utils/constants';
import Back from '../../../assets/svgs/back.svg';
import i18n from '../../../translation/i18n';
import CustomTextInput from '../../../components/CustomTextInput';
import CustomTextInputWImage from '../../../components/CustomTextInputWImage';
import CountryPicker from 'react-native-country-picker-modal';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import ImagePicker from 'react-native-image-crop-picker';
import Datee from '../../../assets/svgs/date.svg';
import Untick from '../../../assets/svgs/untick.svg';
import Tick from '../../../assets/svgs/tick.svg';
import Drop from '../../../assets/svgs/drop.svg';
import moment from 'moment';
import {SelectList} from 'react-native-dropdown-select-list';
import Insta from '../../../assets/svgs/insta.svg';
import Fb from '../../../assets/svgs/fb.svg';
import Discord from '../../../assets/svgs/discord.svg';
import Twitter from '../../../assets/svgs/twitter.svg';
import CustomButton from '../../../components/CustomButton';
import Plus from '../../../assets/svgs/plus.svg';
import {EditPartnerApi} from '../../../services/actions/AppApi';
import {VARIABLES} from '../../../utils/globalVariables';
import imagePath from '../../../utils/imagePath';
import {ToastMessage} from '../../../components/ToastMessage';
import Loader from '../../../components/Loader';

export default function EditPartner(props) {
  const userData = JSON.parse(VARIABLES.details);
  console.log('userdata', userData);
  const mainData = props?.route?.params?.data;
  console.log('maindata', mainData);
  const [loading, setLoading] = useState(false);
  const base64Images = mainData?.partnerImages?.map(image => ({
    path: `data:image/png;base64,${image}`,
  }));

  const [name, setName] = useState(mainData?.partnerName);
  const [datingAppName, setDatingAppName] = useState(mainData?.datingAppName);
  const [toggle, setToggle] = useState(
    mainData?.relationshipOngoingStatus || false,
  );

  const [countryPickerVisible, setCountryPickerVisible] = useState(false);
  const [country, setCountry] = useState(null);
  const [images, setImages] = useState(base64Images);
  const [base64, setBase64] = useState(mainData?.partnerImages);
  const [selectedStart, setSelectedStart] = useState(
    moment(mainData?.relationshipStartDate).format('DD/MM/YYYY'),
  );
  const [phone, setPhone] = useState(mainData?.contactNumber);
  const [selectedEnd, setSelectedEnd] = useState(
    moment(mainData?.relationshipEndDate).format('DD/MM/YYYY'),
  );
  const [meet, setMeet] = useState(mainData?.meetingSource);
  const [describe, setDescribe] = useState('');
  const [social, setSocial] = useState('');
  const [email, setEmail] = useState(mainData?.contactEmail);
  const [calendarModalVisible, setCalendarModalVisible] = useState(false);
  const [calendarEndModalVisible, setCalendarEndModalVisible] = useState(false);
  const [selectedSocial, setSelectedSocial] = useState(() => {
    return mainData?.socialMediaHandle
      ? Object.keys(mainData.socialMediaHandle)
      : [];
  });

  const [showDropDown, setShowDropDown] = useState(false);
  const [handleNames, setHandleNames] = useState([]);

  const toggleDropDown = () => {
    setShowDropDown(!showDropDown);
  };

  const data = ['Instagram', 'Facebook', 'Twitter', 'Discord'];
  const icons = [
    {name: 'Instagram', image: <Insta />},
    {name: 'Facebook', image: <Fb />},
    {name: 'Twitter', image: <Twitter />},
    {name: 'Discord', image: <Discord />},
  ];

  const handleSelection = item => {
    if (selectedSocial?.includes(item)) {
      setSelectedSocial(prev => prev.filter(i => i !== item));
    } else {
      setSelectedSocial(prev => [...prev, item]);
      setShowDropDown(!showDropDown);
    }
  };
  const handleToggle = () => {
    setToggle(!toggle);
    setSelectedEnd('');
  };
  const onSelect = country => {
    setCountry(country);
    setCountryPickerVisible(false);
  };
  const openCalendarModal = () => {
    console.log('clicked');
    setCalendarModalVisible(true);
  };
  const closeCalendarModal = () => {
    setCalendarModalVisible(false);
  };
  const openCalendarEndModal = () => {
    console.log('clicked');
    setCalendarEndModalVisible(true);
  };
  const closeCalendarEndModal = () => {
    setCalendarEndModalVisible(false);
  };
  const handleStartDate = selectedDate => {
    setSelectedStart(selectedDate);
    closeCalendarModal();
  };
  const handleEndDate = selectedDate => {
    setSelectedEnd(selectedDate);
    closeCalendarEndModal();
  };

  const handleImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      multiple: true,
      includeBase64: true,
    }).then(imagesArray => {
      console.log(imagesArray);
      setImages(prev => [...prev, ...imagesArray]);
      setBase64(prev => [...prev, ...imagesArray.map(image => image?.data)]);
    });
  };

  const removeAdditionalImage = item => {
    setImages(prev => prev.filter((_, i) => i !== item));
  };
  console.log('startdate', selectedStart);
  const handleSaveChanges = async () => {
    setLoading(true);
    const data = {
      partnerName: name,
      datingAppName: datingAppName,
      meetingDescription: meet,
      relationshipStatus: social,
      callingCode:
        country === null
          ? mainData?.callingCode
          : country?.callingCode.toString(),
      contactNumber: phone,
      contactEmail: email,
      socialMediaPlatform: '',
      socialMediaHandle: '',
      relationshipStartDate: moment(selectedStart, 'DD/MM/YYYY').format(
        'YYYY/MM/DD',
      ),
      relationshipOngoingStatus: toggle,
      relationshipEndDate: toggle
        ? ''
        : moment(selectedEnd, 'DD/MM/YYYY').format('YYYY/MM/DD'),
      partnerImages: base64,
    };
    console.log('datafromedit', data);
    const response = await EditPartnerApi(userData?._id, mainData?._id, data);
    console.log('responsefromeditpartnerapi', response);
    if (response?.statusCode === 200) {
      setLoading(false);
      props?.navigation?.goBack();
    } else {
      setLoading(false);
      ToastMessage(response?.data?.message);
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
      <View style={styles.settingView}>
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <Back />
        </TouchableOpacity>
        <Text style={styles.settingText}>{i18n.t('edit.edit')}</Text>
        <View style={styles.blankView} />
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 40}
        style={styles.contentContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.mainView}>
            <CustomTextInput
              label={'Name'}
              placeholder={'Full Name'}
              value={name}
              inputContainerStyle={{marginBottom: 18}}
              onChangeText={setName}
            />
            <CustomTextInput
              label={'Name Used on Dating App'}
              placeholder={'Name'}
              value={datingAppName}
              inputContainerStyle={{marginBottom: 18}}
              onChangeText={setDatingAppName}
            />
            <Text style={styles.labelButton}>Dating Period</Text>
            <View style={styles.datingView}>
              <CustomTextInputWImage
                placeholder={'Select Start date'}
                inputContainerStyle={{flex: 1, marginBottom: 0}}
                leftImageVisible
                imageLeft={<Datee />}
                onPressLeft={openCalendarModal}
                editable={false}
                value={
                  selectedStart == ''
                    ? ''
                    : moment(selectedStart, 'YYYY-MM-DD').format('DD/MM/YYYY')
                }
                onChangeText={setSelectedStart}
              />
              {!toggle && (
                <CustomTextInputWImage
                  placeholder={'Select End date'}
                  leftImageVisible
                  inputContainerStyle={{flex: 1, marginBottom: 0}}
                  imageLeft={<Datee />}
                  editable={false}
                  onPressLeft={openCalendarEndModal}
                  value={
                    selectedEnd == ''
                      ? ''
                      : moment(selectedEnd, 'YYYY-MM-DD').format('DD/MM/YYYY')
                  }
                  onChangeText={setSelectedEnd}
                />
              )}
            </View>
            <View style={styles.ongoingView}>
              <TouchableOpacity onPress={handleToggle}>
                {toggle ? <Tick /> : <Untick />}
              </TouchableOpacity>
              <Text style={styles.ongoingText}>
                {i18n.t('question.ongoing')}
              </Text>
            </View>
            <Text style={styles.labelButton}>Relationship Status</Text>

            <SelectList
              boxStyles={styles.boxStyle}
              setSelected={val => setSocial(val)}
              data={selectSocial}
              save="value"
              search={false}
              maxHeight={250}
              inputStyles={{
                ...styles.inputStyle,
                color:
                  mainData?.relationshipStatus == '' && social == ''
                    ? COLORS.textGray
                    : COLORS.black,
              }}
              placeholder={
                mainData?.relationshipStatus != ''
                  ? mainData?.relationshipStatus
                  : i18n.t('question.status')
              }
              dropdownTextStyles={styles.dropdownText}
              dropdownStyles={styles.dropdownStyles}
              arrowicon={<Drop />}
            />
            <Text style={styles.labelButton}>How did you meet?</Text>

            <SelectList
              boxStyles={styles.boxStyle}
              setSelected={val => setMeet(val)}
              data={selectMeet}
              save="value"
              search={false}
              maxHeight={250}
              inputStyles={{
                ...styles.inputStyle,
                color:
                  mainData?.meetingSource === ''
                    ? COLORS.textGray
                    : COLORS.black,
              }}
              placeholder={
                mainData?.meetingSource !== ''
                  ? mainData?.meetingSource
                  : i18n.t('question.how')
              }
              dropdownTextStyles={styles.dropdownText}
              dropdownStyles={styles.dropdownStyles}
              arrowicon={<Drop />}
            />
            {(meet === 'Met in real life' || meet === 'Other') && (
              <CustomTextInput
                placeholder={i18n.t('question.tell')}
                inputContainerStyle={
                  Platform.OS === 'ios'
                    ? styles.inputStyleDescribe
                    : styles.inputStyleDescribe2
                }
                inputStyle={styles.textinputStyle}
                multiline
                textAlignVertical="top"
                value={describe}
                onChangeText={setDescribe}
              />
            )}
            <Text style={styles.labelButton}>Email</Text>

            <CustomTextInput
              placeholder={i18n.t('question.email')}
              value={email}
              onChangeText={setEmail}
              inputContainerStyle={{marginBottom: 18}}
            />
            <Text style={styles.labelButton}>Phone Number</Text>

            <View style={styles.textInputView3}>
              <TouchableOpacity onPress={() => setCountryPickerVisible(true)}>
                {country === null ? (
                  <Text style={styles.callingText}>
                    {'+' + mainData?.callingCode}
                  </Text>
                ) : (
                  <Text style={styles.callingText}>
                    {'+' + country?.callingCode}
                  </Text>
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
            <Text style={styles.labelButton}>Social Media</Text>
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
            <View style={{marginBottom: 30, marginTop: 18}}>
              <Text style={styles.labelButton}>Uploaded Images</Text>

              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                  paddingVertical: 20,
                }}>
                <TouchableOpacity style={styles.imgView} onPress={handleImage}>
                  <Plus style={styles.plus} />
                </TouchableOpacity>
                {images?.map((image, index) => {
                  return (
                    <View key={index} style={styles.additionalImageContainer}>
                      <Image
                        key={index}
                        style={styles.additionalImage}
                        source={{uri: image?.path}}
                      />

                      <TouchableOpacity
                        style={styles.removeImageIcon}
                        onPress={() => removeAdditionalImage(index)}>
                        <Image
                          style={{width: 20, height: 20}}
                          source={imagePath.delete}
                        />
                      </TouchableOpacity>
                    </View>
                  );
                })}
              </ScrollView>
            </View>
            <CustomButton title={'Save Changes'} onPress={handleSaveChanges} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <DateTimePickerModal
        isVisible={calendarModalVisible}
        display="spinner"
        mode="date"
        onConfirm={handleStartDate}
        onCancel={closeCalendarModal}
        maximumDate={new Date()}
      />
      <DateTimePickerModal
        isVisible={calendarEndModalVisible}
        display="spinner"
        mode="date"
        onConfirm={handleEndDate}
        onCancel={closeCalendarEndModal}
        maximumDate={new Date()}
      />
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
    marginTop: 10,
  },
  settingView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  settingText: {
    color: COLORS.black,
    fontSize: FONT_SIZES.twentyFour,
    fontFamily: FONT_FAMILIES.bold,
  },
  datingView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    marginBottom: 10,
  },
  labelButton: {
    fontSize: FONT_SIZES.sixteen,
    fontFamily: FONT_FAMILIES.semiBold,
    color: COLORS.black,
    marginBottom: 8,
  },
  ongoingView: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
  },
  ongoingText: {},
  boxStyle: {
    height: 56,
    backgroundColor: COLORS.lightGray,
    borderRadius: 12,
    marginBottom: 18,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    borderColor: COLORS.primary,
    borderWidth: 1,
    alignItems: 'center',
  },
  dropdownStyles: {
    backgroundColor: COLORS.lightGray,
    borderRadius: 12,
    borderColor: COLORS.primary,
    borderWidth: 1,
    marginBottom: 18,
  },
  dropdownText: {
    color: COLORS.textGray,
    fontSize: FONT_SIZES.sixteen,
    fontFamily: FONT_FAMILIES.regular,
  },
  ongoingText: {
    color: COLORS.black,
    fontSize: FONT_SIZES.fourteen,
    fontFamily: FONT_FAMILIES.bold,
  },
  contentContainer: {
    flex: 1,
  },
  inputStyleDescribe: {
    height: 141,
    backgroundColor: COLORS.lightGray,
    borderRadius: 12,
    marginBottom: 16,
    paddingHorizontal: 20,
    justifyContent: 'center',
    paddingVertical: 10,
  },
  inputStyleDescribe2: {
    height: 141,
    backgroundColor: COLORS.lightGray,
    borderRadius: 12,
    marginBottom: 16,
    paddingHorizontal: 20,
    justifyContent: 'center',
    paddingTop: 10,
  },
  textinputStyle: {
    color: COLORS.black,
    fontSize: FONT_SIZES.sixteen,
    fontFamily: FONT_FAMILIES.regular,
    padding: 0,
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
    marginBottom: 18,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
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
    marginRight: 6,
  },
  inputText3: {
    color: COLORS.black,
    fontSize: FONT_SIZES.fourteen,
    fontFamily: FONT_FAMILIES.light,

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
  image: {
    overflow: 'hidden',
    height: 230,
    width: 200,
    borderRadius: 20,
    marginRight: 14,
    marginTop: 10,
  },
  imgView: {
    backgroundColor: COLORS.imgGray,
    height: 130,
    width: 120,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderStyle: 'dashed',
    // marginTop: 20,
    marginEnd: 12,
  },
  plus: {
    position: 'absolute',
    right: -10,
    bottom: -5,
  },
  additionalImage: {
    height: 130,
    width: 120,
    borderRadius: 6,
  },
  removeImageIcon: {
    position: 'absolute',
    right: 0,
    width: 14,
    height: 14,
    top: -8,
  },
  additionalImageContainer: {
    marginRight: 14,
  },
});

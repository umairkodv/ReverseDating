import {
  Image,
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
import BaseView from '../../BaseView';
import CountryPicker from 'react-native-country-picker-modal';
import {COLORS, FONT_FAMILIES, FONT_SIZES} from '../../../utils/constants';
import i18n from '../../../translation/i18n';
import Back from '../../../assets/svgs/back.svg';
import CustomTextInput from '../../../components/CustomTextInput';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Untick from '../../../assets/svgs/untick.svg';
import Tick from '../../../assets/svgs/tick.svg';
import Calendar from '../../../assets/svgs/calendar.svg';
import Clock from '../../../assets/svgs/clock.svg';
import moment from 'moment';
import Drop from '../../../assets/svgs/drop.svg';
import Insta from '../../../assets/svgs/insta.svg';
import Fb from '../../../assets/svgs/fb.svg';
import Discord from '../../../assets/svgs/discord.svg';
import Twitter from '../../../assets/svgs/twitter.svg';
import Plus from '../../../assets/svgs/plus.svg';
import ImagePicker from 'react-native-image-crop-picker';
import imagePath from '../../../utils/imagePath';
import Arrow from '../../../assets/svgs/arrow.svg';
import CustomButton from '../../../components/CustomButton';
import Loader from '../../../components/Loader';
import {uploadFiles} from '../../../utils/ImageUpload';
import {EditInfidelityApi} from '../../../services/actions/AppApi';
import {VARIABLES} from '../../../utils/globalVariables';
import {ToastMessage} from '../../../components/ToastMessage';

export default function EditInfidelityReport(props) {
  const userData = JSON.parse(VARIABLES.details);
  console.log('userdaatra', userData);
  const mainData = props?.route?.params?.data;
  console.log('maindata', mainData);
  const [cheaterName, setCheaterName] = useState(mainData?.cheaterName);
  const [location, setLocation] = useState(mainData?.location);
  const [victimName, setVictimName] = useState(mainData?.victimName);
  const [victimEmail, setVictimEmail] = useState(mainData?.victimEmail);

  const [toggle, setToggle] = useState(false);
  const [date, setDate] = useState(
    moment(mainData?.incidentDate).format('DD/MM/YYYY'),
  );
  const [time, setTime] = useState(
    moment(mainData?.incidentTime, 'hh:mm:ss').format('hh:mm'),
  );
  const [timePickerVisible, setTimePickerVisible] = useState(false);
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [description, setDescription] = useState(mainData?.incidentDescription);
  const [countryPickerVisible, setCountryPickerVisible] = useState(false);
  const [phone, setPhone] = useState(mainData?.contactNumber);
  const [country, setCountry] = useState(null);
  const [email, setEmail] = useState(mainData?.contactEmail);
  const [showDropDown, setShowDropDown] = useState(false);
  const [handleNames, setHandleNames] = useState(mainData?.socialMedia);
  const [selectedSocial, setSelectedSocial] = useState(() => {
    return mainData?.socialMedia ? Object.keys(mainData.socialMedia) : [];
  });
  const [loading, setLoading] = useState(false);
  const evidenceMedia = mainData?.evidenceMedia.map(i => ({
    path: i?.path,
  }));
  console.log('evidencde', evidenceMedia);

  const [oldImages, setOldImages] = useState(evidenceMedia);
  const [newImages, setNewImages] = useState([]);

  const removeImage = image => {
    if (oldImages.some(img => img.path === image)) {
      console.log('imagereceived', image);
      setOldImages(oldImages.filter(img => img?.path !== image));
    } else {
      setNewImages(newImages.filter(img => img?.path !== image));
    }
  };

  const handleImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      multiple: true,
    }).then(imagesArray => {
      console.log(imagesArray);
      const newArray = imagesArray?.map(i => ({
        path: i?.uri || i?.path,
        name: i.filename || i.path.split('/').pop(),
      }));
      setNewImages(prevImages => [...prevImages, ...newArray]);
    });
  };

  console.log('newumage', newImages);
  console.log('oldumage', oldImages);

  console.log('alll', [...oldImages, ...newImages]);
  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const showTimePicker = () => {
    setTimePickerVisible(true);
  };

  const handleTimeConfirm = time => {
    setTime(moment(time).format('hh:mm A'));
    hideTimePicker();
  };

  const handleDateConfirm = date => {
    setDate(moment(date).format('DD/MM/YYYY'));
    hideDatePicker();
  };
  const hideTimePicker = () => {
    setTimePickerVisible(false);
  };

  const onSelect = country => {
    setCountry(country);
    setCountryPickerVisible(false);
  };

  const handleToggle = () => {
    setToggle(!toggle);
    if (!toggle) setCheaterName('');
  };

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

  const handleSaveChanges = async () => {
    setLoading(true);
    let imagesArray = [...oldImages];
    if (newImages?.length > 0) {
      const s3Images = await uploadFiles(newImages, 'user-profile-bucket');
      console.log('s3images', s3Images);
      const updatedImages = s3Images?.map(i => ({
        path: i?.Location,
      }));
      imagesArray = [...oldImages, ...updatedImages];
    }
    console.log('imagessaraay', imagesArray);

    const data = {
      cheaterName: cheaterName,
      location: location,
      incidentDate: moment(date, 'DD/MM/YYYY').format('YYYY/MM/DD'),
      incidentTime: moment(time, 'hh:mm A').format('hh:mm:ss'),
      incidentDescription: description,
      callingCode: '',
      contactNumber: phone,
      contactEmail: email,
      socialMedia: handleNames,
      victimName: victimName,
      victimEmail: victimEmail,
      victimCallingCode: '',
      victimContactNumber: '',
      evidenceMedia: imagesArray,
    };
    console.log('datafromedit', data);
    console.log('maindaita', mainData?._id);
    const response = await EditInfidelityApi(
      userData?._id,
      mainData?._id,
      data,
    );
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
        <Text style={styles.settingText}>{i18n.t('list.edit')}</Text>
        <View style={styles.blankView} />
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 40}
        style={styles.contentContainer}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scroll}>
          <View style={styles.mainView}>
            <CustomTextInput
              label={'Name of the person you saw (if known)'}
              placeholder={'Full Name'}
              value={cheaterName}
              inputContainerStyle={{marginBottom: 10}}
              onChangeText={setCheaterName}
            />
            <View style={styles.ongoingView}>
              <TouchableOpacity onPress={handleToggle}>
                {toggle ? <Tick /> : <Untick />}
              </TouchableOpacity>
              <Text style={styles.ongoingText}>
                {i18n.t('infidelity.dont')}
              </Text>
            </View>
            <CustomTextInput
              label={'Where did you see them?'}
              placeholder={'Location'}
              value={location}
              inputContainerStyle={{marginBottom: 18}}
              onChangeText={setLocation}
            />
            <Text style={styles.labelButton}>
              Date and time you first suspected infidelity
            </Text>
            <View style={styles.dateTimeView}>
              <TouchableOpacity
                style={styles.dateView}
                onPress={showDatePicker}>
                <Calendar />
                <Text style={styles.metText}>
                  {date === '' ? i18n.t('infidelity.date1') : date}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.dateView}
                onPress={showTimePicker}>
                <Clock fillColor={COLORS.black} />
                <Text style={styles.metText}>
                  {time === '' ? i18n.t('infidelity.time1') : time}
                </Text>
              </TouchableOpacity>
            </View>
            <CustomTextInput
              placeholder={'Description'}
              label={i18n.t('infidelity.describe')}
              inputContainerStyle={
                Platform.OS === 'ios'
                  ? styles.inputStyleDescribe
                  : styles.inputStyleDescribe2
              }
              inputStyle={styles.textinputStyle}
              multiline
              textAlignVertical="top"
              value={description}
              onChangeText={text => setDescription(text)} // Bind description state
            />
            <Text style={styles.labelButton}>
              Phone number of the person you saw
            </Text>
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
                placeholder={'Phone Number'}
                placeholderTextColor={COLORS.textGray}
                value={phone}
                onChangeText={text => setPhone(text)} // Bind phone state
              />
            </View>
            <CustomTextInput
              label={'Email of the person you saw (if known)'}
              placeholder={'Email'}
              value={email}
              inputContainerStyle={{marginBottom: 10}}
              onChangeText={setEmail}
            />
            <Text style={styles.labelButton}>
              Social Media of the person you saw
            </Text>
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
          </View>
          <Text style={styles.heading}>
            Information of the person who is being cheated on
          </Text>

          <CustomTextInput
            placeholder={i18n.t('infidelity.person')}
            value={victimName}
            onChangeText={setVictimName}
            label={'Name of the person'}
          />
          <CustomTextInput
            placeholder={i18n.t('infidelity.emailPerson')}
            value={victimEmail}
            onChangeText={setVictimEmail}
            label={'Email of the person'}
          />
          <View style={{marginBottom: 30}}>
            <Text style={styles.labelButton2}>Uploaded Images</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                paddingVertical: 20,
              }}>
              <TouchableOpacity style={styles.imgView} onPress={handleImage}>
                <Arrow />
                <Text style={styles.basicText2}>
                  {i18n.t('infidelity.file')}
                </Text>
              </TouchableOpacity>
              {/* {allImages?.map((image, index) => {
                return (
                  <View key={index} style={styles.additionalImageContainer}>
                    <Image
                      key={index}
                      style={styles.additionalImage}
                      source={{uri: image?.path}}
                    />

                    <TouchableOpacity
                      style={styles.removeImageIcon}
                      onPress={() =>
                        removeAdditionalImage(image?.path, image?.type)
                      }>
                      <Image
                        style={{width: 20, height: 20}}
                        source={imagePath.delete}
                      />
                    </TouchableOpacity>
                  </View>
                );
              })} 
            </ScrollView>*/}

              {[...oldImages, ...newImages].map((item, index) => (
                <View key={index} style={{margin: 5, position: 'relative'}}>
                  <Image
                    source={{uri: item?.path}}
                    style={styles.additionalImage}
                  />
                  <TouchableOpacity
                    style={styles.removeImageIcon}
                    onPress={() => removeImage(item?.path)}>
                    <Image
                      style={{width: 20, height: 20}}
                      source={imagePath.delete}
                    />
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
            <CustomButton title={'Save Changes'} onPress={handleSaveChanges} />
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
      <DateTimePickerModal
        isVisible={datePickerVisible}
        display="spinner"
        mode="date"
        onConfirm={handleDateConfirm}
        onCancel={hideDatePicker}
        maximumDate={new Date()}
      />

      <DateTimePickerModal
        isVisible={timePickerVisible}
        mode="time"
        onConfirm={handleTimeConfirm}
        onCancel={hideTimePicker}
      />
      {loading && <Loader />}
    </BaseView>
  );
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    marginTop: 10,
  },
  contentContainer: {
    flex: 1,
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
  ongoingView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 18,
  },
  ongoingText: {
    color: COLORS.black,
    fontSize: FONT_SIZES.fourteen,
    fontFamily: FONT_FAMILIES.bold,
  },
  dateTimeView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    marginBottom: 18,
  },
  dateView: {
    height: 50,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.primary,
    flexDirection: 'row',
    gap: 14,
    alignItems: 'center',
    paddingHorizontal: 16,
    flex: 1,
    backgroundColor: COLORS.lightGray,
  },
  dateText: {
    color: COLORS.textGray,
    fontSize: FONT_SIZES.fourteen,
    fontFamily: FONT_FAMILIES.medium,
  },
  labelButton: {
    fontSize: FONT_SIZES.sixteen,
    fontFamily: FONT_FAMILIES.semiBold,
    color: COLORS.black,
    marginBottom: 8,
  },
  inputStyleDescribe: {
    // flex: 1,
    height: 141,
    backgroundColor: COLORS.lightGray,
    borderRadius: 12,
    marginBottom: 16,
    paddingHorizontal: 20,
    justifyContent: 'center',
    paddingVertical: 10,
    // marginTop: 10,
  },
  inputStyleDescribe2: {
    // flex: 1,
    height: 141,
    backgroundColor: COLORS.lightGray,
    borderRadius: 12,
    marginBottom: 16,
    paddingHorizontal: 20,
    justifyContent: 'center',
    paddingTop: 10,
    // marginTop: 10,
  },
  textinputStyle: {
    color: COLORS.black,
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
  line2: {
    borderRightWidth: 1,
    borderRightColor: COLORS.textGray,
    height: 28,
    marginVertical: -8,
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
  scroll: {
    paddingBottom: 50,
  },
  heading: {
    color: COLORS.black,
    fontSize: FONT_SIZES.twenty,
    fontFamily: FONT_FAMILIES.bold,
    marginVertical: 20,
    textDecorationLine: 'underline',
  },
  imgView: {
    backgroundColor: COLORS.pink,
    height: 150,
    width: 230,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderStyle: 'dashed',
    marginEnd: 12,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  plus: {
    position: 'absolute',
    right: -10,
    bottom: -5,
  },
  additionalImage: {
    height: 150,
    width: 230,
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
    backgroundColor: COLORS.lightGray,
  },
  labelButton2: {
    fontSize: FONT_SIZES.sixteen,
    fontFamily: FONT_FAMILIES.semiBold,
    color: COLORS.black,
    marginBottom: -12,
  },
  inputText3: {
    color: COLORS.black,
    fontSize: FONT_SIZES.fourteen,
    fontFamily: FONT_FAMILIES.light,
    // backgroundColor: 'red',
    flex: 1,
  },
});

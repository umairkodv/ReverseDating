import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import BaseView from '../BaseView';
import {COLORS, FONT_FAMILIES, FONT_SIZES} from '../../utils/constants';
import Back from '../../assets/svgs/back.svg';
import Text2 from '../../assets/svgs/text2.svg';
import Drop from '../../assets/svgs/drop.svg';
import Untick from '../../assets/svgs/Guntick.svg';
import Tick from '../../assets/svgs/Gtick.svg';
import Insta from '../../assets/svgs/insta.svg';
import Fb from '../../assets/svgs/fb.svg';
import Discord from '../../assets/svgs/discord.svg';
import Twitter from '../../assets/svgs/twitter.svg';
import i18n from '../../translation/i18n';
import CustomTextInput from '../../components/CustomTextInput';
import CustomButton from '../../components/CustomButton';
import {
  MultipleSelectList,
  SelectList,
} from 'react-native-dropdown-select-list';
import ProgressBar from '../../components/ProgressBar';
import SocialModal from '../modals/SocialModal';
import imagePath from '../../utils/imagePath';
import {ToastMessage} from '../../components/ToastMessage';

export default function Social(props) {
  const [selectedSocial, setSelectedSocial] = useState([]);
  const [describe, setDescribe] = useState('');
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
  const partnerName = props?.route?.params?.partnerName;
  const datingAppName = props.route?.params?.datingAppName;
  const meetingSource = props.route?.params?.meetingSource;
  const meetingDescription = props.route?.params?.meetingDescription;
  const contactNumber = props.route?.params?.contactNumber;
  const contactEmail = props.route?.params?.contactEmail;
  const callingCode = props.route?.params?.callingCode;
  const relationshipStartDate = props.route?.params?.relationshipStartDate;
  const relationshipEndDate = props.route?.params?.relationshipEndDate;
  const relationshipOngoingStatus =
    props.route?.params?.relationshipOngoingStatus;
  const relationshipStatus = props.route?.params?.relationshipStatus;

  console.log(
    partnerName,
    datingAppName,
    meetingDescription,
    meetingSource,
    contactEmail,
    contactNumber,
    callingCode,
    relationshipStartDate,
    relationshipEndDate,
    relationshipOngoingStatus,
    relationshipStatus,
  );

  console.log('handlename', handleNames);
  const handleSelection = item => {
    if (selectedSocial?.includes(item)) {
      setSelectedSocial(prev => prev.filter(i => i !== item));
    } else {
      setSelectedSocial(prev => [...prev, item]);
      setShowDropDown(!showDropDown);
    }
  };

  console.log(
    'onbjectt',
    Object.values(handleNames).some(val => val.trim() === ''),
  );
  const handleNext = () => {
    if (selectedSocial.length === 0) {
      ToastMessage('Please select at least one social platform.');
      return;
    } else if (
      selectedSocial.length > 0 &&
      selectedSocial.some(
        platform =>
          !handleNames[platform] || handleNames[platform].trim() === '',
      )
    ) {
      ToastMessage('Please provide handle names for all selected platforms.');
      return;
    }
    props.navigation.navigate('Face', {
      partnerName,
      datingAppName,
      meetingDescription,
      meetingSource,
      contactNumber,
      contactEmail,
      callingCode,
      relationshipStartDate,
      relationshipEndDate,
      relationshipOngoingStatus,
      relationshipStatus,
      socialMediaPlatform: selectedSocial,
      socialMediaHandle: handleNames,
    });
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
          <ScrollView showsVerticalScrollIndicator={false}>
            <TouchableOpacity onPress={() => props.navigation.goBack()}>
              <Back />
            </TouchableOpacity>

            <ProgressBar progress={87.5} />

            <Image source={imagePath.addd} style={styles.joinText} />

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
              title={i18n.t('question.next')}
              style={{marginTop: 30}}
              onPress={handleNext}
            />
            <TouchableOpacity
              style={styles.skipView}
              onPress={() =>
                props.navigation.navigate('Face', {
                  partnerName,
                  datingAppName,
                  meetingDescription,
                  meetingSource,
                  contactNumber,
                  contactEmail,
                  callingCode,
                  relationshipStartDate,
                  relationshipEndDate,
                  relationshipOngoingStatus,
                  relationshipStatus,
                  socialMediaPlatform: '',
                  socialMediaHandle: '',
                })
              }>
              <Text style={styles.skip}>{i18n.t('question.skip')}</Text>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
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
  inputStyle: {
    color: COLORS.black,
    fontSize: FONT_SIZES.sixteen,
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
    marginTop: 22,
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
  inputStyleDescribe: {
    flex: 1,
    height: 141,
    backgroundColor: COLORS.lightGray,
    borderRadius: 12,
    marginBottom: 16,
    paddingHorizontal: 20,
    justifyContent: 'center',
    paddingVertical: 10,
    marginTop: 20,
  },
  inputStyleDescribe2: {
    flex: 1,
    height: 141,
    backgroundColor: COLORS.lightGray,
    borderRadius: 12,
    marginBottom: 16,
    paddingHorizontal: 20,
    justifyContent: 'center',
    paddingTop: 10,
    marginTop: 20,
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
    marginTop: 20,
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
});

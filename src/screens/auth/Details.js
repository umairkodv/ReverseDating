import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import BaseView from '../BaseView';
import {COLORS, FONT_FAMILIES, FONT_SIZES} from '../../utils/constants';
import Back from '../../assets/svgs/back.svg';
import Text1 from '../../assets/svgs/text1.svg';
import Untick from '../../assets/svgs/untick.svg';
import Tick from '../../assets/svgs/tick.svg';
import Calendar from '../../assets/svgs/calendar.svg';
import i18n from '../../translation/i18n';
import CustomTextInput from '../../components/CustomTextInput';
import CustomButton from '../../components/CustomButton';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import ProgressBar from '../../components/ProgressBar';
import CustomTextInputWImage from '../../components/CustomTextInputWImage';
import InformationModal from '../modals/InformationModal';
import imagePath from '../../utils/imagePath';
import CalendarPicker from '../modals/CalendarPicker';
import moment from 'moment';
import {ToastMessage} from '../../components/ToastMessage';
export default function Details(props) {
  const [toggle, setToggle] = useState(false);
  const [selectedStart, setSelectedStart] = useState('');
  const [selectedEnd, setSelectedEnd] = useState('');
  const handleToggle = () => {
    setToggle(!toggle);
    setSelectedEnd('');
  };

  const partnerName = props?.route?.params?.partnerName;
  // const datingAppName = props.route?.params?.datingAppName;
  // const meetingSource = props.route?.params?.meetingSource;
  // const meetingDescription = props.route?.params?.meetingDescription;
  // const contactNumber = props.route?.params?.contactNumber;
  // const contactEmail = props.route?.params?.contactEmail;
  // const callingCode = props.route?.params?.callingCode;
  // const socialMediaHandle = props.route?.params?.socialMediaHandle;
  // const socialMediaPlatform = props.route?.params?.socialMediaPlatform;
  // const relationshipStatus = props.route?.params?.relationshipStatus;
  // const partnerImages = props.route?.params?.partnerImages;

  console.log(
    partnerName,
    // datingAppName,
    // meetingDescription,
    // meetingSource,
    // contactEmail,
    // contactNumber,
    // callingCode,
    // socialMediaHandle,
    // socialMediaPlatform,
    // relationshipStatus,
    // partnerImages,
  );
  const [calendarModalVisible, setCalendarModalVisible] = useState(false);
  const [calendarEndModalVisible, setCalendarEndModalVisible] = useState(false);

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

  const handleNext = () => {
    if (!selectedStart) {
      ToastMessage('Please select a start date');
    } else if (!toggle && !selectedEnd) {
      ToastMessage('Please select an end date or mark as ongoing');
    } else if (
      !toggle &&
      selectedEnd &&
      moment(selectedEnd).isBefore(moment(selectedStart))
    ) {
      ToastMessage('End date cannot be before the start date');
    } else {
      props.navigation.navigate('Relationship', {
        partnerName,
        // datingAppName,
        // meetingDescription,
        // meetingSource,
        // contactNumber,
        // contactEmail,
        // callingCode,
        // socialMediaPlatform,
        // socialMediaHandle,
        // relationshipStatus,
        // partnerImages,
        relationshipStartDate: selectedStart,
        relationshipEndDate: selectedEnd,
        relationshipOngoingStatus: toggle,
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
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <Back />
        </TouchableOpacity>

        <ProgressBar progress={25} />
        <Image source={imagePath.partnerdeets} style={styles.joinText} />
        <Text style={styles.basicText}>{i18n.t('question.info')}</Text>
        <CustomTextInputWImage
          placeholder={i18n.t('question.first')}
          inputContainerStyle={{marginTop: 20, marginBottom: 0}}
          leftImageVisible
          imageLeft={<Calendar />}
          onPressLeft={openCalendarModal}
          editable={false}
          value={
            selectedStart == ''
              ? ''
              : moment(selectedStart, 'YYYY-MM-DD').format('LL')
          }
          onChangeText={setSelectedStart}
        />
        <View style={styles.ongoingView}>
          <TouchableOpacity onPress={handleToggle}>
            {toggle ? <Tick /> : <Untick />}
          </TouchableOpacity>
          <Text style={styles.ongoingText}>{i18n.t('question.ongoing')}</Text>
        </View>
        {!toggle && (
          <CustomTextInputWImage
            placeholder={i18n.t('question.end')}
            leftImageVisible
            imageLeft={<Calendar />}
            editable={false}
            onPressLeft={openCalendarEndModal}
            value={
              selectedEnd == ''
                ? ''
                : moment(selectedEnd, 'YYYY-MM-DD').format('LL')
            }
            onChangeText={setSelectedEnd}
          />
        )}
        <CustomButton
          title={i18n.t('question.next')}
          style={{marginTop: 30}}
          // onPress={() => props.navigation.navigate('AddNewPartner')}
          onPress={handleNext}
        />
        {/* <TouchableOpacity
          style={styles.skipView}
          onPress={() =>
            props.navigation.navigate('AddNewPartner', {
              partnerName,
              datingAppName,
              meetingDescription,
              meetingSource,
              contactNumber,
              contactEmail,
              callingCode,
              socialMediaPlatform,
              socialMediaHandle,
              relationshipStatus,
              partnerImages,
              relationshipStartDate: '',
              relationshipEndDate: '',
              relationshipOngoingStatus: false,
            })
          }>
          <Text style={styles.skip}>{i18n.t('question.skip')}</Text>
        </TouchableOpacity> */}
        <TouchableOpacity
          style={styles.skipView}
          onPress={() =>
            props.navigation.navigate('Relationship', {
              partnerName,
              relationshipStartDate: '',
              relationshipEndDate: '',
              relationshipOngoingStatus: false,
            })
          }>
          <Text style={styles.skip}>{i18n.t('question.skip')}</Text>
        </TouchableOpacity>
      </View>

      {/* <CalendarPicker
        visible={calendarModalVisible}
        closeModal={closeCalendarModal}
        handleSend={handleStartDate}
      /> */}

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
      {/* <CalendarPicker
        visible={calendarEndModalVisible}
        closeModal={closeCalendarEndModal}
        handleSend={handleEndDate}
      /> */}
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
  ongoingView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 14,
  },
  ongoingText: {
    color: COLORS.black,
    fontSize: FONT_SIZES.fourteen,
    fontFamily: FONT_FAMILIES.bold,
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

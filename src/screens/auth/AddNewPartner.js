import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import BaseView from '../BaseView';
import {COLORS, FONT_FAMILIES, FONT_SIZES} from '../../utils/constants';
import CustomButton from '../../components/CustomButton';
import i18n from '../../translation/i18n';
import Heart from '../../assets/svgs/heart.svg';
import Back from '../../assets/svgs/back.svg';
import {PartnerDetailsApi} from '../../services/actions/AuthApi';
import {VARIABLES} from '../../utils/globalVariables';
import {ToastMessage} from '../../components/ToastMessage';
import Loader from '../../components/Loader';
import HeartAnimation from '../../components/HeartAnimation';

export default function AddNewPartner(props) {
  const [loading, setLoading] = useState(false);
  const userData = JSON.parse(VARIABLES.details);
  const partnerName = props?.route?.params?.partnerName;
  const datingAppName = props.route?.params?.datingAppName;
  const meetingSource = props.route?.params?.meetingSource;
  const meetingDescription = props.route?.params?.meetingDescription;
  const contactNumber = props.route?.params?.contactNumber;
  const contactEmail = props.route?.params?.contactEmail;
  const callingCode = props.route?.params?.callingCode;
  const socialMediaHandle = props.route?.params?.socialMediaHandle;
  const socialMediaPlatform = props.route?.params?.socialMediaPlatform;
  const relationshipStatus = props.route?.params?.relationshipStatus;
  const partnerImages = props.route?.params?.partnerImages;
  const relationshipStartDate = props.route?.params?.relationshipStartDate;
  const relationshipEndDate = props.route?.params?.relationshipEndDate;
  const relationshipOngoingStatus =
    props.route?.params?.relationshipOngoingStatus;

  console.log(
    partnerName,
    datingAppName,
    meetingDescription,
    meetingSource,
    contactEmail,
    contactNumber,
    callingCode,
    socialMediaHandle,
    socialMediaPlatform,
    relationshipStatus,
    partnerImages,
    relationshipStartDate,
    relationshipEndDate,
    relationshipOngoingStatus,
  );
  // console.log('details', userData);
  const handleSubmit = async () => {
    setLoading(true);
    const data = {
      partnerName: partnerName,
      partnerImages: partnerImages,
      datingAppName: datingAppName,
      meetingDescription: meetingDescription,
      meetingSource: meetingSource,
      contactEmail: contactEmail,
      contactNumber: contactNumber,
      callingCode: callingCode,
      socialMediaHandle: socialMediaHandle,
      socialMediaPlatform: socialMediaPlatform,
      relationshipStatus: relationshipStatus,
      relationshipStartDate: relationshipStartDate,
      relationshipEndDate: relationshipEndDate,
      relationshipOngoingStatus: relationshipOngoingStatus,
    };

    // console.log('datagoing', data);
    const response = await PartnerDetailsApi(userData?._id, data);
    console.log('responsefrompartner', response);
    if (response?.statusCode == 201) {
      setLoading(false);
      ToastMessage('Partner added successfully!');
      props.navigation.replace('AppStackNavigator');
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
      <TouchableOpacity
        style={{marginTop: 20}}
        onPress={() => props.navigation.goBack()}>
        <Back />
      </TouchableOpacity>

      <View style={styles.mainView}>
        {loading ? <HeartAnimation /> : <Heart />}
      </View>
      {!loading && (
        <CustomButton
          style={{marginBottom: 30}}
          title={i18n.t('get.submit')}
          // onPress={() => props.navigation.navigate('AppStackNavigator')}
          onPress={handleSubmit}
        />
      )}
    </BaseView>
  );
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadText: {
    textAlign: 'center',
    fontSize: FONT_SIZES.twentyEight,
    marginBottom: 40,
  },
  add: {
    color: COLORS.black,
    fontSize: FONT_SIZES.sixteen,
    fontFamily: FONT_FAMILIES.bold,
    textDecorationLine: 'underline',
  },
});

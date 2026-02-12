import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import BaseView from '../BaseView';
import {COLORS, FONT_FAMILIES, FONT_SIZES} from '../../utils/constants';
import Back from '../../assets/svgs/back.svg';
import i18n from '../../translation/i18n';
import CustomTextInput from '../../components/CustomTextInput';
import CustomButton from '../../components/CustomButton';
import ProgressBar from '../../components/ProgressBar';
import DatingAppModal from '../modals/DatingAppModal';
import imagePath from '../../utils/imagePath';
import {ToastMessage} from '../../components/ToastMessage';
export default function DatingApp(props) {
  const partnerName = props?.route?.params?.partnerName;
  const relationshipStartDate = props.route?.params?.relationshipStartDate;
  const relationshipEndDate = props.route?.params?.relationshipEndDate;
  const relationshipOngoingStatus =
    props.route?.params?.relationshipOngoingStatus;
  const relationshipStatus = props.route?.params?.relationshipStatus;

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
    relationshipStartDate,
    relationshipEndDate,
    relationshipOngoingStatus,
    relationshipStatus,
  );

  const [datingAppName, setDatingAppName] = useState('');

  const handleNext = () => {
    if (datingAppName == '') {
      ToastMessage('Please enter dating app name.');
    } else {
      props.navigation.navigate('Meet', {
        partnerName,
        relationshipStartDate,
        relationshipEndDate,
        relationshipOngoingStatus,
        relationshipStatus,
        datingAppName: datingAppName,
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
      <ScrollView showsVerticalScrollIndicator={false} scrollEnabled={false}>
        <View style={styles.mainView}>
          <TouchableOpacity onPress={() => props.navigation.goBack()}>
            <Back />
          </TouchableOpacity>

          <ProgressBar progress={50} />
          <Image source={imagePath.name} style={styles.joinText} />

          <CustomTextInput
            placeholder={i18n.t('question.name')}
            inputContainerStyle={{marginTop: 40}}
            value={datingAppName}
            onChangeText={setDatingAppName}
          />
          <CustomButton
            title={i18n.t('question.next')}
            style={{marginTop: 30}}
            onPress={handleNext}
          />
          <TouchableOpacity
            style={styles.skipView}
            onPress={() =>
              props.navigation.navigate('Meet', {
                partnerName,
                datingAppName: '',
                relationshipStartDate,
                relationshipEndDate,
                relationshipOngoingStatus,
                relationshipStatus,
              })
            }>
            <Text style={styles.skip}>{i18n.t('question.skip')}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  },
  skipView: {
    alignSelf: 'flex-end',

    marginTop: 14,
  },
});

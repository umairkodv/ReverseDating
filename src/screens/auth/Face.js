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
import Text1 from '../../assets/svgs/text1.svg';
import Face1 from '../../assets/svgs/face.svg';
import Plus from '../../assets/svgs/plus.svg';
import ImagePicker from 'react-native-image-crop-picker';
import i18n from '../../translation/i18n';
import CustomTextInput from '../../components/CustomTextInput';
import CustomButton from '../../components/CustomButton';
import ProgressBar from '../../components/ProgressBar';
import FacialModal from '../modals/FacialModal';
import imagePath from '../../utils/imagePath';
import {ToastMessage} from '../../components/ToastMessage';

export default function Face(props) {
  const [images, setImages] = useState([]);
  const [base64, setBase64] = useState([]);
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
    relationshipStartDate,
    relationshipEndDate,
    relationshipOngoingStatus,
  );
  const removeAdditionalImage = index => {
    setImages(prevImages => prevImages.filter((_, i) => i !== index));
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

  console.log('images', images);
  console.log('base64', base64);

  const handleNext = () => {
    if (images?.length < 1) {
      ToastMessage('Please enter few images');
    } else {
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
        relationshipStartDate,
        relationshipEndDate,
        relationshipOngoingStatus,
        partnerImages: base64,
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

        <ProgressBar progress={100} />
        <Image source={imagePath.face} style={styles.joinText} />

        <View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingVertical: 20,
            }}>
            <TouchableOpacity style={styles.imgView} onPress={handleImage}>
              <Plus style={styles.plus} />
            </TouchableOpacity>
            {images.map((image, index) => {
              return (
                <View key={index} style={styles.additionalImageContainer}>
                  <Image
                    key={index}
                    style={styles.additionalImage}
                    source={{uri: image.path}}
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
        <CustomButton
          title={i18n.t('question.done')}
          style={{marginTop: 40}}
          // onPress={() => props.navigation.navigate('Details')}
          onPress={handleNext}
        />
        <TouchableOpacity
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
              relationshipStartDate,
              relationshipEndDate,
              relationshipOngoingStatus,
              partnerImages: [],
            })
          }>
          <Text style={styles.skip}>{i18n.t('question.skip')}</Text>
        </TouchableOpacity>
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
  imgView: {
    backgroundColor: COLORS.imgGray,
    height: 130,
    width: 120,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderStyle: 'dashed',
    marginTop: 20,
    marginEnd: 12,
  },
  plus: {
    position: 'absolute',
    right: -10,
    bottom: -5,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
    marginTop: 40,
  },
  joinText: {
    alignSelf: 'center',
    resizeMode: 'contain',
    width: '100%',
    marginTop: 50,
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
    // backgroundColor: 'red',s
    marginTop: 20,
  },
  skipView: {
    alignSelf: 'flex-end',

    marginTop: 14,
  },
});

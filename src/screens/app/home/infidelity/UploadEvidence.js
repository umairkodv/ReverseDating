import {useState} from 'react';
import BaseView from '../../../BaseView';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  ScrollView,
  Platform,
  Image,
} from 'react-native';
import CustomTextInput from '../../../../components/CustomTextInput';
import CustomButton from '../../../../components/CustomButton';
import {COLORS, FONT_FAMILIES, FONT_SIZES} from '../../../../utils/constants';
import i18n from '../../../../translation/i18n';
import Back from '../../../../assets/svgs/back.svg';
import Arrow from '../../../../assets/svgs/arrow.svg';
import ImagePicker from 'react-native-image-crop-picker';
import TextComponent from '../../../../components/TextComponent';
import imagePath from '../../../../utils/imagePath';
import {uploadFiles} from '../../../../utils/ImageUpload';
import Loader from '../../../../components/Loader';

export default function UploadEvidence(props) {
  const location = props?.route?.params?.location;
  const description = props?.route?.params?.description;
  const cheaterName = props?.route?.params?.cheaterName;
  const incidentDate = props?.route?.params?.incidentDate;
  const incidentTime = props?.route?.params?.incidentTime;
  const socialMedia = props?.route?.params?.socialMedia;
  const callingCode = props?.route?.params?.callingCode;
  const contactEmail = props?.route?.params?.contactEmail;
  const contactNumber = props?.route?.params?.contactNumber;
  const victimCallingCode = props?.route?.params?.victimCallingCode;
  const victimContactNumber = props?.route?.params?.victimContactNumber;
  const victimEmail = props?.route?.params?.victimEmail;
  const victimName = props?.route?.params?.victimName;

  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);

  const removeAdditionalImage = item => {
    setImages(prevImages => prevImages.filter((_, i) => i !== item));
  };

  const handleImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      multiple: true,
    }).then(selectedImages => {
      console.log(selectedImages);
      const filesToUpload = selectedImages.map(image => ({
        path: image.path,
        name: image.filename || image.path.split('/').pop(),
      }));
      setImages(prev => [...prev, ...filesToUpload]);
    });
  };

  const handleNext = () => {
    setLoading(true);
    uploadFiles(images, 'user-profile-bucket')
      .then(results => {
        setLoading(false);
        console.log('Files uploaded successfully:', results);
        const evidence = results?.map(i => ({
          path: i?.Location,
          type: 'existing',
        }));
        console.log('evienceeee', evidence);
        props.navigation.navigate('Review', {
          incidentDate,
          incidentTime,
          cheaterName,
          location,
          description,
          contactNumber,
          contactEmail,
          socialMedia,
          callingCode,
          victimName,
          victimEmail,
          victimCallingCode,
          victimContactNumber,
          evidence: evidence,
        });
      })
      .catch(err => {
        setLoading(false);
        console.error('Error uploading files:', err);
      });
  };

  return (
    <BaseView
      safeView={{backgroundColor: COLORS.white}}
      topView={{flex: 0, backgroundColor: COLORS.white}}
      baseViewStyle={{
        backgroundColor: COLORS.white,
        // paddingHorizontal: 20,
      }}>
      <TouchableOpacity
        onPress={() => props.navigation.goBack()}
        style={{marginTop: 20, paddingHorizontal: 20}}>
        <Back />
      </TouchableOpacity>
      <View style={styles.mainView}>
        <Image source={imagePath.upload} style={styles.joinText} />
        <Text style={styles.basicText}>{i18n.t('infidelity.any')}</Text>

        <View>
          <ScrollView
            contentContainerStyle={{paddingStart: 20, paddingEnd: 10}}
            horizontal
            showsHorizontalScrollIndicator={false}>
            <TouchableOpacity style={styles.pinkView} onPress={handleImage}>
              <Arrow />
              <Text style={styles.basicText2}>{i18n.t('infidelity.file')}</Text>
            </TouchableOpacity>
            {images.map((image, index) => {
              return (
                <View key={index} style={styles.additionalImageContainer}>
                  <Image
                    key={index}
                    style={styles.image}
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
          title={i18n.t('infidelity.next')}
          style={{marginTop: 30, paddingHorizontal: 20}}
          onPress={handleNext}
        />
      </View>
      {loading && <Loader />}
    </BaseView>
  );
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    marginTop: 50,
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
    marginHorizontal: 20,
  },
  basicText: {
    color: COLORS.black,
    fontSize: FONT_SIZES.eighteen,
    fontFamily: FONT_FAMILIES.bold,
    marginTop: 20,
    textAlign: 'center',
    marginBottom: 10,
  },
  basicText2: {
    color: COLORS.black,
    fontSize: FONT_SIZES.sixteen,
    fontFamily: FONT_FAMILIES.bold,
    marginTop: 10,
    textAlign: 'center',
  },
  skip: {
    color: COLORS.black,
    fontSize: FONT_SIZES.sixteen,
    fontFamily: FONT_FAMILIES.bold,
    textDecorationLine: 'underline',
    textAlign: 'right',
    marginTop: 14,
  },
  pinkView: {
    backgroundColor: COLORS.pink,
    height: 232,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    // width: '100%',
    borderWidth: 1,
    borderStyle: 'dashed',
    gap: 6,
    marginBottom: 30,
    width: 200,
    marginRight: 14,
    marginTop: 10,
  },
  image: {
    height: 232,
    width: 200,
    borderRadius: 20,
    overflow: 'hidden',
  },
  additionalImageContainer: {
    marginRight: 14,
    marginTop: 10,
  },
  crossImg: {
    width: 12,
    tintColor: 'grey',
    height: 12,
  },
  removeImageIcon: {
    position: 'absolute',
    right: 0,
    width: 14,
    height: 14,
    top: -8,
  },
});

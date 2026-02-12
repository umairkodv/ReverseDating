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
import Edit from '../../../../assets/svgs/edit.svg';
import imagePath from '../../../../utils/imagePath';
import FieldsKeyComponent from '../../../../components/FieldsKeyComponent';
import {InfidelityReportApi} from '../../../../services/actions/AppApi';
import {VARIABLES} from '../../../../utils/globalVariables';
import moment from 'moment';
import {ToastMessage} from '../../../../components/ToastMessage';
import Loader from '../../../../components/Loader';

export default function Review(props) {
  const userData = JSON.parse(VARIABLES.details);
  const [loading, setLoading] = useState(false);
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
  const evidence = props?.route?.params?.evidence;
  console.log('socialMedia', socialMedia);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const data = {
        cheaterName: cheaterName,
        location: location,
        incidentDate:
          incidentDate == ''
            ? incidentDate
            : moment(incidentDate, 'LL').format('YYYY/MM/DD'),
        incidentTime:
          incidentTime == ''
            ? incidentTime
            : moment(incidentTime, 'hh:mm A').format('hh:mm:ss'),
        incidentDescription: description,
        callingCode: callingCode,
        contactNumber: contactNumber,
        contactEmail: contactEmail,
        socialMedia: socialMedia,
        victimName: victimName,
        victimEmail: victimEmail,
        victimCallingCode: victimCallingCode,
        victimContactNumber: victimContactNumber,
        evidenceMedia: evidence,
      };
      console.log('datafgoingfromreport', data);
      const response = await InfidelityReportApi(userData?._id, data);
      console.log('responsfromifidelityreport', response);
      if (response?.statusCode === 201) {
        setLoading(false);
        props.navigation.navigate('Thankyou');
      } else {
        setLoading(false);
        ToastMessage(response?.data?.message);
        console.error('Error submitting report:', error);
        props.navigation.navigate('Wrong', {});
      }
    } catch (error) {
      setLoading(false);
      console.error('Error submitting report:', error);
      props.navigation.navigate('Wrong', {});
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
      <TouchableOpacity
        onPress={() => props.navigation.goBack()}
        style={{marginTop: 20}}>
        <Back />
      </TouchableOpacity>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingVertical: 20}}>
        <View style={styles.mainView}>
          <Image source={imagePath.review} style={styles.joinText} />
          <Text style={styles.basicText}>{i18n.t('review.please')}</Text>
          <View style={styles.editView}>
            <Text style={styles.basicText2}>{i18n.t('review.reported')}</Text>
            <View style={styles.line} />
          </View>

          <FieldsKeyComponent
            text1={i18n.t('review.name')}
            text2={cheaterName}
          />
          <FieldsKeyComponent
            text1={i18n.t('review.location')}
            text2={location}
          />
          <FieldsKeyComponent
            text1={i18n.t('review.time')}
            text2={incidentTime}
          />
          <FieldsKeyComponent
            text1={i18n.t('review.date')}
            text2={incidentDate}
          />
          <FieldsKeyComponent
            text1={i18n.t('review.description')}
            text2={description}
          />
          <FieldsKeyComponent
            text1={i18n.t('review.email')}
            text2={contactNumber}
          />
          <FieldsKeyComponent
            text1={i18n.t('review.phone')}
            text2={contactEmail}
          />
          {/* <FieldsKeyComponent text1={i18n.t('review.social')} text2={''} /> */}

          <View style={styles.editView}>
            <Text style={styles.basicText2}>{i18n.t('review.evidence')}</Text>
            <View style={styles.line} />
          </View>
          <View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {evidence?.map(item => (
                <Image style={styles.image} source={{uri: item?.path}} />
              ))}
            </ScrollView>
          </View>
          <CustomButton
            title={i18n.t('review.submit')}
            style={{marginTop: 30}}
            onPress={handleSubmit}
          />
        </View>
      </ScrollView>
      {loading && <Loader />}
    </BaseView>
  );
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    marginTop: 10,
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
  },
  basicText: {
    color: COLORS.black,
    fontSize: FONT_SIZES.eighteen,
    fontFamily: FONT_FAMILIES.bold,
    marginTop: 20,
    textAlign: 'center',
    marginBottom: 16,
  },
  basicText2: {
    color: COLORS.black,
    fontSize: FONT_SIZES.sixteen,
    fontFamily: FONT_FAMILIES.bold,
    // marginTop: 10,
  },
  skip: {
    color: COLORS.black,
    fontSize: FONT_SIZES.sixteen,
    fontFamily: FONT_FAMILIES.bold,
    textDecorationLine: 'underline',
    textAlign: 'right',
    marginTop: 14,
  },

  editView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  line: {
    width: '40%',
    borderBottomWidth: 1,
    alignSelf: 'center',
  },

  image: {
    overflow: 'hidden',
    height: 230,
    width: 200,
    borderRadius: 20,
    marginRight: 14,
    marginTop: 10,
    backgroundColor: COLORS.gray,
  },
  container: {
    height: 30,
    borderWidth: 1,
  },
});

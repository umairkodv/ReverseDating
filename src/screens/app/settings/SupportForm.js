import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import BaseView from '../../BaseView';
import {COLORS, FONT_FAMILIES, FONT_SIZES} from '../../../utils/constants';
import Back from '../../../assets/svgs/back.svg';
import i18n from '../../../translation/i18n';
import SettingsComponent from '../../../components/SettingsComponent';
import CustomTextInput from '../../../components/CustomTextInput';
import CustomButton from '../../../components/CustomButton';
import {VARIABLES} from '../../../utils/globalVariables';
import {SupportFormApi} from '../../../services/actions/AppApi';
import {ToastMessage} from '../../../components/ToastMessage';
import Loader from '../../../components/Loader';
export default function SupportForm(props) {
  const userData = JSON.parse(VARIABLES.details);
  console.log('userdata', userData);
  const [email, setEmail] = useState(userData?.email);
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(false);

  const checkRequiredfields = () => {
    if (subject === '') {
      ToastMessage('Please enter subject.');
      return false;
    } else if (body === '') {
      ToastMessage('Please enter the detail.');
      return false;
    } else {
      return true;
    }
  };

  const handleShare = () => {
    Share.open(options)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        err && console.log(err);
      });
  };

  const handleSupportForm = async () => {
    const isValid = checkRequiredfields();
    if (isValid) {
      setLoading(true);
      const data = {
        email: email,
        subject: subject,
        body: body,
      };
      console.log('datagoingfromsupport', data);
      const response = await SupportFormApi(data);
      console.log('respomse', response);
      if (response?.statusCode === 200) {
        setLoading(false);
        props?.navigation?.goBack();
        ToastMessage(response?.message);
      } else {
        setLoading(false);
        ToastMessage(response?.data?.message);
      }
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
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 40}
        style={styles.contentContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.mainView}>
            <View style={styles.settingView}>
              <TouchableOpacity onPress={() => props.navigation.goBack()}>
                <Back />
              </TouchableOpacity>
              <Text style={styles.settingText}>
                {i18n.t('settings.support')}
              </Text>
              <View />
            </View>

            <CustomTextInput
              placeholder={i18n.t('support.email')}
              value={email}
              onChangeText={setEmail}
              editable={false}
            />

            <CustomTextInput
              placeholder={i18n.t('support.what')}
              value={subject}
              onChangeText={setSubject}
            />

            <CustomTextInput
              placeholder={i18n.t('support.please')}
              inputContainerStyle={
                Platform.OS === 'ios'
                  ? styles.inputStyleDescribe
                  : styles.inputStyleDescribe2
              }
              inputStyle={styles.textinputStyle}
              multiline
              textAlignVertical="top"
              value={body}
              onChangeText={setBody}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <CustomButton
        title={i18n.t('support.send')}
        style={{marginBottom: 20}}
        onPress={handleSupportForm}
      />
      {loading && <Loader />}
    </BaseView>
  );
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    marginTop: 20,
  },
  settingView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  settingText: {
    color: COLORS.black,
    fontSize: FONT_SIZES.twentyEight,
    fontFamily: FONT_FAMILIES.bold,
  },
  inputStyleDescribe: {
    // flex: 1,
    height: 200,
    backgroundColor: COLORS.lightGray,
    borderRadius: 12,
    marginBottom: 16,
    paddingHorizontal: 20,
    justifyContent: 'center',
    paddingVertical: 10,
    // marginTop: 20,
  },
  inputStyleDescribe2: {
    // flex: 1,
    height: 200,
    backgroundColor: COLORS.lightGray,
    borderRadius: 12,
    marginBottom: 16,
    paddingHorizontal: 20,
    justifyContent: 'center',
    paddingTop: 10,
    // marginTop: 20,
  },
  textinputStyle: {
    color: COLORS.black,
    fontSize: FONT_SIZES.sixteen,
    fontFamily: FONT_FAMILIES.regular,
    padding: 0,
    flex: 1,
  },
  contentContainer: {
    flex: 1,
  },
});

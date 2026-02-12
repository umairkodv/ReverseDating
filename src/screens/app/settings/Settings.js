import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import BaseView from '../../BaseView';
import {COLORS, FONT_FAMILIES, FONT_SIZES} from '../../../utils/constants';
import Back from '../../../assets/svgs/back.svg';
import i18n from '../../../translation/i18n';
import SettingsComponent from '../../../components/SettingsComponent';
import DeleteModal from '../../modals/DeleteModal';
import CustomButton from '../../../components/CustomButton';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {ToastMessage} from '../../../components/ToastMessage';
import {clearAllPreferences, removeToken} from '../../../utils/UserPrefs';
import {VARIABLES} from '../../../utils/globalVariables';
import imagePath from '../../../utils/imagePath';
import {deleteUserApi} from '../../../services/actions/AppApi';
export default function Settings(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const userData = JSON.parse(VARIABLES.details);
  const openModal = () => {
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
  };
  console.log('userid', userData?._id);
  const handleDelete = async () => {
    const response = await deleteUserApi(userData?._id);
    console.log('de;eteuserresponse', response);
    if (response?.statusCode === 200) {
      removeToken();
      clearAllPreferences();
      VARIABLES.details = '';
      props.navigation.reset({
        index: 0,
        routes: [{name: 'AuthStackNavigator', params: {screen: 'SignUp'}}],
      });
      ToastMessage(response?.message);
    } else {
      ToastMessage(response?.data?.message);
    }
  };

  const handleLogout = () => {
    setTimeout(async () => {
      await GoogleSignin.signOut();
      removeToken();
      clearAllPreferences();
      VARIABLES.details = '';
      props.navigation.reset({
        index: 0,
        routes: [{name: 'AuthStackNavigator', params: {screen: 'SignUp'}}],
      });
      ToastMessage('Logged out Successfully');
    }, 500);
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
        <Text style={styles.settingText}>{i18n.t('settings.settings')}</Text>

        <View style={styles.logAccntView}>
          <Text style={styles.accntText}>{i18n.t('settings.account')}</Text>

          <CustomButton
            style={styles.logoutView}
            title={'Logout'}
            textStyle={{fontSize: FONT_SIZES.eighteen}}
            onPress={handleLogout}
            image={imagePath.quit}
            imgStyle={styles.img}
          />
        </View>
        {/* <SettingsComponent text={i18n.t('settings.edit')} />
        // <SettingsComponent text={i18n.t('settings.upgrade')} /> */}
        <SettingsComponent
          text={i18n.t('settings.infidelity')}
          onPress={() => props.navigation.navigate('InfidelityList')}
        />

        <SettingsComponent
          text={i18n.t('settings.privacy')}
          onPress={() => props.navigation.navigate('PrivacyPolicy')}
        />
        <SettingsComponent text={i18n.t('settings.terms')} />
        <SettingsComponent
          text={i18n.t('settings.support')}
          onPress={() => props.navigation.navigate('SupportForm')}
        />
      </View>
      <TouchableOpacity style={styles.deleteView} onPress={openModal}>
        <Text style={styles.deleteButton}>Delete Account</Text>
      </TouchableOpacity>
      <DeleteModal
        closeModal={closeModal}
        visible={modalVisible}
        handleDelete={handleDelete}
      />
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
  },
  settingText: {
    color: COLORS.black,
    fontSize: FONT_SIZES.twentyEight,
    fontFamily: FONT_FAMILIES.bold,
    textAlign: 'center',
  },
  accntText: {
    color: COLORS.black,
    fontSize: FONT_SIZES.eighteen,
    fontFamily: FONT_FAMILIES.bold,
    // marginVertical: 20,
  },
  appText: {
    color: COLORS.black,
    fontSize: FONT_SIZES.eighteen,
    fontFamily: FONT_FAMILIES.bold,
    marginBottom: 20,
    marginTop: 10,
  },
  logoutView: {
    width: 150,
    alignSelf: 'flex-end',
  },
  logAccntView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    marginTop: 20,
    alignItems: 'center',
  },
  img: {
    height: 32,
    width: 32,
  },
  deleteButton: {
    color: COLORS.white,
    fontSize: FONT_SIZES.eighteen,
    fontFamily: FONT_FAMILIES.bold,
  },
  deleteView: {
    height: 48,
    backgroundColor: COLORS.red,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    paddingHorizontal: 20,
    marginBottom: 30,
  },
});

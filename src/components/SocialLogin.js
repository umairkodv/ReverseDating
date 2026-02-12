import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import Google from '../assets/svgs/google.svg';
import Apple from '../assets/svgs/apple.svg';
import {COLORS, FONT_FAMILIES, FONT_SIZES} from '../utils/constants';
import i18n from '../translation/i18n';
import {ToastMessage} from './ToastMessage';

const SocialLogin = ({type, onLoginSuccess}) => {
  const handleGoogleLogin = async () => {
    console.log('googleeee');
    await GoogleSignin.signOut();
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('userinfoo', userInfo);
      onLoginSuccess({...userInfo?.data?.user, type: 'google'});
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        ToastMessage('Google Sign In Cancelled');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        ToastMessage('Google Sign In In Progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        ToastMessage('Play Services Not Available');
      } else {
        ToastMessage('Google Sign In Error');
        console.log('error', error);
      }
    }
  };

  const handleAppleLogin = async () => {
    console.log('apple');

    //     try {
    //       const appleAuthRequestResponse = await appleAuth.performRequest({
    //         requestedOperation: appleAuth.Operation.LOGIN,
    //         requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    //       });
    //       onLoginSuccess(appleAuthRequestResponse);
    //     } catch (error) {
    //       onLoginFailure('Apple Sign In Error');
    //     }
  };

  return (
    <>
      <TouchableOpacity style={styles.socialView} onPress={handleGoogleLogin}>
        <Google />
        <Text style={styles.socialText}>{i18n.t('join.google')}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.socialView} onPress={handleAppleLogin}>
        <Apple />
        <Text style={styles.socialText}>{i18n.t('join.apple')}</Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  socialView: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'center',
    height: 48,
    borderRadius: 12,
    backgroundColor: COLORS.social,
    marginBottom: 24,
  },
  socialText: {
    fontSize: FONT_SIZES.sixteen,
    fontFamily: FONT_FAMILIES.bold,
    color: COLORS.linear1,
  },
});

export default SocialLogin;

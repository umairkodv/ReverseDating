import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useState, useEffect} from 'react';

import BaseView from '../BaseView';
import Logo from '../../assets/svgs/logo.svg';
import {COLORS} from '../../utils/constants';
import imagePath from '../../utils/imagePath';
import {getToken, getUserPrefs} from '../../utils/UserPrefs';
import {VARIABLES} from '../../utils/globalVariables';

export default function SplashScreen(props) {
  useEffect(() => {
    Splash();
  }, []);

  const Splash = async () => {
    const token = await getToken();
    VARIABLES.details = await getUserPrefs();
    const userData = JSON.parse(VARIABLES.details);
    console.log('token', token);
    console.log('globaldeets', VARIABLES.details);

    if (token) {
      setTimeout(() => {
        props.navigation.replace('AppStackNavigator');
      }, 2000);
    } else {
      setTimeout(() => {
        props.navigation.replace('AuthStackNavigator');
      }, 2000);
    }
  };

  return (
    <BaseView
      safeView={{backgroundColor: COLORS.white}}
      topView={{flex: 0, backgroundColor: COLORS.white}}
      baseViewStyle={{backgroundColor: COLORS.white}}>
      <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
        <Logo />
      </View>
    </BaseView>
  );
}

const styles = StyleSheet.create({
  img: {},
});

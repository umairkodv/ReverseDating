import React, {useEffect, useState, useRef} from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {navigationRef} from './RouteNavigation';

import AuthStackNavigator from './AuthStackNavigator';
import AppStackNavigator from './AppNavigator';
import SplashScreen from '../screens/auth/SplashScreen';

const Stack = createNativeStackNavigator();

export default function Routes() {
  return (
    <>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator
          screenOptions={{headerShown: false}}
          initialRouteName={'SplashScreen'}>
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen
            name={'AuthStackNavigator'}
            component={AuthStackNavigator}
          />
          <Stack.Screen
            name={'AppStackNavigator'}
            component={AppStackNavigator}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Home from '../screens/app/home/Home';
import Partners from '../screens/app/partners/Partners';
import Settings from '../screens/app/settings/Settings';
import {COLORS, FONT_FAMILIES, FONT_SIZES} from '../utils/constants';
import {View, Text, StyleSheet, Image} from 'react-native';
import ActiveHome from '../assets/svgs/home.svg';
import ActivePartner from '../assets/svgs/activepartner.svg';
import ActiveSettings from '../assets/svgs/activesetting.svg';
import i18n from '../translation/i18n';
import imagePath from '../utils/imagePath';
import CatfishSearch from '../screens/app/search/CatfishSearch';
const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarShowLabel: false,
      tabBarStyle: {
        ...(Platform.OS === 'ios' && {paddingTop: 24}),
        height: 78,
        alignItems: 'center',
        backgroundColor: COLORS.tabGray,
        paddingHorizontal: 10,
      },
      tabBarHideOnKeyboard: true,
    }}>
    <Tab.Screen
      name="Home"
      component={Home}
      options={{
        tabBarIcon: ({focused}) =>
          focused ? (
            <View style={styles.tabItemContainer}>
              {/* <ActiveHome style={{marginTop: 4}} /> */}
              <Image source={imagePath.homee} />
              <Text style={styles.labelText}>{i18n.t('tab.home')}</Text>
            </View>
          ) : (
            <View style={styles.tabItemContainer2}>
              {/* <ActiveHome style={{marginTop: 4}} /> */}
              <Image source={imagePath.homee} />
              <Text style={styles.labelText1}>{i18n.t('tab.home')}</Text>
            </View>
          ),
      }}
    />
    <Tab.Screen
      name="CatfishSearch"
      component={CatfishSearch}
      options={{
        tabBarIcon: ({focused}) =>
          focused ? (
            <View style={styles.tabItemContainer}>
              {/* <ActiveHome style={{marginTop: 4}} /> */}
              <Image source={imagePath.search} />
              <Text style={styles.labelText}>{i18n.t('tab.search')}</Text>
            </View>
          ) : (
            <View style={styles.tabItemContainer2}>
              {/* <ActiveHome style={{marginTop: 4}} /> */}
              <Image source={imagePath.search} />
              <Text style={styles.labelText1}>{i18n.t('tab.search')}</Text>
            </View>
          ),
      }}
    />
    <Tab.Screen
      name="Partners"
      component={Partners}
      options={{
        tabBarIcon: ({focused}) =>
          focused ? (
            <View style={styles.tabItemContainer}>
              <ActivePartner style={{marginTop: 4}} />
              <Text style={styles.labelText}>{i18n.t('tab.partners')}</Text>
            </View>
          ) : (
            <View style={styles.tabItemContainer2}>
              <ActivePartner style={{marginTop: 4}} />
              <Text style={styles.labelText1}>{i18n.t('tab.partners')}</Text>
            </View>
          ),
      }}
    />
    <Tab.Screen
      name="Settings"
      component={Settings}
      options={{
        tabBarIcon: ({focused}) =>
          focused ? (
            <View style={styles.tabItemContainer}>
              <ActiveSettings style={{marginTop: 4}} />
              <Text style={styles.labelText}>{i18n.t('tab.settings')}</Text>
            </View>
          ) : (
            <View style={styles.tabItemContainer2}>
              <ActiveSettings style={{marginTop: 4}} />
              <Text style={styles.labelText1}>{i18n.t('tab.settings')}</Text>
            </View>
          ),
      }}
    />
  </Tab.Navigator>
);
const styles = StyleSheet.create({
  tabItemContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: COLORS.tabColor,

    height: 60,
    width: 72,
    borderRadius: 10,
    marginVertical: 10,
  },
  tabItemContainer2: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },

  labelText: {
    color: COLORS.linear1,
    fontSize: FONT_SIZES.fourteen,
    fontFamily: FONT_FAMILIES.bold,
    alignSelf: 'center',
  },
  labelText1: {
    color: COLORS.linear1,
    fontSize: FONT_SIZES.fourteen,
    fontFamily: FONT_FAMILIES.medium,
    alignSelf: 'center',
  },
});
export default BottomTabNavigator;

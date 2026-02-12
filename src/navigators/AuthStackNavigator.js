import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import GetStarted from '../screens/auth/GetStarted';
import SignUp from '../screens/auth/SignUp';
import Login from '../screens/auth/Login';
import Begin from '../screens/auth/Begin';
import NamePartner from '../screens/auth/NamePartner';
import DatingApp from '../screens/auth/DatingApp';
import Meet from '../screens/auth/Meet';
import Contact from '../screens/auth/Contact';
import Social from '../screens/auth/Social';
import Relationship from '../screens/auth/Relationship';
import Face from '../screens/auth/Face';
import Details from '../screens/auth/Details';
import AddNewPartner from '../screens/auth/AddNewPartner';
import Verification from '../screens/auth/Verification';
import NewPassword from '../screens/auth/NewPassword';

const AuthStack = createNativeStackNavigator();

const AuthStackNavigator = () => (
  <AuthStack.Navigator
    initialRouteName="GetStarted"
    screenOptions={{headerShown: false}}>
    <AuthStack.Screen name="GetStarted" component={GetStarted} />
    <AuthStack.Screen name="SignUp" component={SignUp} />
    <AuthStack.Screen name="Login" component={Login} />
    <AuthStack.Screen name="Begin" component={Begin} />
    <AuthStack.Screen name="NamePartner" component={NamePartner} />
    <AuthStack.Screen name="DatingApp" component={DatingApp} />
    <AuthStack.Screen name="Meet" component={Meet} />
    <AuthStack.Screen name="Contact" component={Contact} />
    <AuthStack.Screen name="Social" component={Social} />
    <AuthStack.Screen name="Relationship" component={Relationship} />
    <AuthStack.Screen name="Face" component={Face} />
    <AuthStack.Screen name="Details" component={Details} />
    <AuthStack.Screen name="AddNewPartner" component={AddNewPartner} />
    <AuthStack.Screen name="Verification" component={Verification} />
    <AuthStack.Screen name="NewPassword" component={NewPassword} />
  </AuthStack.Navigator>
);

export default AuthStackNavigator;

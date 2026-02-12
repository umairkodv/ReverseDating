import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomTabNavigator from './BottomTabNavigator';
import PrivacyPolicy from '../screens/app/settings/PrivacyPolicy';
import SupportForm from '../screens/app/settings/SupportForm';
import PartnerDetails from '../screens/app/partners/PartnerDetails';
import Chatlist from '../screens/app/home/Chatlist';
import ChatScreen from '../screens/app/home/ChatScreen';
import YouSaw from '../screens/app/home/infidelity/YouSaw';
import Location from '../screens/app/home/infidelity/Location';
import DateTime from '../screens/app/home/infidelity/DateTime';
import Description from '../screens/app/home/infidelity/Description';
import Email from '../screens/app/home/infidelity/Email';
import NameInfo from '../screens/app/home/infidelity/NameInfo';
import UploadEvidence from '../screens/app/home/infidelity/UploadEvidence';
import Review from '../screens/app/home/infidelity/Review';
import Thankyou from '../screens/app/home/infidelity/Thankyou';
import Wrong from '../screens/app/home/infidelity/Wrong';
import EditPartner from '../screens/app/partners/EditPartner';
import InfidelityList from '../screens/app/settings/InfidelityList';
import EditInfidelityReport from '../screens/app/settings/EditInfidelityReport';
import ChatRoom from '../screens/app/chats/ChatRoom';
import Chats from '../screens/app/chats/Chats';

const AppStack = createNativeStackNavigator();

const AppStackNavigator = () => (
  <AppStack.Navigator
    initialRouteName="BottomTabNavigator"
    screenOptions={{headerShown: false}}>
    <AppStack.Screen name="BottomTabNavigator" component={BottomTabNavigator} />
    <AppStack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
    <AppStack.Screen name="SupportForm" component={SupportForm} />
    <AppStack.Screen name="PartnerDetails" component={PartnerDetails} />
    <AppStack.Screen name="Chatlist" component={Chatlist} />
    <AppStack.Screen name="ChatScreen" component={ChatScreen} />
    <AppStack.Screen name="YouSaw" component={YouSaw} />
    <AppStack.Screen name="Location" component={Location} />
    <AppStack.Screen name="DateTime" component={DateTime} />
    <AppStack.Screen name="Description" component={Description} />
    <AppStack.Screen name="Email" component={Email} />
    <AppStack.Screen name="NameInfo" component={NameInfo} />
    <AppStack.Screen name="UploadEvidence" component={UploadEvidence} />
    <AppStack.Screen name="Review" component={Review} />
    <AppStack.Screen name="Thankyou" component={Thankyou} />
    <AppStack.Screen name="InfidelityList" component={InfidelityList} />
    <AppStack.Screen name="Wrong" component={Wrong} />
    <AppStack.Screen name="EditPartner" component={EditPartner} />
    <AppStack.Screen name="ChatRoom" component={ChatRoom} />
    <AppStack.Screen name="Chats" component={Chats} />

    <AppStack.Screen
      name="EditInfidelityReport"
      component={EditInfidelityReport}
    />
  </AppStack.Navigator>
);

export default AppStackNavigator;

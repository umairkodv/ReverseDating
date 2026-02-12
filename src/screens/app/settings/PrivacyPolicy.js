import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import BaseView from '../../BaseView';
import {COLORS, FONT_FAMILIES, FONT_SIZES} from '../../../utils/constants';
import Back from '../../../assets/svgs/back.svg';
import i18n from '../../../translation/i18n';
export default function PrivacyPolicy(props) {
  return (
    <BaseView
      safeView={{backgroundColor: COLORS.white}}
      topView={{flex: 0, backgroundColor: COLORS.white}}
      baseViewStyle={{
        backgroundColor: COLORS.white,
        paddingHorizontal: 20,
      }}>
      <View style={styles.mainView}>
        <View style={styles.settingView}>
          <TouchableOpacity onPress={() => props.navigation.goBack()}>
            <Back />
          </TouchableOpacity>
          <Text style={styles.settingText}>{i18n.t('settings.privacy')}</Text>
          <View />
        </View>
        <ScrollView>
          <Text style={{marginTop: 20, color: COLORS.black}}>
            Privacy Policy for Reverse Dating  Reverse Dating ("we", "our",
            "us") is committed to protecting your privacy. This Privacy Policy
            explains how we collect, use, disclose, and safeguard your
            information when you use our mobile application Reverse Dating,
            including any related services (the "Service").  1. Information We
            Collect  1.1. Information You Provide to Us: - Account Information:
            When you register for an account, we collect your username, email
            address, and password. - Profile Information: You may choose to
            provide additional information such as your age, gender, interests,
            and profile picture.  1.2. Information We Collect Automatically: -
            Usage Information: We collect information about your interactions
            with the Service, such as the profiles you view, matches made, and
            messages exchanged. - Device Information: We automatically collect
            device information such as device model, operating system version,
            unique device identifiers, and mobile network information.  2. Use
            of Your Information  2.1. Provide and Personalize the Service: To
            create and manage your account, personalize your experience, and
            provide the features of the Service.   2.2. Matchmaking and
            Communication: To facilitate matching with other users based on
            shared relationship histories and enable communication between
            matched users.  2.3. Improve the Service: To analyze usage trends,
            conduct research, and improve our Service's functionality and user
            experience.  2.4. Marketing and Promotions: With your consent, we
            may send you promotional messages, special offers, and updates about
            our Service.  3. Sharing of Your Information  3.1. With Other Users:
            Your profile information (excluding sensitive information) may be
            visible to other users for the purpose of facilitating matches and
            communication.  3.2. Service Providers: We may share your
            information with third-party service providers who assist us in
            providing the Service, such as hosting, analytics, and customer
            support services.  3.3. Legal Compliance: We may disclose your
            information if required to do so by law or in response to valid
            requests by public authorities (e.g., court orders, law
            enforcement).  4. Security of Your Information  We take reasonable
            measures to protect your information from unauthorized access, use,
            or disclosure. However, please be aware that no method of
            transmission over the internet or method of electronic storage is
            completely secure.  5. Your Choices  You can manage your account
            settings and preferences within the app. You may choose to limit the
            information you provide or opt-out of certain communications.  6.
            Children's Privacy  Our Service is not intended for use by
            individuals under the age of 18. We do not knowingly collect
            personal information from individuals under 18 without parental
            consent.  7. Changes to This Privacy Policy  We may update this
            Privacy Policy from time to time. We will notify you of any changes
            by posting the new Privacy Policy on this page.  8. Contact Us  If
            you have any questions about this Privacy Policy, please contact us.
          </Text>
        </ScrollView>
      </View>
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
  },
});

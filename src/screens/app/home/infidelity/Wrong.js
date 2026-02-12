import {useState} from 'react';
import BaseView from '../../../BaseView';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  ScrollView,
  Platform,
} from 'react-native';
import CustomTextInput from '../../../../components/CustomTextInput';
import CustomButton from '../../../../components/CustomButton';
import {COLORS, FONT_FAMILIES, FONT_SIZES} from '../../../../utils/constants';
import i18n from '../../../../translation/i18n';
import Untick from '../../../../assets/svgs/untick.svg';
import Back from '../../../../assets/svgs/back.svg';
import Red from '../../../../assets/svgs/redCross.svg';
import LinearGradient from 'react-native-linear-gradient';
import TextComponent from '../../../../components/TextComponent';

export default function Wrong(props) {
  const handleNext = () => {
    // props.navigation.navigate('BottomTabNavigator');
  };

  return (
    <BaseView
      safeView={{backgroundColor: COLORS.white}}
      topView={{flex: 0, backgroundColor: COLORS.white}}
      baseViewStyle={{
        backgroundColor: COLORS.white,
        paddingHorizontal: 20,
      }}>
      <ScrollView scrollEnabled={false} showsVerticalScrollIndicator={false}>
        <TouchableOpacity
          onPress={() => props.navigation.goBack()}
          style={{marginTop: 20}}>
          <Back />
        </TouchableOpacity>
        <View style={styles.mainView}>
          <Red style={{alignSelf: 'center'}} />
          <Text style={styles.basicText}>{i18n.t('review.something')}</Text>
          <Text style={styles.basicText2}>{i18n.t('review.there')}</Text>

          <TouchableOpacity
            onPress={() => props.navigation.navigate('BottomTabNavigator')}>
            <LinearGradient
              colors={[COLORS.linear1, COLORS.linear2]}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={styles.gradientBorder}>
              <View style={styles.button}>
                <TextComponent
                  text={i18n.t('review.home')}
                  textStyle={{fontSize: FONT_SIZES.sixteen}}
                />
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </BaseView>
  );
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    marginTop: 100,
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
    marginTop: 50,
  },
  basicText: {
    color: COLORS.black,
    fontSize: FONT_SIZES.eighteen,
    fontFamily: FONT_FAMILIES.bold,
    marginTop: 30,
    textAlign: 'center',
  },
  basicText2: {
    color: COLORS.black,
    fontSize: FONT_SIZES.fourteen,
    fontFamily: FONT_FAMILIES.semiBold,
    lineHeight: 25,
    textAlign: 'center',
    marginTop: 10,
  },
  gradientBorder: {
    padding: 1,
    borderRadius: 12,
    marginTop: 20,
  },
  gradientBackground: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderRadius: 12,
  },
  buttonText: {
    fontSize: FONT_SIZES.eighteen,
    color: COLORS.white,
    fontFamily: FONT_FAMILIES.regular,
  },
  button: {
    height: 48,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

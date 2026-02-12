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
import Green from '../../../../assets/svgs/greenTick.svg';

export default function Thankyou(props) {
  const handleNext = () => {
    props.navigation.navigate('BottomTabNavigator');
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
        <View style={styles.mainView}>
          <Green style={{alignSelf: 'center'}} />
          <Text style={styles.basicText}>{i18n.t('review.thank')}</Text>
          <Text style={styles.basicText2}>{i18n.t('review.your')}</Text>

          <CustomButton
            title={i18n.t('review.home')}
            style={{marginTop: 30}}
            onPress={handleNext}
          />
        </View>
      </ScrollView>
    </BaseView>
  );
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    marginTop: 140,
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
});

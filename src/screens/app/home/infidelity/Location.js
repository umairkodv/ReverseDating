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
import Tick from '../../../../assets/svgs/tick.svg';

export default function Location(props) {
  const [location, setLocation] = useState('');
  const cheaterName = props?.route?.params?.cheaterName;
  console.log('cheatername', cheaterName);
  const handleNext = () => {
    props.navigation.navigate('DateTime', {
      cheaterName,
      location: location,
    });
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
          <Text style={styles.basicText}>{i18n.t('infidelity.location')}</Text>
          <CustomTextInput
            placeholder={i18n.t('infidelity.where')}
            inputContainerStyle={{marginTop: 20, marginBottom: 10}}
            value={location}
            onChangeText={setLocation}
          />
          <CustomButton
            title={i18n.t('infidelity.next')}
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
    marginTop: 50,
  },
  basicText2: {
    color: COLORS.black,
    fontSize: FONT_SIZES.twelve,
    fontFamily: FONT_FAMILIES.regular,
  },
  skip: {
    color: COLORS.black,
    fontSize: FONT_SIZES.sixteen,
    fontFamily: FONT_FAMILIES.bold,
    textDecorationLine: 'underline',
    textAlign: 'right',
    marginTop: 14,
  },
  ongoingView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  ongoingText: {
    color: COLORS.black,
    fontSize: FONT_SIZES.fourteen,
    fontFamily: FONT_FAMILIES.bold,
  },
  inputStyleDescribe: {
    // flex: 1,
    height: 141,
    backgroundColor: COLORS.lightGray,
    borderRadius: 12,
    marginBottom: 16,
    paddingHorizontal: 20,
    justifyContent: 'center',
    paddingVertical: 10,
    marginTop: 10,
  },
  inputStyleDescribe2: {
    // flex: 1,
    height: 141,
    backgroundColor: COLORS.lightGray,
    borderRadius: 12,
    marginBottom: 16,
    paddingHorizontal: 20,
    justifyContent: 'center',
    paddingTop: 10,
    marginTop: 10,
  },
  contentContainer: {
    flex: 1,
  },
  textinputStyle: {
    color: COLORS.textGray,
    fontSize: FONT_SIZES.sixteen,
    fontFamily: FONT_FAMILIES.regular,
    padding: 0,
    flex: 1,
  },
});

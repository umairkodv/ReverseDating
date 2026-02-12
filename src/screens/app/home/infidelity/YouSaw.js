import {useState} from 'react';
import BaseView from '../../../BaseView';
import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import CustomTextInput from '../../../../components/CustomTextInput';
import CustomButton from '../../../../components/CustomButton';
import {COLORS, FONT_FAMILIES, FONT_SIZES} from '../../../../utils/constants';
import i18n from '../../../../translation/i18n';
import Untick from '../../../../assets/svgs/untick.svg';
import Back from '../../../../assets/svgs/back.svg';
import Tick from '../../../../assets/svgs/tick.svg';
import {ToastMessage} from '../../../../components/ToastMessage';

export default function YouSaw(props) {
  const [fullName, setFullName] = useState('');
  const [toggle, setToggle] = useState(false);
  const handleNext = () => {
    if (!fullName) {
      ToastMessage('Name is required');
      return;
    }
    props.navigation.navigate('Location', {
      cheaterName: fullName,
    });
  };
  const handleToggle = () => {
    setToggle(!toggle);
  };

  return (
    <BaseView
      safeView={{backgroundColor: COLORS.white}}
      topView={{flex: 0, backgroundColor: COLORS.white}}
      baseViewStyle={{
        backgroundColor: COLORS.white,
        paddingHorizontal: 20,
      }}>
      <TouchableOpacity
        onPress={() => props.navigation.goBack()}
        style={{marginTop: 20}}>
        <Back />
      </TouchableOpacity>
      <View style={styles.mainView}>
        <Text style={styles.basicText}>
          {i18n.t('infidelity.enter')}
          <Text style={styles.basicText2}>{i18n.t('infidelity.if')}</Text>
        </Text>
        <CustomTextInput
          placeholder={'Name of the person you saw'}
          inputContainerStyle={{marginTop: 20, marginBottom: 10}}
          value={fullName}
          onChangeText={setFullName}
        />

        <CustomButton
          title={i18n.t('infidelity.next')}
          style={{marginTop: 30}}
          onPress={handleNext}
        />
      </View>
    </BaseView>
  );
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    marginTop: 120,
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
});

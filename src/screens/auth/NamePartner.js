import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import BaseView from '../BaseView';
import {COLORS, FONT_FAMILIES, FONT_SIZES} from '../../utils/constants';
import Back from '../../assets/svgs/back.svg';
import Text1 from '../../assets/svgs/text1.svg';
import i18n from '../../translation/i18n';
import CustomTextInput from '../../components/CustomTextInput';
import CustomButton from '../../components/CustomButton';
import ProgressBar from '../../components/ProgressBar';
import FullNameModal from '../modals/FullNameModal';
import imagePath from '../../utils/imagePath';
import {ToastMessage} from '../../components/ToastMessage';

export default function NamePartner(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [fullName, setfullName] = useState('');

  const checkRequiredFields = () => {
    if (fullName.trim() == '') {
      ToastMessage(i18n.t('toastMessage.fullname'));
      return false;
    } else {
      return true;
    }
  };

  const handleNext = () => {
    const isValid = checkRequiredFields();
    if (isValid) {
      props.navigation.navigate('Details', {partnerName: fullName});
    }
  };

  return (
    <BaseView
      safeView={{backgroundColor: COLORS.white}}
      topView={{flex: 0, backgroundColor: COLORS.white}}
      baseViewStyle={{
        backgroundColor: COLORS.white,
        paddingHorizontal: 20,
      }}>
      <View style={styles.mainView}>
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <Back />
        </TouchableOpacity>
        <ProgressBar progress={12.5} />
        <Image source={imagePath.name} style={styles.joinText} />
        <Text style={styles.basicText}>{i18n.t('question.basic')}</Text>
        <CustomTextInput
          placeholder={'Full Name'}
          inputContainerStyle={{marginTop: 20}}
          value={fullName}
          onChangeText={setfullName}
        />
        <CustomButton
          title={i18n.t('question.next')}
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
    marginTop: 20,
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
  },
  skipView: {
    alignSelf: 'flex-end',

    marginTop: 14,
  },
});

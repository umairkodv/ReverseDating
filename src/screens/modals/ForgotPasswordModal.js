import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import Modal from 'react-native-modal';
// import Cross from '../../assets/svgs/cross.svg';
import i18n from '../../translation/i18n';
import imagePath from '../../utils/imagePath';
// import Messg from '../../assets/svgs/messg.svg';
import {
  COLORS,
  FONT_FAMILIES,
  FONT_SIZES,
  FONT_WEIGHT,
} from '../../utils/constants';
import CustomButton from '../../components/CustomButton';
import TextComponent from '../../components/TextComponent';
import {ToastMessage} from '../../components/ToastMessage';
// import {ToastMessage} from '../../components/ToastMessage';

export default function ForgotPasswordModal(props) {
  const {closeModal, visible, navigation, handleVerify} = props;
  const [email, setEmail] = useState('');
  const checkRequiredFields = () => {
    const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    if (!emailPattern.test(email.trim())) {
      ToastMessage(i18n.t('toastMessage.emailPattern'));
      return false;
    } else {
      return true;
    }
  };
  const handlePress = () => {
    const isValid = checkRequiredFields();
    if (isValid) {
      closeModal();
      setTimeout(() => {
        handleVerify(email);
      }, 500);
    }
  };
  return (
    <Modal
      animationIn={'fadeIn'}
      animationOut={'fadeOut'}
      onBackdropPress={closeModal}
      backdropOpacity={0.5}
      isVisible={visible}
      transparent={true}>
      <View style={styles.modalView}>
        <View style={styles.ceneteredView}>
          <TextComponent text={i18n.t('forgot.reset')} />
          {/* <Text style={styles.deleteText}>{i18n.t('forgot.reset')}</Text> */}
        </View>
        <Text style={styles.longText}>{i18n.t('forgot.enter')}</Text>
        <View style={styles.inputView}>
          {/* <Messg /> */}
          <TextInput
            placeholder={i18n.t('forgot.email')}
            style={styles.inputStyle}
            placeholderTextColor={COLORS.textGray}
            selectionColor={COLORS.primary}
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <View style={styles.buttonView}>
          <CustomButton
            style={{height: 40}}
            title={i18n.t('forgot.send')}
            onPress={handlePress}
            textStyle={{fontSize: FONT_SIZES.twelve}}
          />
          <TouchableOpacity onPress={closeModal}>
            <Text style={styles.cancelText}>{i18n.t('forgot.cancel')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalView: {
    backgroundColor: COLORS.white,
    height: 260,
    width: '100%',
    borderRadius: 16,
    paddingHorizontal: 20,
  },
  crossImg: {},
  ceneteredView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    justifyContent: 'center',
  },
  deleteText: {
    fontSize: FONT_SIZES.sixteen,
    color: '#333333',
    fontFamily: FONT_FAMILIES.medium,

    lineHeight: 30,
    textAlign: 'center',
  },
  buttonView: {
    marginTop: 32,
  },

  longText: {
    fontSize: FONT_SIZES.twelve,
    color: COLORS.black,
    fontFamily: FONT_FAMILIES.regular,
    lineHeight: 16,
    marginBottom: 10,
    marginTop: 20,
  },
  emailText: {
    fontSize: FONT_SIZES.sixteen,
    fontFamily: FONT_FAMILIES.fontFamily,
    color: '#000000CC',

    marginBottom: 8,
    marginTop: 10,
  },
  emailInputView: {
    backgroundColor: '#c9c9c940',
    height: 50,
    paddingHorizontal: 14,
    borderRadius: 6,
    justifyContent: 'center',
    marginBottom: 55,
  },
  inputStyle: {
    fontSize: FONT_SIZES.twelve,
    color: COLORS.black,
    fontFamily: FONT_FAMILIES.regular,
    flex: 1,
  },
  inputView: {
    height: 48,
    borderWidth: 1,
    borderColor: COLORS.textGray2,
    borderRadius: 12,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 8,
  },
  cancelText: {
    fontSize: FONT_SIZES.twelve,
    color: COLORS.black,
    fontFamily: FONT_FAMILIES.regular,
    alignSelf: 'center',
    marginTop: 10,
  },
});

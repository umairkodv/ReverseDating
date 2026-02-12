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
import Cross from '../../assets/svgs/cross.svg';
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
// import {ToastMessage} from '../../components/ToastMessage';
import Untick from '../../assets/svgs/untick.svg';

import Tick from '../../assets/svgs/tick.svg';
export default function ContactModal(props) {
  const {closeModal, visible, navigation, handleVerify, handleToggle} = props;
  const [toggle, setToggle] = useState(false);
  const handleToggleClicked = () => {
    setToggle(true);
    handleToggle();
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
        <TouchableOpacity style={styles.crossView} onPress={closeModal}>
          <Cross />
        </TouchableOpacity>

        <Text style={styles.mainText}>{i18n.t('popups.ex')}</Text>
        <Text style={styles.contextText}>{i18n.t('popups.facilitate')}</Text>
        <View style={styles.pointerView}>
          <Text style={styles.pointText}>
            {'\u2022  ' + i18n.t('popups.phone')}
          </Text>
          <Text style={styles.pointText}>
            {'\u2022  ' + i18n.t('popups.email')}
          </Text>
        </View>
        <Text style={styles.contextText}>{i18n.t('popups.info')}</Text>
        <View style={styles.ongoingView}>
          <TouchableOpacity onPress={handleToggleClicked}>
            {toggle ? <Tick /> : <Untick />}
          </TouchableOpacity>
          <Text style={styles.ongoingText}>{i18n.t('popups.dont')}</Text>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalView: {
    backgroundColor: COLORS.white,
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
  mainText: {
    fontSize: FONT_SIZES.sixteen,
    color: COLORS.black,
    fontFamily: FONT_FAMILIES.bold,
    textAlign: 'center',
    marginVertical: 20,
    lineHeight: 24,
  },
  contextText: {
    fontSize: FONT_SIZES.fourteen,
    color: COLORS.black,
    fontFamily: FONT_FAMILIES.medium,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 24,
  },
  crossView: {
    alignSelf: 'flex-end',
    marginTop: 20,
  },
  ongoingView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 14,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: COLORS.linear1,
    paddingHorizontal: 20,
    marginBottom: 30,
    marginTop: 10,
    borderRadius: 12,
  },
  ongoingText: {
    color: COLORS.black,
    fontSize: FONT_SIZES.fourteen,
    fontFamily: FONT_FAMILIES.semiBold,
  },
  pointText: {
    fontSize: FONT_SIZES.fourteen,
    color: COLORS.black,
    fontFamily: FONT_FAMILIES.medium,
    textAlign: 'center',
    lineHeight: 20,
    marginTop: -6,
    marginBottom: 4,
  },
  pointerView: {
    alignItems: 'flex-start',
    paddingHorizontal: 30,
    marginBottom: 6,
  },
});

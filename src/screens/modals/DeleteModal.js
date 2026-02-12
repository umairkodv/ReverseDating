import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import i18n from '../../translation/i18n';
import imagePath from '../../utils/imagePath';
import {COLORS, FONT_FAMILIES, FONT_SIZES} from '../../utils/constants';
import CustomButton from '../../components/CustomButton';
import TextComponent from '../../components/TextComponent';

export default function DeleteModal({
  closeModal,
  visible,
  navigation,
  handleDelete,
}) {
  const handleYes = () => {
    closeModal();
    setTimeout(() => {
      handleDelete();
    }, 500);
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
          {/* <Image style={styles.logoutimg} source={imagePath.logout1} /> */}
          <TextComponent
            textStyle={{fontSize: FONT_SIZES.twentyTwo}}
            text={i18n.t('logout.heading')}
          />
          <Text style={styles.areText}>{i18n.t('logout.del')}</Text>
        </View>
        <View style={styles.buttonView}>
          <CustomButton
            style={{height: 40}}
            title={i18n.t('forgot.delete')}
            onPress={handleYes}
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
    height: 250,
    width: '100%',
    borderRadius: 16,
    paddingHorizontal: 20,
  },
  crossImg: {
    alignSelf: 'flex-end',
    marginTop: 11,
    position: 'absolute',
    right: 16,
    zIndex: 1,
  },
  ceneteredView: {
    marginTop: 20,
    alignItems: 'center',
    paddingHorizontal: 20,
    flex: 1,
  },
  deleteText: {
    fontSize: FONT_SIZES.twentyFour,
    color: COLORS.black,
    fontFamily: FONT_FAMILIES.semiBold,
    lineHeight: 30,
    textAlign: 'center',
    marginTop: 14,
  },
  areText: {
    fontSize: FONT_SIZES.eighteen,
    color: COLORS.black,
    fontFamily: FONT_FAMILIES.medium,
    lineHeight: 20,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 12,
  },

  logoutimg: {
    height: 34,
    width: 34,
  },
  buttonView: {
    marginTop: 12,
  },
  cancelText: {
    fontSize: FONT_SIZES.twelve,
    color: COLORS.black,
    fontFamily: FONT_FAMILIES.regular,
    alignSelf: 'center',
    marginVertical: 16,
  },
});

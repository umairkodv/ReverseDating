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

export default function LockModal({
  closeModal,
  visible,
  navigation,
  handleUnlock,
}) {
  const handleYes = () => {
    closeModal();
    setTimeout(() => {
      handleUnlock();
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

          <Text style={styles.areText}>
            ReverseDating is completely free right now. Once we reach 1 million
            users, a $2/month or $24/year subscription will be required to
            access match results. Join now and help us grow—spread the word to
            unlock them!
          </Text>
        </View>
        <View style={styles.buttonView}>
          <CustomButton
            style={{height: 40, paddingHorizontal: 50}}
            title={'Got it!'}
            onPress={closeModal}
            textStyle={{fontSize: FONT_SIZES.sixteen, color: COLORS.white}}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalView: {
    backgroundColor: COLORS.white,
    // height: 370,
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
    // flex: 1,
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
    lineHeight: 24,
    textAlign: 'center',
    marginTop: 16,
  },
  areText2: {
    fontSize: FONT_SIZES.eighteen,
    color: COLORS.black,
    fontFamily: FONT_FAMILIES.medium,
    lineHeight: 24,
    textAlign: 'center',
    marginTop: 22,
    marginBottom: 18,
  },

  logoutimg: {
    height: 34,
    width: 34,
  },
  buttonView: {
    marginTop: 20,
    marginBottom: 26,
  },
  cancelText: {
    fontSize: FONT_SIZES.twelve,
    color: COLORS.black,
    fontFamily: FONT_FAMILIES.regular,
    alignSelf: 'center',
    marginVertical: 16,
  },
});

import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Back from '../../../assets/svgs/back.svg';
import React from 'react';
import BaseView from '../../BaseView';
import {COLORS, FONT_FAMILIES, FONT_SIZES} from '../../../utils/constants';
import imagePath from '../../../utils/imagePath';

export default function ChatScreen(props) {
  return (
    <BaseView
      safeView={{backgroundColor: COLORS.white}}
      topView={{flex: 0, backgroundColor: COLORS.white}}
      baseViewStyle={{
        backgroundColor: COLORS.white,
        paddingHorizontal: 20,
      }}>
      <View style={styles.mainView}>
        <View style={styles.headerView}>
          <TouchableOpacity onPress={() => props.navigation.goBack()}>
            <Back />
          </TouchableOpacity>
          <Image source={imagePath.person} />
          <Text style={styles.nameText}>Anonymous </Text>
        </View>
      </View>
    </BaseView>
  );
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    marginTop: 20,
  },
  headerView: {
    height: 54,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
    gap: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.textGray,
  },
  nameText: {
    color: COLORS.black,
    fontSize: FONT_SIZES.sixteen,
    fontFamily: FONT_FAMILIES.semiBold,
  },
});

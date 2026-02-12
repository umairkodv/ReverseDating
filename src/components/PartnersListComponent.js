import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {COLORS, FONT_FAMILIES, FONT_SIZES} from '../utils/constants';
import imagePath from '../utils/imagePath';
import Bin from '../assets/svgs/Button.svg';
import {useNavigation} from '@react-navigation/native';
import {deletePartnerApi} from '../services/actions/AppApi';
import {ToastMessage} from './ToastMessage';
import {VARIABLES} from '../utils/globalVariables';
import Edit from '../assets/svgs/editPartner.svg';

export default function PartnersListComponent({data, handleRefresh}) {
  console.log('data', data);
  const userData = JSON.parse(VARIABLES.details);
  const navigation = useNavigation();
  const base64Image = data?.partnerImages
    ? `data:image/png;base64,${data?.partnerImages[0]}`
    : '';
  console.log('baseeeeconverted', base64Image);
  console.log('userdifd', userData?._id);
  const handleDelete = async () => {
    const response = await deletePartnerApi(userData?._id, data?._id);
    console.log('repsonseformdeletPartner', response);
    if (response?.statusCode === 200) {
      handleRefresh();
    } else {
      ToastMessage(response?.data?.message);
    }
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate('PartnerDetails', {data: data})}>
      <View style={styles.imgTextView}>
        <Image
          source={
            data?.partnerImages?.length > 0
              ? {uri: base64Image}
              : imagePath.profile
          }
          style={styles.image}
        />
        <View style={styles.nameView}>
          <Text style={styles.nameText} numberOfLines={1}>
            {data?.partnerName}
          </Text>
          <Text style={styles.dateText}>{data?.datingAppName}</Text>
        </View>
      </View>
      <View style={styles.binEditView}>
        <TouchableOpacity
          onPress={() => navigation.navigate('EditPartner', {data: data})}>
          <Edit />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleDelete}>
          <Bin />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 84,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.primary,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 24,
    gap: 20,
  },
  nameText: {
    color: COLORS.black,
    fontSize: FONT_SIZES.sixteen,
    fontFamily: FONT_FAMILIES.bold,
  },
  dateText: {
    color: COLORS.black,
    fontSize: FONT_SIZES.twelve,
    fontFamily: FONT_FAMILIES.regular,
  },
  imgTextView: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
    flex: 1,
  },
  nameView: {
    gap: 12,
    alignItems: 'flex-start',
    flex: 1,
  },
  image: {
    height: 56,
    width: 56,
    borderRadius: 28,
  },
  binEditView: {
    flexDirection: 'row',
    gap: 10,
  },
});

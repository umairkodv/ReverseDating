import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Edit from '../assets/svgs/editPartner.svg';
import Bin from '../assets/svgs/Button.svg';
import imagePath from '../utils/imagePath';
import {COLORS, FONT_FAMILIES, FONT_SIZES} from '../utils/constants';
import {useNavigation} from '@react-navigation/native';
import {deleteInfidelityApi} from '../services/actions/AppApi';
import {VARIABLES} from '../utils/globalVariables';
import {ToastMessage} from './ToastMessage';

export default function InfidelityListCompoennt({data, handleRefresh}) {
  console.log('datafromreports', data);
  const userData = JSON.parse(VARIABLES.details);
  const navigation = useNavigation();

  const handleDelete = async () => {
    const response = await deleteInfidelityApi(userData?._id, data?._id);
    console.log('repsonseformdeletPartner', response);
    if (response?.statusCode === 200) {
      setTimeout(() => {
        handleRefresh();
      }, 300);
    } else {
      ToastMessage(response?.data?.message);
    }
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate('EditInfidelityReport', {data: data})}>
      <View style={styles.imgTextView}>
        <Image
          source={
            data?.evidenceMedia?.length > 0
              ? {uri: data?.evidenceMedia[0]?.path}
              : imagePath.profile
          }
          style={styles.image}
        />
        <View style={styles.nameView}>
          <Text style={styles.nameText} numberOfLines={1}>
            {data?.cheaterName}
          </Text>
          <Text style={styles.dateText}>{/* {data?.datingAppName} */}</Text>
        </View>
      </View>
      <View style={styles.binEditView}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('EditInfidelityReport', {data: data})
          }>
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

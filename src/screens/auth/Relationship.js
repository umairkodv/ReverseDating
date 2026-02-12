import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import BaseView from '../BaseView';
import {
  COLORS,
  FONT_FAMILIES,
  FONT_SIZES,
  selectSocial,
} from '../../utils/constants';
import Back from '../../assets/svgs/back.svg';
import Text2 from '../../assets/svgs/text2.svg';
import Drop from '../../assets/svgs/drop.svg';

import i18n from '../../translation/i18n';
import CustomTextInput from '../../components/CustomTextInput';
import CustomButton from '../../components/CustomButton';
import {SelectList} from 'react-native-dropdown-select-list';
import ProgressBar from '../../components/ProgressBar';
import RelationshipModal from '../modals/RelationshipModal';
import imagePath from '../../utils/imagePath';
import {ToastMessage} from '../../components/ToastMessage';
export default function Relationship(props) {
  const [social, setSocial] = useState('');

  const partnerName = props?.route?.params?.partnerName;
  const relationshipStartDate = props.route?.params?.relationshipStartDate;
  const relationshipEndDate = props.route?.params?.relationshipEndDate;
  const relationshipOngoingStatus =
    props.route?.params?.relationshipOngoingStatus;

  console.log(
    partnerName,
    relationshipStartDate,
    relationshipEndDate,
    relationshipOngoingStatus,
  );

  const handleNext = () => {
    if (social == '') {
      ToastMessage('Please fill out the details.');
    } else {
      props.navigation.navigate('DatingApp', {
        partnerName,
        relationshipStartDate,
        relationshipEndDate,
        relationshipOngoingStatus,
        relationshipStatus: social,
      });
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
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 40}
          style={styles.contentContainer}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <TouchableOpacity onPress={() => props.navigation.goBack()}>
              <Back />
            </TouchableOpacity>

            <ProgressBar progress={37.5} />
            <Image source={imagePath.addd} style={styles.joinText} />

            <SelectList
              boxStyles={styles.boxStyle}
              setSelected={val => setSocial(val)}
              data={selectSocial}
              save="value"
              search={false}
              maxHeight={250}
              inputStyles={{
                ...styles.inputStyle,
                color: social === '' ? COLORS.textGray : COLORS.black,
              }}
              placeholder={i18n.t('question.status')}
              dropdownTextStyles={styles.dropdownText}
              dropdownStyles={styles.dropdownStyles}
              arrowicon={<Drop />}
            />

            <CustomButton
              title={i18n.t('question.next')}
              style={{marginTop: 30}}
              // onPress={() => props.navigation.navigate('Face')}
              onPress={handleNext}
            />
            <TouchableOpacity
              style={styles.skipView}
              onPress={() =>
                props.navigation.navigate('DatingApp', {
                  partnerName,

                  relationshipStartDate,
                  relationshipEndDate,
                  relationshipOngoingStatus,
                  relationshipStatus: '',
                })
              }>
              <Text style={styles.skip}>{i18n.t('question.skip')}</Text>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
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
  inputStyle: {
    color: COLORS.black,
    fontSize: FONT_SIZES.sixteen,
    fontFamily: FONT_FAMILIES.regular,
  },
  boxStyle: {
    height: 56,
    backgroundColor: COLORS.lightGray,
    borderRadius: 12,
    marginBottom: 5,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    borderColor: COLORS.primary,
    borderWidth: 1,
    alignItems: 'center',
    marginTop: 22,
  },
  dropdownStyles: {
    backgroundColor: COLORS.lightGray,
    borderRadius: 12,
    borderColor: COLORS.primary,
    borderWidth: 1,
  },
  dropdownText: {
    color: COLORS.textGray,
    fontSize: FONT_SIZES.sixteen,
    fontFamily: FONT_FAMILIES.regular,
  },
  inputStyleDescribe: {
    flex: 1,
    height: 141,
    backgroundColor: COLORS.lightGray,
    borderRadius: 12,
    marginBottom: 16,
    paddingHorizontal: 20,
    justifyContent: 'center',
    paddingVertical: 10,
    marginTop: 20,
  },
  inputStyleDescribe2: {
    flex: 1,
    height: 141,
    backgroundColor: COLORS.lightGray,
    borderRadius: 12,
    marginBottom: 16,
    paddingHorizontal: 20,
    justifyContent: 'center',
    paddingTop: 10,
    marginTop: 20,
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
  joinText: {
    alignSelf: 'center',
    resizeMode: 'contain',
    width: '100%',
    marginTop: 50,
  },
  skipView: {
    alignSelf: 'flex-end',
    marginTop: 14,
  },
});

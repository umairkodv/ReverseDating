import {useState} from 'react';
import BaseView from '../../../BaseView';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  ScrollView,
  Platform,
} from 'react-native';
import CustomTextInput from '../../../../components/CustomTextInput';
import CustomButton from '../../../../components/CustomButton';
import {COLORS, FONT_FAMILIES, FONT_SIZES} from '../../../../utils/constants';
import i18n from '../../../../translation/i18n';
import Untick from '../../../../assets/svgs/untick.svg';
import Back from '../../../../assets/svgs/back.svg';
import Tick from '../../../../assets/svgs/tick.svg';

export default function Description(props) {
  const [description, setDescription] = useState('');
  const location = props?.route?.params?.location;
  const cheaterName = props?.route?.params?.cheaterName;
  const incidentDate = props?.route?.params?.incidentDate;
  const incidentTime = props?.route?.params?.incidentTime;

  const handleNext = () => {
    props.navigation.navigate('Email', {
      incidentDate,
      incidentTime,
      cheaterName,
      location,
      description: description,
    });
  };

  return (
    <BaseView
      safeView={{backgroundColor: COLORS.white}}
      topView={{flex: 0, backgroundColor: COLORS.white}}
      baseViewStyle={{
        backgroundColor: COLORS.white,
        paddingHorizontal: 20,
      }}>
      <ScrollView scrollEnabled={false} showsVerticalScrollIndicator={false}>
        <TouchableOpacity
          onPress={() => props.navigation.goBack()}
          style={{marginTop: 20}}>
          <Back />
        </TouchableOpacity>
        <View style={styles.mainView}>
          <Text style={styles.basicText}>{i18n.t('infidelity.desc')}</Text>

          <CustomTextInput
            placeholder={i18n.t('infidelity.describe')}
            inputContainerStyle={
              Platform.OS === 'ios'
                ? styles.inputStyleDescribe
                : styles.inputStyleDescribe2
            }
            inputStyle={styles.textinputStyle}
            multiline
            textAlignVertical="top"
            value={description}
            onChangeText={text => setDescription(text)} // Bind description state
          />
          <CustomButton
            title={i18n.t('infidelity.next')}
            style={{marginTop: 30}}
            onPress={handleNext}
          />
        </View>
      </ScrollView>
    </BaseView>
  );
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    marginTop: 100,
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
  inputStyleDescribe: {
    // flex: 1,
    height: 141,
    backgroundColor: COLORS.lightGray,
    borderRadius: 12,
    marginBottom: 16,
    paddingHorizontal: 20,
    justifyContent: 'center',
    paddingVertical: 10,
    marginTop: 10,
  },
  inputStyleDescribe2: {
    // flex: 1,
    height: 141,
    backgroundColor: COLORS.lightGray,
    borderRadius: 12,
    marginBottom: 16,
    paddingHorizontal: 20,
    justifyContent: 'center',
    paddingTop: 10,
    marginTop: 10,
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
});

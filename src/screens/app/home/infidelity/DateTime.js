import {useState} from 'react';
import BaseView from '../../../BaseView';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  ScrollView,
} from 'react-native';
import CustomTextInput from '../../../../components/CustomTextInput';
import Calendar from '../../../../assets/svgs/calendar.svg';
import Clock from '../../../../assets/svgs/clock.svg';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import CustomButton from '../../../../components/CustomButton';
import {COLORS, FONT_FAMILIES, FONT_SIZES} from '../../../../utils/constants';
import i18n from '../../../../translation/i18n';
import Untick from '../../../../assets/svgs/untick.svg';
import Back from '../../../../assets/svgs/back.svg';
import Tick from '../../../../assets/svgs/tick.svg';
import moment from 'moment';

export default function DateTime(props) {
  const location = props?.route?.params?.location;
  const cheaterName = props?.route?.params?.cheaterName;
  console.log('infooo', location, cheaterName);

  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  console.log('dattime', date, time);
  const [timePickerVisible, setTimePickerVisible] = useState(false);
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };
  const showTimePicker = () => {
    setTimePickerVisible(true);
  };

  const handleTimeConfirm = time => {
    setTime(moment(time).format('hh:mm A'));
    hideTimePicker();
  };

  const handleDateConfirm = date => {
    setDate(moment(date).format('LL'));
    hideDatePicker();
  };
  const hideTimePicker = () => {
    setTimePickerVisible(false);
  };

  console.log(
    'datee',
    moment(date, 'LL').format('YYYY/MM/DD'),
    'time',
    moment(time, 'hh:mm A').format('HH:MM'),
  );

  const handleNext = () => {
    props.navigation.navigate('Description', {
      incidentDate: date,
      incidentTime: time,
      cheaterName,
      location,
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
          <Text style={styles.basicText}>{i18n.t('infidelity.date')}</Text>
          <TouchableOpacity style={styles.dateView} onPress={showDatePicker}>
            <Calendar />
            <Text style={styles.metText}>
              {date === '' ? i18n.t('infidelity.dateyou') : date}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.dateView} onPress={showTimePicker}>
            <Clock fillColor={COLORS.black} />
            <Text style={styles.metText}>
              {time === '' ? i18n.t('infidelity.around') : time}
            </Text>
          </TouchableOpacity>
          <CustomButton
            title={i18n.t('infidelity.next')}
            style={{marginTop: 30}}
            onPress={handleNext}
          />
        </View>
      </ScrollView>
      <DateTimePickerModal
        isVisible={datePickerVisible}
        display="spinner"
        mode="date"
        onConfirm={handleDateConfirm}
        onCancel={hideDatePicker}
        maximumDate={new Date()}
      />
      <DateTimePickerModal
        isVisible={timePickerVisible}
        mode="time"
        onConfirm={handleTimeConfirm}
        onCancel={hideTimePicker}
      />
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
  dateView: {
    height: 50,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.primary,
    flexDirection: 'row',
    gap: 14,
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 20,
  },
  dateText: {
    color: COLORS.textGray,
    fontSize: FONT_SIZES.fourteen,
    fontFamily: FONT_FAMILIES.medium,
  },
});

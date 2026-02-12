import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import Cross from '../../assets/svgs/cross.svg';
import i18n from '../../translation/i18n';
import {COLORS, FONT_FAMILIES, FONT_SIZES} from '../../utils/constants';
import {Calendar} from 'react-native-calendars';
import CustomButton from '../../components/CustomButton';
import moment from 'moment';

export default function CalendarPicker(props) {
  const {closeModal, visible, handleSend} = props;

  const [selectedDate, setSelectedDate] = useState('');

  const handleApply = () => {
    closeModal();
    console.log('stard end', selectedDate);
    handleSend(selectedDate);
  };

  const handleCancel = () => {
    closeModal();
    handleSend('', '');
    setSelectedDate('');
  };
  console.log('selecteddate', selectedDate);
  const theme = {
    calendarBackground: COLORS.white,
    textSectionTitleColor: COLORS.primary,
    monthTextColor: COLORS.black,
    textMonthFontSize: FONT_SIZES.sixteen,
    textMonthFontWeight: '500',
    arrowColor: COLORS.black,
    dayTextColor: COLORS.black,
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
        <Calendar
          theme={theme}
          style={styles.calStyle}
          onDayPress={day => {
            setSelectedDate(day.dateString);
          }}
          maxDate={moment().format('YYYY-MM-DD')}
          markedDates={{
            [selectedDate]: {
              selected: true,
              selectedColor: COLORS.primary,
            },
          }}
        />
        <View style={styles.buttonView}>
          <CustomButton
            style={{height: 40}}
            title={i18n.t('cal.apply')}
            onPress={handleApply}
            textStyle={{fontSize: FONT_SIZES.twelve}}
          />
          <TouchableOpacity onPress={handleCancel}>
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
    // height: 380,
    width: '100%',
    borderRadius: 16,
    paddingHorizontal: 16,
  },
  crossImg: {
    zindex: 999,
  },
  ceneteredView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 6,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  deleteText: {
    fontSize: FONT_SIZES.sixteen,
    color: COLORS.black,
    fontFamily: FONT_FAMILIES.semiBold,
    lineHeight: 30,
    textAlign: 'center',
  },
  calStyle: {
    marginTop: 10,
    marginHorizontal: 12,
  },

  cancelText: {
    fontSize: FONT_SIZES.twelve,
    color: COLORS.black,
    fontFamily: FONT_FAMILIES.regular,
    alignSelf: 'center',
    marginTop: 18,
  },
  buttonView: {
    marginVertical: 20,
  },
});

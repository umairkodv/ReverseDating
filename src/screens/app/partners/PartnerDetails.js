import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import BaseView from '../../BaseView';
import {COLORS, FONT_FAMILIES, FONT_SIZES} from '../../../utils/constants';
import Back from '../../../assets/svgs/back.svg';
import Untick from '../../../assets/svgs/untick.svg';
import Tick from '../../../assets/svgs/tick.svg';
import i18n from '../../../translation/i18n';
import imagePath from '../../../utils/imagePath';
import LinearGradient from 'react-native-linear-gradient';
import CustomButton from '../../../components/CustomButton';
import moment from 'moment';

export default function PartnerDetails(props) {
  const [toggle, setToggle] = useState(false);
  const data = props?.route?.params?.data;
  const base64Image = `data:image/png;base64,${data?.partnerImages[0]}`;
  console.log('data', data);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  const handleUpdate = () => {
    setEdit(false);
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
        <View style={styles.settingView}>
          <TouchableOpacity onPress={() => props.navigation.goBack()}>
            <Back />
          </TouchableOpacity>
          <Text style={styles.settingText}>{i18n.t('partners.detail')}</Text>
          <View style={styles.blankView} />
        </View>
        <View
          style={{
            alignItems: 'center',
            alignSelf: 'center',
            position: 'absolute',
            zIndex: 1,
            marginTop: 70,
            marginBottom: 30,
          }}>
          <Image
            source={
              data?.partnerImages.length > 0
                ? {uri: base64Image}
                : imagePath.profile
            }
            style={styles.img}
          />
          <Text style={styles.nameText} numberOfLines={1}>
            {data?.partnerName !== '' ? data?.partnerName : 'Anonymous'}
          </Text>
        </View>
        <LinearGradient
          style={styles.purpleView}
          colors={['#12086433', '#C252CE33']}
          start={{x: 0, y: 0}}
          end={{x: 0.7, y: 0}}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.metView}>
              <Text style={styles.metText}>{i18n.t('partners.met')}</Text>
              <View style={styles.imgView}>
                <Text style={styles.appNameText}>{data?.meetingSource}</Text>
              </View>
            </View>
            <View style={styles.dateView}>
              <Text style={styles.metText}>{i18n.t('partners.started')}</Text>
              <View style={styles.imgView}>
                <Text style={styles.dateText}>
                  {data?.relationshipStartDate !== null
                    ? moment(data?.relationshipStartDate).format('LL')
                    : ''}
                </Text>
              </View>
            </View>
            {!data?.relationshipOngoingStatus && (
              <View style={styles.dateView}>
                <Text style={styles.metText}>{i18n.t('partners.dated')}</Text>
                <View style={styles.imgView}>
                  <Text style={styles.dateText}>
                    {data?.relationshipEndDate !== null
                      ? moment(data?.relationshipEndDate).format('LL')
                      : ''}
                  </Text>
                </View>
              </View>
            )}
            <View style={styles.ongoingView}>
              {data?.relationshipOngoingStatus ? <Tick /> : <Untick />}
              <Text style={styles.ongoingText}>{i18n.t('partners.still')}</Text>
            </View>
            <View style={styles.metView}>
              <Text style={styles.metText}>{i18n.t('partners.phone')}</Text>
              <View style={styles.imgView}>
                <Text style={styles.appNameText}>{data?.contactNumber}</Text>
              </View>
            </View>
            <View style={styles.metView}>
              <Text style={styles.metText}>{i18n.t('partners.email')}</Text>
              <View style={styles.imgView}>
                <Text style={styles.appNameText}>{data?.contactEmail}</Text>
              </View>
            </View>
          </ScrollView>
        </LinearGradient>
      </View>
    </BaseView>
  );
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    marginTop: 20,
  },
  settingView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 80,
  },
  settingText: {
    color: COLORS.black,
    fontSize: FONT_SIZES.twentyEight,
    fontFamily: FONT_FAMILIES.bold,
  },
  purpleView: {
    // height: 500,
    marginTop: 50,
    marginBottom: 20,
    flex: 1,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    paddingTop: 120,
  },
  nameText: {
    color: COLORS.black,
    fontSize: FONT_SIZES.twentyEight,
    fontFamily: FONT_FAMILIES.bold,
    marginTop: 10,
    marginHorizontal: 20,
  },
  metView: {
    // marginTop: 110,
    height: 50,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.primary,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },

  imgView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  appNameText: {
    color: COLORS.black,
    fontSize: FONT_SIZES.fourteen,
    fontFamily: FONT_FAMILIES.medium,
  },
  metText: {
    color: COLORS.black,
    fontSize: FONT_SIZES.fourteen,
    fontFamily: FONT_FAMILIES.bold,
  },
  dateView: {
    height: 50,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.primary,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  dateText: {
    color: COLORS.textGray,
    fontSize: FONT_SIZES.fourteen,
    fontFamily: FONT_FAMILIES.medium,
  },
  ongoingView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 14,
    marginTop: -20,
    marginBottom: 14,
  },
  ongoingText: {
    color: COLORS.black,
    fontSize: FONT_SIZES.twelve,
    fontFamily: FONT_FAMILIES.bold,
  },
  blankView: {
    height: 24,
    width: 24,
  },
  img: {
    height: 150,
    width: 150,
    borderRadius: 75,
  },
});

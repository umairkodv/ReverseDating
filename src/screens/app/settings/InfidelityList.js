import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import BaseView from '../../BaseView';
import {COLORS, FONT_FAMILIES, FONT_SIZES} from '../../../utils/constants';
import i18n from '../../../translation/i18n';
import Back from '../../../assets/svgs/back.svg';
import InfidelityListCompoennt from '../../../components/InfidelityListCompoennt';
import {useNavigation} from '@react-navigation/native';
import {getReportApi} from '../../../services/actions/AppApi';
import {VARIABLES} from '../../../utils/globalVariables';

export default function InfidelityList(props) {
  const userData = JSON.parse(VARIABLES.details);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const getReport = async () => {
    setLoading(true);
    const response = await getReportApi(userData?._id);
    console.log('responsefromReports', response);
    if (response?.statusCode === 200) {
      setData(response?.data);
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  const renderItem = ({item}) => (
    <View>
      <InfidelityListCompoennt data={item} handleRefresh={getReport} />
    </View>
  );
  const pullDownRefresh = () => {
    setIsRefreshing(true);
    getReport();
    setIsRefreshing(false);
  };

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      console.log('screenfoussed');
      getReport();
    });

    return unsubscribe;
  }, []);

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
          <Text style={styles.settingText}>{i18n.t('list.infidelity')}</Text>
          <View />
        </View>
        {loading ? (
          <ActivityIndicator size={30} color={COLORS.linear2} />
        ) : (
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.flatlistScroll2}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={pullDownRefresh}
                color={COLORS.linear2}
              />
            }
            ListEmptyComponent={
              !loading && (
                <Text style={styles.partnerText}>No Reports Found!</Text>
              )
            }
          />
        )}
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
    marginBottom: 40,
  },
  settingText: {
    color: COLORS.black,
    fontSize: FONT_SIZES.twentyEight,
    fontFamily: FONT_FAMILIES.bold,
  },
  partnerText: {
    color: COLORS.black,
    fontSize: FONT_SIZES.eighteen,
    fontFamily: FONT_FAMILIES.bold,
    marginTop: 50,
    textAlign: 'center',
  },
});

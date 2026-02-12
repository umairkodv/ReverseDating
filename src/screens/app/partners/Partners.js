import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import BaseView from '../../BaseView';
import {COLORS, FONT_FAMILIES, FONT_SIZES} from '../../../utils/constants';
import Back from '../../../assets/svgs/back.svg';
import Plus from '../../../assets/svgs/pluscircle.svg';
import i18n from '../../../translation/i18n';
import SettingsComponent from '../../../components/SettingsComponent';
import PartnersListComponent from '../../../components/PartnersListComponent';
import {getPartnersApi} from '../../../services/actions/AppApi';
import {VARIABLES} from '../../../utils/globalVariables';
import Loader from '../../../components/Loader';
export default function Partners(props) {
  const [data, setData] = useState([]);
  const userData = JSON.parse(VARIABLES.details);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  console.log('details', userData?._id);

  const renderItem = ({item}) => (
    <View>
      <PartnersListComponent data={item} handleRefresh={getPartners} />
    </View>
  );

  const getPartners = async () => {
    setLoading(true);
    const response = await getPartnersApi(userData?._id);
    console.log('responsefromHome', response);
    if (response?.statusCode === 200) {
      setLoading(false);
      setData(response?.previousPartners);
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPartners();
  }, []);

  const pullDownRefresh = () => {
    setIsRefreshing(true);
    getPartners();
    setIsRefreshing(false);
  };

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      console.log('screenfoussed');
      getPartners();
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
          <View />
          <Text style={styles.settingText}>{i18n.t('partners.partners')}</Text>
          <TouchableOpacity
            onPress={() =>
              props.navigation.reset({
                index: 1,
                routes: [
                  {name: 'AppStackNavigator', params: {screen: 'Home'}},
                  {name: 'AuthStackNavigator', params: {screen: 'NamePartner'}},
                ],
              })
            }>
            <Plus />
          </TouchableOpacity>
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
              />
            }
            ListEmptyComponent={
              !loading && (
                <Text style={styles.partnerText}>No Partners Found!</Text>
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
    marginBottom: 10,
  },
  settingText: {
    color: COLORS.black,
    fontSize: FONT_SIZES.twentyEight,
    fontFamily: FONT_FAMILIES.bold,
  },
  accntText: {
    color: COLORS.black,
    fontSize: FONT_SIZES.eighteen,
    fontFamily: FONT_FAMILIES.bold,
    marginVertical: 20,
  },
  appText: {
    color: COLORS.black,
    fontSize: FONT_SIZES.eighteen,
    fontFamily: FONT_FAMILIES.bold,
    marginBottom: 20,
    marginTop: 10,
  },
  flatlistScroll2: {
    paddingTop: 30,
  },
  partnerText: {
    color: COLORS.black,
    fontSize: FONT_SIZES.eighteen,
    fontFamily: FONT_FAMILIES.bold,
    marginTop: 50,
    textAlign: 'center',
  },
});

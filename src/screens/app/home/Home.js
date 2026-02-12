import {
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import BaseView from '../../BaseView';
import {COLORS, FONT_FAMILIES, FONT_SIZES} from '../../../utils/constants';
import Share from 'react-native-share';
import i18n from '../../../translation/i18n';
import Chat from '../../../assets/svgs/notification.svg';
import Plus from '../../../assets/svgs/plus2.svg';
import imagePath from '../../../utils/imagePath';
import CustomButton from '../../../components/CustomButton';
import LockModal from '../../modals/LockModal';
import {
  getInfidelityCount,
  getMatchCountApi,
  getReportApi,
} from '../../../services/actions/AppApi';
import {VARIABLES} from '../../../utils/globalVariables';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Arrow from '../../../assets/svgs/arroww.svg';
import MatchComponent from '../../../components/MatchComponent';

export default function Home(props) {
  const [modalVisible, setModalVisible] = useState(false);

  const [matchCount, setMatchCount] = useState(0);
  const [partnersCount, setPartnersCount] = useState(0);
  const [reportCount, setReportCount] = useState(0);
  const [infidelityMatchCount, setInfidelityMatchCount] = useState(0);
  const [matches, setMatches] = useState([]);
  const [infidelityMatches, setInfidelityMatches] = useState([]);

  // separate loaders
  const [loadingMatches, setLoadingMatches] = useState(true);
  const [loadingReports, setLoadingReports] = useState(true);
  const [loadingInfidelityCount, setLoadingInfidelityCount] = useState(true);

  const [isRefreshing, setIsRefreshing] = useState(false);

  const userData = JSON.parse(VARIABLES.details);
  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const handleChat = () => {
    props.navigation.navigate('Chatlist');
  };

  const getMatches = async () => {
    setLoadingMatches(true);
    try {
      const response = await getMatchCountApi(userData?._id);
      if (response?.statusCode === 200) {
        setMatchCount(response?.matchCount);
        setPartnersCount(response?.previousPartnersCount);
        setMatches(response?.matches);
      }
    } finally {
      setLoadingMatches(false);
    }
  };

  const getInfidelityMatches = async () => {
    setLoadingReports(true);
    try {
      const response = await getReportApi(userData?._id);
      if (response?.statusCode === 200) {
        const count = Array.isArray(response?.data) ? response.data.length : 0;
        setReportCount(count);
      } else {
        setReportCount(0);
      }
    } catch (error) {
      console.error('Error fetching reports:', error);
      setReportCount(0);
    } finally {
      setLoadingReports(false);
    }
  };

  const getInfidelityCounts = async () => {
    setLoadingInfidelityCount(true);
    try {
      const response = await getInfidelityCount();
      if (response?.statusCode === 200) {
        const count = Array.isArray(response?.matches)
          ? response.matches.length
          : 0;
        setInfidelityMatchCount(count);
        setInfidelityMatches(response?.matches);
      } else {
        setInfidelityMatchCount(0);
      }
    } catch (error) {
      console.error('Error fetching infidelity count:', error);
      setInfidelityMatchCount(0);
    } finally {
      setLoadingInfidelityCount(false);
    }
  };

  useEffect(() => {
    const checkFirstVisit = async () => {
      const hasVisited = await AsyncStorage.getItem('hasVisitedHome');
      if (!hasVisited) {
        openModal();
        await AsyncStorage.setItem('hasVisitedHome', 'true');
      }
    };
    checkFirstVisit();
  }, []);

  useEffect(() => {
    getMatches();
    getInfidelityMatches();
    getInfidelityCounts();
  }, []);

  const pullDownRefresh = async () => {
    setIsRefreshing(true);
    await Promise.all([
      getMatches(),
      getInfidelityMatches(),
      getInfidelityCounts(),
    ]);
    setIsRefreshing(false);
  };

  const handleView = () => {
    props?.navigation?.navigate('Chats', {matches: matches, infidelity: false});
  };

  const handleInfidelity = () => {
    props?.navigation?.navigate('Chats', {
      matches: infidelityMatches,
      infidelity: true,
    });
  };

  const handleShare = () => {
    // Share functionality if needed
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
        <View style={styles.headerView}>
          <Text style={styles.helloText}>
            {i18n.t('home.hello')}
            <Text>{userData?.name}</Text>
          </Text>
          <TouchableOpacity>
            <Chat />
          </TouchableOpacity>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={pullDownRefresh}
            />
          }>
          <Text style={styles.yourText}>{i18n.t('home.your')}</Text>

          <View style={styles.datedView}>
            <MatchComponent
              title={i18n.t('home.dated')}
              value={partnersCount}
              loading={loadingMatches}
            />
            <MatchComponent
              title={i18n.t('home.matched')}
              value={matchCount}
              loading={loadingMatches}
              showView={matchCount > 0}
              onPress={handleView}
            />
          </View>

          <View style={styles.datedView}>
            <MatchComponent
              title={i18n.t('home.reported')}
              value={reportCount}
              loading={loadingReports}
            />

            <MatchComponent
              title={i18n.t('home.peopleinfidelity')}
              value={infidelityMatchCount}
              showView={infidelityMatchCount > 0}
              loading={loadingInfidelityCount}
              onPress={handleInfidelity}
            />
          </View>

          <Image
            source={imagePath.goImg}
            style={{
              width: '100%',
              marginTop: 25,
              overflow: 'hidden',
              borderRadius: 12,
            }}
          />

          <CustomButton
            title={i18n.t('home.share')}
            style={{marginTop: 30}}
            onPress={handleShare}
          />

          <TouchableOpacity
            style={styles.newView}
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
            <Text style={styles.newText}>{i18n.t('home.new')}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.infedilityView}
            onPress={() => props.navigation.navigate('YouSaw')}>
            <Text style={styles.newText}>{i18n.t('home.infidelity')}</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
      <LockModal
        visible={modalVisible}
        closeModal={closeModal}
        handleUnlock={handleChat}
      />
    </BaseView>
  );
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    marginTop: 20,
  },
  headerView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  helloText: {
    color: COLORS.black,
    fontSize: FONT_SIZES.sixteen,
    fontFamily: FONT_FAMILIES.bold,
  },
  yourText: {
    color: COLORS.black,
    fontSize: FONT_SIZES.sixteen,
    fontFamily: FONT_FAMILIES.bold,
    marginTop: 34,
  },
  datedView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 24,
    marginTop: 12,
  },
  newView: {
    backgroundColor: COLORS.linear1,
    alignSelf: 'flex-end',
    borderRadius: 36,
    flexDirection: 'row',
    height: 42,
    paddingHorizontal: 18,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginTop: 30,
    marginBottom: 10,
  },
  newText: {
    color: COLORS.white,
    fontSize: FONT_SIZES.sixteen,
    fontFamily: FONT_FAMILIES.bold,
  },
  infedilityView: {
    backgroundColor: COLORS.linear1,
    alignSelf: 'flex-end',
    borderRadius: 36,
    height: 42,
    paddingHorizontal: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  viewView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderRadius: 26,
    borderWidth: 1,
    borderColor: COLORS.linear2,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginTop: 6,
  },
  viewText: {
    fontSize: FONT_SIZES.twelve,
    color: COLORS.black,
    fontFamily: FONT_FAMILIES.medium,
  },
});

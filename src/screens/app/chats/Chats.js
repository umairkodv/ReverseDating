import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import BaseView from '../../BaseView';
import {COLORS, FONT_FAMILIES, FONT_SIZES} from '../../../utils/constants';
import Back from '../../../assets/svgs/back.svg';
import i18n from '../../../translation/i18n';
import ChatlistComponent from '../../../components/ChatlistComponent';
import AxiosBase from '../../../services/AxiosBase';
import {
  getAllChatsApi,
  getMatchListApi,
} from '../../../services/actions/AppApi';
import Loader from '../../../components/Loader';

export default function Chats(props) {
  const [data, setData] = useState([]);
  const isInfidelity = props?.route?.params?.infidelity;
  const matches = props?.route?.params?.matches;
  console.log('matches', matches);
  const [loading, setLoading] = useState(false);
  // const items = [{id: 1}, {id: 2}, {id: 3}, {id: 4}];
  // useEffect(() => {
  //   getlists();
  // }, []);

  // const getlists = async () => {
  //   setLoading(true);
  //   const response = await getMatchListApi();
  //   if (response?.statusCode == 200) {
  //     setLoading(false);
  //     setData(response?.matches);
  //     console.log('responsefromAllchats', response);
  //   } else {
  //     setLoading(false);
  //   }
  // };

  const renderItem = ({item}) => (
    <ChatlistComponent data={item} isInfidelity={isInfidelity} />
  );
  return (
    <BaseView
      safeView={{backgroundColor: COLORS.white}}
      topView={{flex: 0, backgroundColor: COLORS.white}}
      baseViewStyle={{
        backgroundColor: COLORS.white,
        paddingHorizontal: 20,
      }}>
      <View style={styles.headerView}>
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <Back />
        </TouchableOpacity>
        <Text style={styles.headerText}>{i18n.t('chats.people')}</Text>
        <View style={styles.blankView} />
      </View>
      <View style={styles.mainView}>
        <FlatList
          data={matches}
          renderItem={renderItem}
          contentContainerStyle={styles.flatlistScroll2}
          showsVerticalScrollIndicator={false}
        />
      </View>
      {loading && <Loader />}
    </BaseView>
  );
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    marginTop: 10,
  },
  headerView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  headerText: {
    color: COLORS.black,
    fontSize: FONT_SIZES.twenty,
    fontFamily: FONT_FAMILIES.bold,
  },
});

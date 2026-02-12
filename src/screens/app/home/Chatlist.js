import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Back from '../../../assets/svgs/back.svg';
import Search from '../../../assets/svgs/search.svg';

import BaseView from '../../BaseView';
import {COLORS, FONT_FAMILIES, FONT_SIZES} from '../../../utils/constants';
import ChatlistComponent from '../../../components/ChatlistComponent';
export default function Chatlist(props) {
  const data = [{}, {}, {}, {}, {}];
  const renderItem = () => (
    <View>
      <ChatlistComponent />
    </View>
  );
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
          <TouchableOpacity onPress={() => props.navigation.goBack()}>
            <Back />
          </TouchableOpacity>
          <View style={styles.searchBox}>
            <Search />

            <TextInput
              style={styles.inputStyle}
              placeholder="Search"
              placeholderTextColor={COLORS.textGray}
            />
          </View>
        </View>
        <FlatList
          data={data}
          renderItem={renderItem}
          //   keyExtractor={item => item.id}
          contentContainerStyle={styles.flatlistScroll2}
          showsVerticalScrollIndicator={false}
        />
      </View>
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
    justifyContent: 'center ',
    gap: 15,
    alignItems: 'center',
  },
  searchBox: {
    backgroundColor: COLORS.gray,
    flex: 1,
    height: 54,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
    gap: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.textGray,
  },

  inputStyle: {
    fontSize: FONT_SIZES.sixteen,
    flex: 1,
    fontFamily: FONT_FAMILIES.regular,
  },
  flatlistScroll2: {
    marginTop: 40,
  },
});

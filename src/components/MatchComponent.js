import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {COLORS, FONT_FAMILIES, FONT_SIZES} from '../utils/constants';
import TextComponent from '../components/TextComponent';
import Arrow from '../assets/svgs/arroww.svg';

export default function MatchComponent({
  title,
  value,
  loading,
  showView,
  onPress,
}) {
  return (
    <View style={styles.dateTextView}>
      <View style={styles.peopleView}>
        <Text style={styles.peopleText}>{title}</Text>
      </View>
      <View style={styles.numberView}>
        {loading ? (
          <ActivityIndicator color={COLORS.linear2} size={30} />
        ) : (
          <>
            <TextComponent textStyle={styles.numberText} text={value} />
            {showView && (
              <TouchableOpacity style={styles.viewView} onPress={onPress}>
                <Text style={styles.viewText}>View</Text>
                <Arrow />
              </TouchableOpacity>
            )}
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  dateTextView: {
    borderWidth: 1,
    borderColor: COLORS.pink,
    paddingVertical: 12,
    paddingHorizontal: 10,
    flex: 1,
    borderRadius: 12,
    height: 174,
    justifyContent: 'flex-start',
  },
  peopleView: {
    flex: 0.25,
  },
  peopleText: {
    color: COLORS.black,
    fontSize: FONT_SIZES.twelve,
    fontFamily: FONT_FAMILIES.bold,
    textAlign: 'center',
  },
  numberView: {
    alignItems: 'center',
    flex: 0.8,
  },
  numberText: {
    color: COLORS.black,
    fontSize: FONT_SIZES.sixtyFour,
    fontFamily: FONT_FAMILIES.bold,
    textAlign: 'center',
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

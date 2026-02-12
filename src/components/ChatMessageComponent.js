import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import imagePath from '../utils/imagePath';
import {COLORS, FONT_FAMILIES, FONT_SIZES} from '../utils/constants';

const ChatMessageComponent = ({item}) => {
  const isUser = item.sender === 0;

  return (
    <View
      style={[styles.messageContainer, isUser ? styles.right : styles.left]}>
      {!isUser && <Image source={imagePath.user} style={styles.avatar} />}
      <View
        style={[styles.bubble, isUser ? styles.userBubble : styles.botBubble]}>
        <Text style={styles.messageText}>{item.text}</Text>
        <Text style={styles.timeText}>{item?.time}</Text>
      </View>
    </View>
  );
};

export default ChatMessageComponent;

const styles = StyleSheet.create({
  messageContainer: {
    flexDirection: 'row',
    marginVertical: 8,
    alignItems: 'flex-end',
  },
  left: {
    justifyContent: 'flex-start',
    alignSelf: 'flex-start',
  },
  right: {
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
  },
  avatar: {
    width: 24,
    height: 24,
    marginRight: 8,
    alignSelf: 'flex-start',
  },
  bubble: {
    maxWidth: '75%',
    padding: 12,
    borderRadius: 12,
  },
  userBubble: {
    backgroundColor: COLORS.pink,
    borderTopRightRadius: 0,
  },
  botBubble: {
    backgroundColor: COLORS.chatGray,
    borderTopLeftRadius: 0,
  },
  messageText: {
    color: COLORS.black,
    fontFamily: FONT_FAMILIES.medium,
    fontSize: FONT_SIZES.fourteen,
  },
  timeText: {
    alignSelf: 'flex-end',
    fontSize: 10,
    color: COLORS.darkGray,
    marginTop: 4,
  },
});

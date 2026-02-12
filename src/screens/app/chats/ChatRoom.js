import React, {useEffect, useRef, useState} from 'react';
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Platform,
} from 'react-native';
import BaseView from '../../BaseView';
import imagePath from '../../../utils/imagePath';
import Back from '../../../assets/svgs/back.svg';
import Share from '../../../assets/svgs/share.svg';
import {db} from '../../../services/firebaseConfig';
import {ref, push, serverTimestamp, onValue, get} from 'firebase/database';
import {
  COLORS,
  FONT_SIZES,
  IS_IOS,
  FONT_FAM,
  FONT_SIZESILIES,
  FONT_FAMILIES,
} from '../../../utils/constants';
import CustomTextInput from '../../../components/CustomTextInput';
import ChatMessageComponent from '../../../components/ChatMessageComponent';
import {getChatHistory, sendMessage} from '../../../services/actions/AppApi';
import {VARIABLES} from '../../../utils/globalVariables';
import moment from 'moment';

export default function ChatRoom(props) {
  const userData = JSON.parse(VARIABLES.details);
  // console.log('userdata', userData?._id);
  const id = props?.route?.params?.recipientId;
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [chatId, setChatId] = useState('');
  const [loading, setLoading] = useState(false);
  const flatListRef = useRef(null);

  useEffect(() => {
    fetchChatHistory();
  }, []);

  const normalizeMessages = (messages = [], currentUserId) => {
    return messages.map(msg => {
      const rawTime = msg.timestamp || msg.createdAt || Date.now();

      return {
        id: msg._id || msg.id || Date.now().toString(),
        sender: msg.sender === currentUserId ? 0 : 1,
        time: moment(rawTime).format('hh:mm A'),
        text: msg.message || msg.text || '',
        timestamp: rawTime,
      };
    });
  };

  useEffect(() => {
    if (!chatId) return;

    const messagesRef = ref(db, `chats/${chatId}/messages`);
    console.log('Attaching listener to:', `chats/${chatId}/messages`);

    onValue(messagesRef, snapshot => {
      console.log('Snapshot received:', snapshot.val());
      const data = snapshot.val() || {};

      const formatted = Object.keys(data).map(key => ({
        id: key,
        ...data[key],
      }));

      formatted.sort((a, b) => b.timestamp - a.timestamp);

      const normalized = normalizeMessages(formatted, userData?._id);

      setMessages(normalized);
    });
  }, [chatId]);

  const scrollToBottom = () => {
    flatListRef.current?.scrollToOffset({offset: 0, animated: true});
  };

  const fetchChatHistory = async () => {
    try {
      const data = {
        recipientId: id,
      };
      const response = await getChatHistory(data);
      const rawMessages = response?.chat?.messages || [];
      // console.log('raw', rawMessages);
      const formatted = normalizeMessages(rawMessages, userData?._id);
      formatted.sort((a, b) => b.timestamp - a.timestamp);
      setMessages(formatted);
      setChatId(response?.chat?._id);

      // console.log('Normalized messages:', formatted);
    } catch (err) {
      console.log('Error fetching chat history:', err);
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = {
      id: Date.now().toString(),
      text: input.trim(),
      sender: 0,
      time: moment().format('hh:mm A'),
    };

    const data = {
      message: input.trim(),
    };
    setMessages(prev => [userMsg, ...prev]);
    setInput('');
    scrollToBottom();
    setLoading(true);

    try {
      const botResponse = await sendMessage(chatId, data);
      // console.log('botresponse', botResponse);
    } catch (err) {
      console.log('err', err);
    } finally {
      setLoading(false);
      scrollToBottom();
    }
  };

  const renderItem = ({item}) => <ChatMessageComponent item={item} />;

  return (
    <BaseView
      safeView={{backgroundColor: COLORS.white}}
      topView={{backgroundColor: COLORS.white}}
      baseViewStyle={{backgroundColor: COLORS.white, paddingHorizontal: 16}}>
      <View style={styles.headerView}>
        <TouchableOpacity
          style={styles.backView}
          onPress={() => props?.navigation.goBack()}>
          <Back />
        </TouchableOpacity>
        <View style={styles.textView}>
          <Image source={imagePath.user} />
          <Text style={styles.headerText}>Anonymous</Text>
        </View>
        <View style={styles.iconsView} />
      </View>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 20}>
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          inverted
          // contentContainerStyle={{flexGrow: 1, paddingBottom: 16}}
          showsVerticalScrollIndicator={false}
        />
        <View style={styles.inputShareView}>
          <CustomTextInput
            placeholder="Send a message.."
            inputStyle={styles.inputStyle}
            value={input}
            onChangeText={setInput}
            multiline={true}
            inputContainerStyle={styles.inputContainerStyle}
          />

          <TouchableOpacity onPress={handleSend}>
            <Share />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </BaseView>
  );
}

const styles = StyleSheet.create({
  headerView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 4,
    marginBottom: 10,
  },
  iconsView: {
    flexDirection: 'row',
    flex: 0.5,
    justifyContent: 'flex-end',
    gap: 10,
  },
  backView: {
    flex: 0.5,
  },
  textView: {
    flex: 1,
    alignItems: 'center',
  },
  headerText: {
    color: COLORS.black,
    fontFamily: FONT_FAMILIES.bold,
    fontSize: FONT_SIZES.sixteen,
    textAlign: 'center',
  },
  glowView: {
    height: 28,
    width: 28,
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
  },
  inputContainerStyle: {
    height: 52,
    flex: 1,
    borderRadius: 12,
  },
  inputShareView: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
    alignItems: 'flex-start',
  },
  messageBubble: {
    marginVertical: 4,
    padding: 12,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  botMessage: {
    backgroundColor: COLORS.primary,
  },
  inputStyle: {
    // flex: 1,
    paddingVertical: 10,
  },
});

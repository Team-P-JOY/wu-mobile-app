import React, { useContext, useState, useRef, useEffect } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { TextInput, IconButton, Card, Text } from "react-native-paper";
import Background from "../../components/Background";
import TopBar from "../../components/TopBar";
import { AuthContext } from "../../context/AuthContext";

const ChatScreen = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const personID = user.person_id;

  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "สวัสดี! มีอะไรให้ช่วยไหม?",
      sender: "bot",
      timestamp: "15/09/2567 10:00",
    },
    {
      id: 2,
      text: "สวัสดีครับ",
      sender: "user",
      timestamp: "15/09/2567 10:00",
    },
    {
      id: 3,
      text: "มีเรื่องของสวัสดิการอยากสอบถามครับ",
      sender: "user",
      timestamp: "15/09/2567 10:00",
    },
    {
      id: 4,
      text: "สามารถให้ข้อมูลเบื้องต้นได้เลยครับ",
      sender: "bot",
      timestamp: "15/09/2567 14:45",
    },
    {
      id: 5,
      text: "ขอบคุณครับ",
      sender: "user",
      timestamp: "15/09/2567 14:45",
    },
    {
      id: 6,
      text: "ยินดีครับ",
      sender: "bot",
      timestamp: "15/09/2567 14:45",
    },
  ]);
  const [inputText, setInputText] = useState("");

  const scrollRef = useRef();

  const handleSend = () => {
    if (inputText.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: inputText,
        sender: "user",
        timestamp: moment(),
      };
      setMessages([...messages, newMessage]);
      setInputText("");
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  return (
    <>
      <TopBar
        title="Just Say Hi"
        back={() => navigation.navigate("Dashboard")}
      />

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <ScrollView style={styles.chatContainer} ref={scrollRef}>
            {messages.map((message) => (
              <View
                key={message.id}
                style={[
                  styles.messageWrapper,
                  message.sender === "user"
                    ? styles.userAlign
                    : styles.botAlign,
                ]}
              >
                {/* ✅ Header ของข้อความ (ชื่อ + เวลา) */}
                <View
                  style={[
                    styles.messageHeader,
                    message.sender === "user"
                      ? styles.userHeader
                      : styles.botHeader,
                  ]}
                >
                  <Text style={styles.senderText}>
                    {message.sender === "user" ? "คุณ" : "Bot"}
                  </Text>
                  <Text style={styles.dotSeparator}> • </Text>
                  <Text style={styles.timestampText}>{message.timestamp}</Text>
                </View>

                {/* ✅ กล่องข้อความ */}
                <Card
                  style={[
                    styles.messageCard,
                    message.sender === "user"
                      ? styles.userMessage
                      : styles.botMessage,
                  ]}
                >
                  <Card.Content style={{ padding: 0, margin: 0 }}>
                    <Text
                      style={[
                        styles.messageText,
                        message.sender === "user"
                          ? styles.userColor
                          : styles.botColor,
                      ]}
                    >
                      {message.text}
                    </Text>
                  </Card.Content>
                </Card>
              </View>
            ))}
          </ScrollView>

          {/* ✅ ช่องป้อนข้อความ */}
          <KeyboardAvoidingView
            behavior="padding"
            style={styles.inputContainer}
          >
            <TextInput
              style={styles.input}
              value={inputText}
              onChangeText={setInputText}
              placeholder="พิมพ์ข้อความ..."
              underlineColor="transparent"
              activeUnderlineColor="transparent"
            />
            <IconButton
              icon="send"
              size={28}
              onPress={handleSend}
              disabled={!inputText.trim()}
            />
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f9",
  },
  chatContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  messageWrapper: {
    marginBottom: 10,
    maxWidth: "80%",
  },
  userAlign: {
    alignSelf: "flex-end",
    alignItems: "flex-end",
  },
  botAlign: {
    alignSelf: "flex-start",
  },
  messageHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    // paddingHorizontal: 8,
    marginBottom: 1,
  },
  userHeader: {
    alignSelf: "flex-end",
    alignItems: "flex-end",
  },
  botHeader: {
    alignSelf: "flex-start",
  },
  senderText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#6a11cb",
  },
  timestampText: {
    fontSize: 12,
    color: "#888",
  },
  messageCard: {
    borderRadius: 10,
    elevation: 3,
    padding: 0,
    margin: 0,
  },
  userMessage: {
    backgroundColor: "#6a11cb",
    alignItems: "flex-end",
  },
  botMessage: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  messageText: {
    fontSize: 14,
    padding: 0,
    margin: 0,
  },
  userColor: {
    color: "#fff",
  },
  botColor: {
    color: "#333",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  input: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  dotSeparator: {
    color: "#aaa",
    fontSize: 12,
  },
});

export default ChatScreen;

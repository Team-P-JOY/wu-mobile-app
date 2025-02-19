import React, { useContext, useState, useRef, useEffect } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";
import { TextInput, IconButton, Card, Text } from "react-native-paper";
import Background from "../../components/Background";
import TopBar from "../../components/TopBar";
import { AuthContext } from "../../context/AuthContext";

const ChatScreen = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const personID = user.person_id;

  const [messages, setMessages] = useState([
    { id: 1, text: "สวัสดี! มีอะไรให้ช่วยไหม?", sender: "bot" },
    { id: 2, text: "สวัสดีครับ", sender: "user" },
    { id: 3, text: "มีเรื่องของสวัสดิการอยากสอบถามครับ", sender: "user" },
    { id: 4, text: "สามารถให้ข้อมูลเบื้องต้นได้เลยครับ", sender: "bot" },
    { id: 5, text: "ขอบคุณครับ", sender: "user" },
    { id: 6, text: "ยินดีครับ", sender: "bot" },
    { id: 7, text: "สวัสดีครับ", sender: "user" },
    { id: 8, text: "สวัสดีครับ", sender: "user" },
  ]);
  const [inputText, setInputText] = useState("");

  // สำหรับเลื่อน ScrollView อัตโนมัติ
  const scrollRef = useRef();

  const handleSend = () => {
    if (inputText.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: inputText,
        sender: "user",
      };
      setMessages([...messages, newMessage]);
      setInputText("");
    }
  };

  // เลื่อน ScrollView ไปยังข้อความล่าสุด
  useEffect(() => {
    scrollRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  return (
    <Background>
      <TopBar
        title="Just Say Hi"
        back={() => navigation.navigate("Dashboard")}
      />
      <View style={styles.container}>
        <ScrollView style={styles.chatContainer} ref={scrollRef}>
          {messages.map((message) => (
            <Card
              key={message.id}
              style={[
                styles.messageCard,
                message.sender === "user"
                  ? styles.userMessage
                  : styles.botMessage,
              ]}
            >
              <Card.Content style={{ padding: 5 }}>
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
          ))}
        </ScrollView>

        <KeyboardAvoidingView behavior="padding" style={styles.inputContainer}>
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
    </Background>
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
  messageCard: {
    marginVertical: 5,
    maxWidth: "80%",
    borderRadius: 10,
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#6a11cb",
  },
  botMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#fff",
  },
  messageText: {
    fontSize: 14,
    // lineHeight: 20,
  },
  userColor: {
    color: "#fff",
  },
  botColor: {
    color: "#6a11cb",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    // paddingHorizontal: 10,
    // padding: 5,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  input: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    padding: 0,
  },
});

export default ChatScreen;

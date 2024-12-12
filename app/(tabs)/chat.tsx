import React, { useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  LogBox,
} from "react-native";
import MessageInput from "@/components/MessageInput";
import MessageBubble from "@/components/MessageBubble";
import ChatHeader from "@/components/ChatHeader";
import { useLocalSearchParams } from "expo-router";
import { characters } from "@/constants/Characters";
import { useChat } from "react-native-vercel-ai";
import { roleplayPromptMessage } from "@/constants/Prompts";
import uuid from "react-native-uuid";

const ChatScreen: React.FC = () => {
  LogBox.ignoreAllLogs(); // Ignore all log notifications

  const { name } = useLocalSearchParams(); // Get name from params
  const character =
    characters.find((character) => character.name === name) || characters[0];
  const scrollViewRef = useRef<ScrollView>(null);

  const { messages, setMessages, input, setInput, handleSubmit } = useChat({
    api: process.env.EXPO_PUBLIC_CHAT_API_URL,
    
    initialMessages: [
      roleplayPromptMessage(character.name),
      {
        id: uuid.v4() as string,
        role: "assistant",
        content: character.prompt,
      },
    ],
    onResponse: (resp) => {
      resp.json().then((data) => {
        setMessages(((ms: any) => [...ms, data]) as any);
        scrollViewRef.current?.scrollToEnd({ animated: true });
      });
    },
    headers: {
      "Authorization": `Bearer ${process.env.EXPO_PUBLIC_CHAT_TOKEN}`
    }
  });

  useEffect(() => {
    setMessages([
      roleplayPromptMessage(character.name),
      { id: uuid.v4() as string, role: "assistant", content: character.prompt },
    ]);
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [name]);

  const viewableMessages = messages.filter((m) => m.role !== "system");

  return (
    <KeyboardAvoidingView
      style={styles.container}
      keyboardVerticalOffset={40}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.container}>
        <ChatHeader title={character.name} avatar={character.image} />
        <ScrollView
          style={styles.chatContainer}
          ref={scrollViewRef}
          onContentSizeChange={() =>
            scrollViewRef.current?.scrollToEnd({ animated: true })
          }
        >
          {viewableMessages.map((message, i) => (
            <MessageBubble
              key={message.id}
              message={message}
              isLast={i === viewableMessages.length - 1}
            />
          ))}
          <View style={styles.messagesFooter}></View>
        </ScrollView>
        <MessageInput
          input={input}
          handleInputChange={setInput}
          handleSubmit={handleSubmit}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E1E1E",
  },
  chatContainer: {
    flex: 1,
    padding: 16,
  },
  messagesFooter: {
    height: 40,
  },
});

export default ChatScreen;

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
import { AdsProvider } from "@kontextso/sdk-react-native";

const ChatScreen: React.FC = () => {
  LogBox.ignoreAllLogs(); // Ignore all log notifications

  const { name } = useLocalSearchParams(); // Get name from params
  const character =
    characters.find((character) => character.name === name) || characters[0];
  const scrollViewRef = useRef<ScrollView>(null);

  // Generate a unique user ID and conversation ID for demo purposes.
  // We need any stable identifier for AdsProvider to work.
  const [userId] = React.useState(uuid.v4() as string);
  const [conversationId] = React.useState(uuid.v4() as string);

  const { messages, setMessages, input, setInput, handleSubmit, isLoading } =
    useChat({
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
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_CHAT_TOKEN}`,
      },
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
      <AdsProvider
        messages={messages}
        userId={userId}
        publisherToken={process.env.EXPO_PUBLIC_KONTEXT_PUBLISHER_TOKEN as string}
        isLoading={isLoading}
        logLevel="debug"
        onAdClick={() => console.log("ad clicked")}
        onAdView={() => console.log("ad viewed")}
        conversationId={conversationId}
        styles={{
          inlineAd: {
            adBadgeContainer: {
              borderRadius: 8,
              borderWidth: 1,
              borderColor: "#7289DA",
              width: 32,
              paddingHorizontal: 6,
              paddingVertical: 1,
              marginBottom: 8,
            },
            adBadgeText: {
              color: "#7289DA",
            },
          },
          markdownText: {
            normal: {
              color: "#FFF",
            },
            link: {
              color: "#0072F5",
              textDecorationLine: "underline",
            },
            em: {
              fontStyle: "italic",
              color: "#7289DA",
            },
          },
        }}
      >
        <View style={styles.container}>
          <ChatHeader title={character.name} avatar={character.image} />
          <ScrollView
            style={styles.chatContainer}
            ref={scrollViewRef}
            onContentSizeChange={() =>
              scrollViewRef.current?.scrollToEnd({ animated: true })
            }
            keyboardShouldPersistTaps="handled" // Prevent keyboard from dismissing when tapping on a ad
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
      </AdsProvider>
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

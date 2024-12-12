import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { InlineAd } from "@kontextso/sdk-react-native";

interface MessageProps {
  message: {
    id: string;
    avatar?: any; // Optional avatar for the assistant
    content: string;
    created_at?: string;
    role: string; // A flag to differentiate between user and assistant messages
  };
  isLast: boolean;
}

// Utility function to parse text and identify italicized parts between **
const parseMessageText = (text: string) => {
  const parts: { text: string; theme: boolean }[] = [];
  let start = 0;

  // Regular expression to find text between ** markers
  const regex = /\*(.*?)\*/g;
  let match;

  while ((match = regex.exec(text)) !== null) {
    // Push the text before the match
    if (match.index > start) {
      parts.push({ text: text.substring(start, match.index), theme: false });
    }
    // Push the matched themed text
    parts.push({ text: match[1], theme: true });
    start = match.index + match[0].length;
  }

  // Push any remaining text after the last match
  if (start < text.length) {
    parts.push({ text: text.substring(start), theme: false });
  }

  return parts;
};

const MessageBubble: React.FC<MessageProps> = ({ message, isLast }) => {
  const parsedText = parseMessageText(message.content);

  return (
    <>
      <View
        style={[
          styles.messageContainer,
          message.role === "user"
            ? styles.userMessageContainer
            : styles.assistantMessageContainer,
        ]}
      >
        {message.role !== "user" && message.avatar && (
          <Image source={message.avatar} style={styles.avatar} />
        )}
        <View
          style={[
            styles.messageContent,
            message.role === "user"
              ? styles.userMessageContent
              : styles.assistantMessageContent,
          ]}
        >
          {parsedText.map((part, index) => (
            <Text
              key={index}
              style={part.theme ? styles.themeText : styles.regularText}
            >
              {part.text}
            </Text>
          ))}
        </View>
      </View>
      {isLast && (
        <InlineAd
          code="inlineAd"
          wrapper={(children: any) => {
            return (
              <View
                style={[
                  styles.messageContainer,
                  styles.assistantMessageContainer,
                ]}
              >
                <View
                  style={[
                    styles.messageContent,
                    styles.assistantMessageContent,
                  ]}
                >
                  {children}
                </View>
              </View>
            );
          }}
          messageId={message.id}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  messageContainer: {
    flexDirection: "row",
    marginVertical: 8,
    alignItems: "center",
  },
  userMessageContainer: {
    justifyContent: "flex-end",
  },
  assistantMessageContainer: {
    justifyContent: "flex-start",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  messageContent: {
    maxWidth: "75%",
    padding: 12,
    borderRadius: 10,
  },
  userMessageContent: {
    backgroundColor: "#3A3B3C",
    alignSelf: "flex-end",
    borderBottomRightRadius: 0,
  },
  assistantMessageContent: {
    backgroundColor: "#2C2F33",
    alignSelf: "flex-start",
    borderBottomLeftRadius: 0,
  },

  themeText: {
    color: "#7289DA", // This is the color you want for text between *
    fontStyle: "italic",
  },
  regularText: {
    color: "#FFFFFF", // Regular message color
  },
  timeText: {
    color: "#888",
    fontSize: 12,
    marginTop: 4,
    textAlign: "right",
  },
});

export default MessageBubble;

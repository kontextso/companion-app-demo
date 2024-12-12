import React, { useState } from "react";
import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

interface MessageInputProps {
  input: string;
  handleInputChange: any;
  handleSubmit: any;
}

const MessageInput: React.FC<MessageInputProps> = ({
  input,
  handleInputChange,
  handleSubmit,
}) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.textInput}
        placeholder="Type a message"
        placeholderTextColor="#888"
        value={input}
        onChangeText={handleInputChange}
      />
      <TouchableOpacity style={styles.sendButton} onPress={handleSubmit}>
        <Feather name="send" size={24} color="#FFF" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    padding: 16,
    backgroundColor: "#1E1E1E",
    borderTopWidth: 1,
    borderTopColor: "#333",
  },
  textInput: {
    flex: 1,
    backgroundColor: "#2C2F33",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 16,
    color: "#FFF",
    marginRight: 12,
  },
  sendButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#7289DA",
    borderRadius: 20,
    padding: 10,
  },
});

export default MessageInput;

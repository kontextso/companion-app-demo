import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Link } from "expo-router";

interface HeaderProps {
  title: string;
  avatar: any;
}

const ChatHeader: React.FC<HeaderProps> = ({ title, avatar }) => {
  return (
    <View style={styles.header}>
      <Link href="/(tabs)">
        <Feather name="arrow-left" size={24} color="#FFF" />
      </Link>
      <Image source={avatar} style={styles.avatar} />
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1E1E1E",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
    paddingTop: 50,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 12,
  },
  title: {
    fontSize: 18,
    color: "#FFF",
    marginLeft: 12,
    fontWeight: "bold",
  },
});

export default ChatHeader;

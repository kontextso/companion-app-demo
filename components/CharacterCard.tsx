import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

import { useRouter } from "expo-router";

export interface Character {
  name: string;
  image: any;
  description: string;
  prompt: string;
  personality: string;
  conversations: String;
}

interface CharacterCardProps {
  character: Character;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character }) => {
  const router = useRouter();

  const onPressIn = () => {
    router.push({
      pathname: "/chat",
      params: { name: character.name },
    });
  };

  return (
    <TouchableOpacity activeOpacity={0.9} onPressIn={onPressIn}>
      <View style={[styles.card]}>
        <View style={styles.row}>
          <Image source={character.image} style={styles.avatar} />
          <View style={styles.info}>
            <View style={styles.metadata}>
              <Text style={styles.name}>{character.name}</Text>
              <Text style={styles.description}>{character.description}</Text>
            </View>
            <View style={styles.statsRow}>
              <Text style={styles.statText}>{character.conversations}k</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#2C2F33",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  info: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  metadata: {
    width: "100%",
  },
  name: {
    fontSize: 18,
    color: "#FFF",
    fontWeight: "bold",
  },
  handle: {
    fontSize: 14,
    color: "#BBB",
    marginVertical: 2,
  },
  description: {
    fontSize: 14,
    color: "#DDD",
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  statText: {
    fontSize: 14,
    color: "#AAA",
  },
});

export default CharacterCard;

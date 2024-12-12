import CharacterCard from "@/components/CharacterCard";
import Header from "@/components/Header";
import { characters } from "@/constants/Characters";
import React from "react";
import { ScrollView, View, StyleSheet } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.app}>
      <Header title="Companion demo app" />
      <ScrollView style={styles.container}>
        {characters.map((character, index) => (
          <CharacterCard key={index} character={character} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  app: {
    backgroundColor: "black",

    height: "100%",
  },
});

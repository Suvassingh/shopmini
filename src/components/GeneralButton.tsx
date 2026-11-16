import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";

const GeneralButton = ({
  title,
  onPress,
}: {
  title: string;
  onPress: () => void;
}) => {
  return (
    <View style={styles.container}>
      <Pressable onPress={onPress}>
        <Text style={styles.title}>{title}</Text>
      </Pressable>
    </View>
  );
};

export default GeneralButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "green",
    borderRadius: 12,
    padding: 10,
    textAlign: "center",
    justifyContent: "center",
    marginHorizontal:50
  },
  title: {
    color: "white",
    textAlign: "center",
    justifyContent: "center",
  },
});

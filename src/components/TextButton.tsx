import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";

const TextButton = ({
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

export default TextButton;

const styles = StyleSheet.create({
  container: { height: 30, margin: 4, padding: 8 ,
    justifyContent:'center',
    alignItems:"flex-end"
  },
  title: {
    color: "gray",
    justifyContent: "center",
    alignItems: "center",
  },
});

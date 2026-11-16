import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React, { useContext, useState } from "react";
import { Product } from "../types";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { FavoritesContext } from "../../store/favorite-context";
import IconButton from "./IconButton";
const ProductItem = ({
  id,
  title,
  price,
  image,
  category,
  rating,
}: Product) => {
  const favoritesCtx = useContext(FavoritesContext);
  const favoritesItem = favoritesCtx.ids.includes(id);
  const router = useRouter();
  function favoritesHandler() {
    if (favoritesItem) {
      favoritesCtx.removeFavorite(id);
    } else {
      favoritesCtx.addFavorite(id);
    }
  }
  return (
    <View style={styles.card}>
      <Pressable
        onPress={() =>
          router.push({ pathname: "/details", params: { id: String(id) } })
        }
      >
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: `${image}` }} />
          {/* <Pressable style={styles.favButton} onPress={favoritesHandler}>
            <Ionicons
              name={favoritesItem ? "heart" : "heart-outline"}
              size={18}
              color={favoritesItem ? "red" : "#333"}
            />
          </Pressable> */}
          <View style={styles.favButton}>
            <IconButton
              name={favoritesItem ? "heart" : "heart-outline"}
              size={18}
              color={favoritesItem ? "red" : "#333"}
              onPress={favoritesHandler}
            />
          </View>
        </View>

        <View style={styles.info}>
          <Text ellipsizeMode="tail" style={styles.title} numberOfLines={2}>
            {title}
          </Text>
          <Text style={styles.category}>{category}</Text>

          <View style={styles.bottomRow}>
            <Text style={styles.price}>${price.toFixed(2)}</Text>
            <Text style={styles.rating}>⭐ {rating}</Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
};

export default ProductItem;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "white",
    borderRadius: 12,
    padding: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imageContainer: {
    position: "relative",
    width: "100%",
    marginBottom: 8,
  },
  image: {
    height: 120,
    width: "100%",
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
    marginBottom: 8,
  },
  favButton: {
    position: "absolute",
    top: 6,
    right: 6,
    backgroundColor: "#ccc",
    padding: 6,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  info: {
    flex: 1,
    minWidth: 0,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    flexShrink: 1,
  },
  category: {
    fontSize: 11,
    color: "gray",
    marginTop: 2,
    marginBottom: 8,
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginTop: "auto",
  },
  price: {
    fontSize: 14,
    fontWeight: "bold",
    color: "green",
  },
  rating: {
    fontSize: 12,
    color: "#555",
  },
});

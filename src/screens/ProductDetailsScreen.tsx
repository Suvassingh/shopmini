import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
} from "react-native";
import React, { useContext } from "react";
import { useLocalSearchParams, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { MOCK_PRODUCTS } from "../data/products";
import GeneralButton from "../components/GeneralButton";
import { FavoritesContext } from "../../store/favorite-context";
import IconButton from "../components/IconButton";
const ProductDetailsScreen = () => {
  const favoritesCtx = useContext(FavoritesContext);
  const { id: proId } = useLocalSearchParams<{ id: string }>();
  const favoritesItem = favoritesCtx.ids.includes(Number(proId));
  const product = MOCK_PRODUCTS.find((pro) => String(pro.id) === String(proId));

  if (!product) {
    return (
      <SafeAreaView style={styles.centered}>
        <Text>Product not found (id: {proId})</Text>
      </SafeAreaView>
    );
  }
  function favoritesHandler() {
    if (favoritesItem) {
      favoritesCtx.removeFavorite(Number(proId));
    } else {
      favoritesCtx.addFavorite(Number(proId));
    }
  }
  const addToCartHandler = () => {
    console.log("added", product.id);
  };

  return (
    <SafeAreaView style={styles.screen} >
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{ uri: product.image }}
            resizeMode="cover"
          />
          <View style={styles.favButton}>
            <IconButton
              name={favoritesItem ? "heart" : "heart-outline"}
              size={18}
              color={favoritesItem ? "red" : "#333"}
              onPress={favoritesHandler}
            />
          </View>
        </View>

        {/* Content */}
        <View style={styles.content}>
          <View style={styles.categoryChip}>
            <Text style={styles.categoryText}>{product.category}</Text>
          </View>

          <Text style={styles.productTitle}>{product.title}</Text>

          <View style={styles.priceAndRatingRow}>
            <Text style={styles.priceText}>${product.price}</Text>
            <View style={styles.ratingChip}>
              <Text style={styles.ratingText}>⭐ {product.rating}</Text>
            </View>
          </View>

          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.desc}>{product.description}</Text>
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <View>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>${product.price}</Text>
        </View>
        <View style={styles.buttonWrapper}>
          <GeneralButton title="Add to cart" onPress={addToCartHandler} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProductDetailsScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fff",
  },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  scrollContent: {
    paddingBottom: 20,
  },
  imageContainer: {
    position: "relative",
    width: "100%",
  },
  image: {
    width: "100%",
    height: 300,
    backgroundColor: "#f0f0f0",
  },
  backButton: {
    position: "absolute",
    top: 16,
    left: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.92)",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  backIcon: {
    fontSize: 20,
    fontWeight: "600",
    color: "#111",
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
  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  categoryChip: {
    alignSelf: "flex-start",
    backgroundColor: "#f2f2f2",
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginBottom: 12,
  },
  categoryText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#555",
    textTransform: "capitalize",
  },
  productTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111",
    lineHeight: 30,
    marginBottom: 16,
  },
  priceAndRatingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  priceText: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1a7f37",
  },
  ratingChip: {
    backgroundColor: "#fff7e6",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#946200",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111",
    marginBottom: 8,
  },
  desc: {
    fontSize: 15,
    lineHeight: 22,
    color: "#555",
  },
  bottomBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
    backgroundColor: "#fff",
    borderTopColor: "#e5e5e5",
    borderTopWidth: 1,
  },
  totalLabel: {
    fontSize: 13,
    color: "#888",
    marginBottom: 2,
  },
  totalValue: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111",
  },
  buttonWrapper: {
    flex: 1,
    maxWidth: 200,
    marginLeft: 16,
  },
});

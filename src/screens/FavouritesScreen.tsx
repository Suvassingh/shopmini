import { StyleSheet, Text, View } from "react-native";
import { useContext, useMemo } from "react";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import ProductList from "../components/ProductList";
import { MOCK_PRODUCTS } from "../data/products";
// import { FavoritesContext } from "../../store/favorite-context";
import { useAppSelector } from "../../store/hooks";
import { selectFavoriteIds } from "../../store/favouriteSlice";
const FavouritesScreen = () => {
  // const favoritesCtx = useContext(FavoritesContext);
  const favoriteIds = useAppSelector(selectFavoriteIds);

  const favouriteProducts = useMemo(
    () => MOCK_PRODUCTS.filter((pro) => favoriteIds.includes(pro.id)),
    [favoriteIds],
  );

  const count = favouriteProducts.length;

  return (
    <SafeAreaView style={styles.rootContainer} edges={["top", "left", "right"]}>
      <View style={styles.header}>
        <Text style={styles.heading}>Favourites</Text>
        <View style={styles.countBadge}>
          <Ionicons name="heart" size={14} color="#0ac526" />
          <Text style={styles.countText}>{count}</Text>
        </View>
      </View>

      {count > 0 && (
        <Text style={styles.subHeading}>
          {count} {count === 1 ? "item" : "items"} saved
        </Text>
      )}

      {count === 0 ? (
        <View style={styles.emptyContainer}>
          <View style={styles.emptyIconCircle}>
            <Ionicons name="heart-outline" size={56} color="#0ac526" />
          </View>
          <Text style={styles.emptyTitle}>No favourites yet</Text>
          <Text style={styles.emptySubtitle}>
            Tap the heart on any product to save it here for later.
          </Text>
        </View>
      ) : (
        <ProductList product={favouriteProducts} />
      )}
    </SafeAreaView>
  );
};

export default FavouritesScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
    marginHorizontal: 10,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111",
  },
  countBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#c5fdec",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  countText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#0ac526",
  },
  subHeading: {
    marginTop: 4,
    marginHorizontal: 10,
    fontSize: 13,
    color: "gray",
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 40,
    paddingBottom: 60,
  },
  emptyIconCircle: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: "#e8fdf3",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111",
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: "gray",
    textAlign: "center",
    lineHeight: 20,
  },
});

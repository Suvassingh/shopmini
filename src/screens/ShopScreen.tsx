import { StyleSheet, Text, View } from "react-native";
import { useState, useMemo, useContext } from "react";
import { Ionicons } from "@expo/vector-icons";
import CategoryRowList from "../components/CategoryRowList";
import ProductList from "../components/ProductList";
import { MOCK_PRODUCTS } from "../data/products";
import { SafeAreaView } from "react-native-safe-area-context";
const ShopScreen = () => {
  const [selected, setSelected] = useState<string>("All");
  const data = MOCK_PRODUCTS;
  const category = useMemo(
    () => ["All", ...Array.from(new Set(data.map((pro) => pro.category)))],
    [],
  );
  const filtered = useMemo(() => {
    if (selected == "All") return MOCK_PRODUCTS;
    return MOCK_PRODUCTS.filter((pro) => pro.category === selected);
  }, [selected]);
  return (
    <SafeAreaView style={styles.rootContainer} edges={["top", "left", "right"]}>
      <View style={styles.header}>
        <Text style={styles.greetigText}>Hi, Suvas</Text>
        <View style={styles.rowforheadersearchandtext}>
          <Ionicons name="search-outline" size={30} color={"#43f75bbb"} />
          <View style={styles.name}>
            <Text style={styles.nameText}>S</Text>
          </View>
        </View>
      </View>
      <View style={styles.categoryView}>
        <CategoryRowList
          categories={category}
          selected={selected}
          onSelect={setSelected}
        />
      </View>

      <Text style={styles.producttitle}>Product's</Text>
      <ProductList product={filtered} />
    </SafeAreaView>
  );
};

export default ShopScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
  },
  rowforheadersearchandtext: {
    flexDirection: "row",
  },
  greetigText: {
    fontWeight: "bold",
    fontSize: 18,
  },
  name: {
    backgroundColor: "#c5fdec",
    borderRadius: 50,
    height: 30,
    width: 30,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 16,
  },
  nameText: {
    fontSize: 18,
    color: "#0ac526",
    padding: 4,
  },
  producttitle: {
    margin: 10,
    fontSize: 24,
    fontWeight: "bold",
  },
  categoryView: {
    padding: 10,
  },
});

import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "green",
        tabBarInactiveTintColor: "gray",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Shop",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="storefront-outline" size={30} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="favourites"
        options={{
          title: "Favourites",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="heart-outline" size={30} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="api-demo"
        options={{
          title: "API Demo",
          tabBarIcon: ({ color }) => (
            <Ionicons name="cloud-outline" size={30} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

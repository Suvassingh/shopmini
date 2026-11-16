import { Stack } from "expo-router";
import FavoritesContextProvider from "../../store/favorite-context";

export default function RootLayout() {
  return (
    <FavoritesContextProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="details"
          options={{
            title: "Product Details",
            headerBackTitle: "Back",
            animation: "slide_from_right",
          }}
        />
      </Stack>
    </FavoritesContextProvider>
  );
}

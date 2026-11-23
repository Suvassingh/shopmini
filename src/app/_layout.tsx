import { Stack } from "expo-router";
// import FavoritesContextProvider from "../../store/favorite-context";
import { Provider } from "react-redux";
import { store } from "../../store";
export default function RootLayout() {
  return (
    <Provider store={store}>
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
    </Provider>
  );
}

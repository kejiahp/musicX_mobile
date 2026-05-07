import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { useColorScheme } from "@/hooks/use-color-scheme";
import { AuthProvider } from "@/context/AuthContext";
import { ToastProvider } from "react-native-toast-notifications";

export const unstable_settings = {
  anchor: "(tabs)",
};

// Initialize Apollo Client
const client = new ApolloClient({
  link: new HttpLink({ uri: "http://127.0.0.1:8080/graphql" }),
  cache: new InMemoryCache(),
  defaultOptions: { watchQuery: { fetchPolicy: "cache-and-network" } },
});

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <GestureHandlerRootView>
        <AuthProvider>
          <ApolloProvider client={client}>
            <SafeAreaProvider>
              <ToastProvider>
                <Stack screenOptions={{ headerShown: false }}>
                  <Stack.Screen name="(tabs)" />
                  <Stack.Screen
                    name="modal"
                    options={{ presentation: "modal", title: "Modal" }}
                  />
                </Stack>
              </ToastProvider>
            </SafeAreaProvider>
          </ApolloProvider>
        </AuthProvider>
      </GestureHandlerRootView>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

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
import {
  AuthSessionProvider,
  useAuthSession,
} from "@/context/AuthSessionContext";
import { ToastProvider } from "react-native-toast-notifications";
import { SplashScreenController } from "@/components/splash";
import { useMemo } from "react";

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
        <AuthSessionProvider>
          <ApolloProvider client={client}>
            <SafeAreaProvider>
              <ToastProvider>
                <SplashScreenController />
                <RootNavigator />
              </ToastProvider>
            </SafeAreaProvider>
          </ApolloProvider>
        </AuthSessionProvider>
      </GestureHandlerRootView>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

function RootNavigator() {
  const { session } = useAuthSession();
  const isAssessible = useMemo(() => Boolean(session), [session]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={isAssessible}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen
          name="create-song"
          options={{ presentation: "modal", title: "Create Song" }}
        />
      </Stack.Protected>

      <Stack.Protected guard={!isAssessible}>
        <Stack.Screen name="login" options={{ title: "Login" }} />
      </Stack.Protected>

      <Stack.Protected guard={!isAssessible}>
        <Stack.Screen name="signup" options={{ title: "Sign Up" }} />
      </Stack.Protected>
    </Stack>
  );
}

import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { useColorScheme } from "@/hooks/use-color-scheme";
import {
  AuthSessionProvider,
  useAuthSession,
} from "@/context/AuthSessionContext";
import { ToastProvider } from "react-native-toast-notifications";
import { SplashScreenController } from "@/components/splash";
import { useMemo } from "react";
import ApolloWrapper from "@/context/ApolloWrapper";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <GestureHandlerRootView>
        <AuthSessionProvider>
          <ApolloWrapper>
            <SafeAreaProvider>
              <ToastProvider>
                <SplashScreenController />
                <RootNavigator />
              </ToastProvider>
            </SafeAreaProvider>
          </ApolloWrapper>
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
          name="song/create-song"
          options={{ presentation: "modal", title: "Create Song" }}
        />
        <Stack.Screen
          name="song/edit/[song_id]"
          options={{ presentation: "modal", title: "Edit Song" }}
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

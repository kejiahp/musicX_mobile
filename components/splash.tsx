import { useAuthSession } from "@/context/AuthSessionContext";
import { SplashScreen } from "expo-router";

SplashScreen.preventAutoHideAsync();

export function SplashScreenController() {
  const { isLoading } = useAuthSession();

  if (!isLoading) {
    SplashScreen.hide();
  }

  return null;
}

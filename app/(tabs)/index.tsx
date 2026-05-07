import { ThemedText } from "@/components/themed-text";
import { ThemedScrollView } from "@/components/themed-view";
import { Link } from "expo-router";

export default function LandingScreen() {
  return (
    <ThemedScrollView contentContainerStyle={{ flex: 1 }}>
      <ThemedText>Landing Screen</ThemedText>

      <Link href="/auth/login">
        <Link.Trigger>
          <ThemedText>Login</ThemedText>
        </Link.Trigger>
      </Link>

      <Link href={"/auth/signup"}>
        <Link.Trigger>
          <ThemedText>Sign Up</ThemedText>
        </Link.Trigger>
      </Link>
    </ThemedScrollView>
  );
}

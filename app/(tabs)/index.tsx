import Container from "@/components/container";
import { ThemedText } from "@/components/themed-text";
import { Link } from "expo-router";

export default function LandingScreen() {
  return (
    <Container isScrollable>
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
    </Container>
  );
}

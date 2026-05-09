import { useAuthSession } from "@/context/AuthSessionContext";
import { useApolloClient } from "@apollo/client/react";
import { useRouter } from "expo-router";
import { Alert } from "react-native";
import { ThemedView } from "../themed-view";
import { Colors, SIZES } from "@/constants/theme";
import { ThemedText } from "../themed-text";
import { IconSymbol } from "../ui/icon-symbol";
import Button from "../button";
import { MaterialIcons } from "@expo/vector-icons";

export default function LandingHeader() {
  const router = useRouter();
  const client = useApolloClient();
  const { signOut } = useAuthSession();

  const onLogOutPressHandler = () => {
    Alert.alert("Log Out", "Are you sure you want to log out?", [
      {
        text: "Yes",
        onPress: () => {
          client.clearStore();
          signOut();
        },
        style: "destructive",
      },
      {
        text: "No",
        isPreferred: true,
        style: "cancel",
      },
    ]);
  };

  return (
    <ThemedView
      style={{ flexDirection: "row", justifyContent: "space-between" }}
    >
      <ThemedView
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <ThemedText lightColor={Colors.light.primary} type="subtitle">
          musicX
        </ThemedText>
        <IconSymbol
          size={SIZES.xxLarge}
          color={Colors.light.primary}
          name="music.house"
        />
      </ThemedView>

      <ThemedView style={{ flexDirection: "row" }}>
        <Button
          onPress={() => router.navigate("/song/create-song")}
          size="sm"
          style={{ backgroundColor: "transparent" }}
        >
          <IconSymbol
            size={SIZES.xLarge}
            color={Colors.light.primary}
            name="plus.circle"
          />
        </Button>

        <Button
          onPress={onLogOutPressHandler}
          size="sm"
          style={{ backgroundColor: "transparent" }}
        >
          <MaterialIcons
            name="exit-to-app"
            color={Colors.light.destructive}
            size={SIZES.xLarge}
          />
        </Button>
      </ThemedView>
    </ThemedView>
  );
}

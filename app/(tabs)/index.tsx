import Button from "@/components/button";
import Container from "@/components/container";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors, SIZES } from "@/constants/theme";
import { useAuthSession } from "@/context/AuthSessionContext";
import { GET_AUTH_USER } from "@/service/landing-queries";
import { useQuery } from "@apollo/client/react";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useCallback } from "react";
import { Alert } from "react-native";

export default function LandingScreen() {
  return (
    <Container isScrollable>
      <Header />
      <HelloUser />
      <AllGenres />
    </Container>
  );
}

function Header() {
  const router = useRouter();
  const { signOut } = useAuthSession();

  const onLogOutPressHandler = () => {
    Alert.alert("Log Out", "Are you sure you want to log out?", [
      {
        text: "Yes",
        onPress: () => signOut(),
        style: "destructive",
      },
      {
        text: "No",
        isPreferred: true,
        style: "cancel",
        // onPress: () => {},
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
          onPress={() => router.navigate("/create-song")}
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

function HelloUser() {
  const { session } = useAuthSession();
  const { loading, error, data } = useQuery<{
    me: {
      data: {
        id: string;
        name: string;
        email: string;
        createdAt: string;
        updatedAt: string;
      };
    };
  }>(GET_AUTH_USER, {
    ...(session && {
      context: {
        headers: {
          Authorization: `Bearer ${session}`,
        },
      },
    }),
  });

  const createdAt = useCallback((dateVal: string | null): string => {
    const dateUTC: string = dateVal
      ? new Date(dateVal).toUTCString()
      : new Date().toUTCString();
    let cDate: string = "";
    for (let word of dateUTC.split(" ")) {
      cDate += word + " ";
      if (word === new Date().getFullYear().toString()) break;
    }
    return cDate;
  }, []);

  if (loading || error) {
    return (
      <ThemedView style={{ marginTop: SIZES.xxSmall }}>
        <ThemedView
          style={{
            backgroundColor: Colors.light.gray100,
            height: SIZES.small,
            borderRadius: 5,
            width: 100,
            marginBottom: 5,
          }}
        />
        <ThemedView
          style={{
            backgroundColor: Colors.light.gray100,
            height: SIZES.large,
            borderRadius: 5,
          }}
        />
      </ThemedView>
    );
  }

  return (
    <ThemedView style={{ marginTop: SIZES.xxSmall }}>
      <ThemedText
        style={{ fontSize: SIZES.xxSmall, lineHeight: SIZES.xxSmall }}
      >
        Created at: {createdAt(data?.me.data.createdAt ?? null)}
      </ThemedText>

      <ThemedText
        type="subtitle"
        style={{ fontSize: SIZES.large, lineHeight: SIZES.large }}
      >
        {data?.me.data.name}
      </ThemedText>
    </ThemedView>
  );
}

function AllGenres() {
  return (
    <ThemedView>
      <ThemedText>sff</ThemedText>
    </ThemedView>
  );
}

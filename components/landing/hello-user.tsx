import { GET_AUTH_USER } from "@/service/landing-queries";
import { useQuery } from "@apollo/client/react";
import { useCallback } from "react";
import { ThemedView } from "../themed-view";
import { Colors, SIZES } from "@/constants/theme";
import { ThemedText } from "../themed-text";

export default function HelloUser() {
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
  }>(GET_AUTH_USER);

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

  if (loading || error || !data) {
    return (
      <ThemedView style={{ marginTop: SIZES.xxSmall }}>
        <ThemedView
          style={{
            backgroundColor: Colors.light.gray100,
            height: SIZES.small,
            borderRadius: SIZES.small / 2,
            width: 100,
            marginBottom: SIZES.small / 2,
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
    <ThemedView style={{ marginVertical: SIZES.xxSmall }}>
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

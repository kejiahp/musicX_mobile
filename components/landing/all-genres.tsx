import { GET_GENRES } from "@/service/landing-queries";
import { useQuery } from "@apollo/client/react";
import { ThemedScrollView, ThemedView } from "../themed-view";
import { Colors, SIZES } from "@/constants/theme";
import { FlatList } from "react-native";
import Button from "../button";
import { ThemedText } from "../themed-text";

export default function AllGenres() {
  const { loading, data, error } = useQuery<{
    genres: {
      id: string;
      name: string;
      createdAt: string;
      updatedAt: string;
    }[];
  }>(GET_GENRES);

  if (loading || error || !data) {
    return (
      <ThemedScrollView horizontal showsHorizontalScrollIndicator={false}>
        {Array.from({ length: 10 }).map((_, idx) => (
          <ThemedView
            key={idx}
            style={{
              backgroundColor: Colors.light.gray100,
              height: SIZES.large,
              width: SIZES.small * 5,
            }}
          />
        ))}
      </ThemedScrollView>
    );
  }

  return (
    <FlatList
      horizontal
      data={data.genres}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => {
        return (
          <Button
            size="xsm"
            style={{
              marginRight: SIZES.xxSmall,
              borderRadius: SIZES.small / 4,
            }}
          >
            <ThemedText style={{ fontSize: SIZES.xsmall, color: "white" }}>
              {item.name}
            </ThemedText>
          </Button>
        );
      }}
      keyExtractor={(item) => item.id}
    />
  );
}

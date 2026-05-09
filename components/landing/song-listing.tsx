import { FlatList } from "react-native-gesture-handler";
import { ThemedText } from "../themed-text";
import { ThemedScrollView, ThemedView } from "../themed-view";
import { useQuery } from "@apollo/client/react";
import { GET_SONG_BY_ARTIST } from "@/service/landing-queries";
import { Colors, SIZES } from "@/constants/theme";
import { Image } from "expo-image";
import { ExternalPathString, useRouter } from "expo-router";
import { ExternalLink } from "../external-link";
import Button from "../button";
import { IconSymbol } from "../ui/icon-symbol.ios";

export type TArtistSongs = {
  id: string;
  name: string;
  songs: {
    id: string;
    title: string;
    url: string;
    durationSeconds: number;
    artist: {
      id: string;
    };
    album: {
      id: string;
      title: string;
      coverImage: string;
    };
  }[];
  createdAt: string;
  updatedAt: string;
};

export default function SongListing() {
  const { loading, data, error } = useQuery<{
    artists: TArtistSongs[];
  }>(GET_SONG_BY_ARTIST);

  if (loading || error || !data) {
    return (
      <ThemedView>
        <ThemedView
          style={{
            backgroundColor: Colors.light.gray100,
            height: SIZES.xLarge,
            width: SIZES.small * 10,
            marginBottom: SIZES.small,
            borderRadius: SIZES.small / 2,
          }}
        />

        <ThemedScrollView horizontal showsHorizontalScrollIndicator={false}>
          {Array.from({ length: 5 }).map((_, idx) => (
            <ThemedView
              key={idx}
              style={{
                backgroundColor: Colors.light.gray100,
                width: SIZES.small * 10,
                height: SIZES.small * 10,
                borderRadius: SIZES.small / 2,
                marginRight: SIZES.small / 2,
              }}
            />
          ))}
        </ThemedScrollView>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={{ marginTop: SIZES.small }}>
      {data.artists.map((item, idx) => (
        <ArtistList key={idx} artistSongs={item} />
      ))}
    </ThemedView>
  );
}

function ArtistList({ artistSongs }: { artistSongs: TArtistSongs }) {
  const router = useRouter();
  return (
    <ThemedView>
      <ThemedText type="subtitle" style={{ marginBottom: SIZES.xsmall }}>
        {artistSongs.name}
      </ThemedText>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={artistSongs.songs}
        renderItem={({ item }) => {
          return (
            <ThemedView>
              <Button
                onPress={() =>
                  router.navigate({
                    pathname: "/song/edit/[song_id]",
                    params: { song_id: item.id },
                  })
                }
                size="sm"
                style={{
                  width: SIZES.xxLarge,
                  height: SIZES.xxLarge,
                  borderRadius: 100000000,
                  backgroundColor: Colors.light.background,
                  position: "absolute",
                  right: 20,
                  top: 5,
                  zIndex: 10,
                }}
              >
                <IconSymbol
                  size={SIZES.large}
                  color={Colors.light.destructive}
                  name="pencil.and.list.clipboard"
                />
              </Button>
              <ExternalLink
                style={{
                  overflow: "hidden",
                  justifyContent: "space-between",
                  borderRadius: SIZES.small,
                  marginRight: SIZES.small,
                  width: SIZES.small * 12,
                  height: SIZES.small * 15,
                }}
                href={item.url as ExternalPathString}
              >
                <Image
                  style={{
                    width: "100%",
                    height: "75%",
                    borderRadius: SIZES.small,
                  }}
                  source={item.album.coverImage}
                  contentFit="cover"
                  transition={1000}
                />

                <ThemedView style={{ height: "5%", width: "100%" }} />

                <ThemedView style={{ height: "20%" }}>
                  <ThemedText
                    numberOfLines={1}
                    style={{
                      fontSize: SIZES.small,
                      fontWeight: 700,
                      lineHeight: SIZES.small,
                    }}
                  >
                    {item.title}
                  </ThemedText>

                  <ThemedText
                    numberOfLines={1}
                    style={{ fontSize: SIZES.xsmall, lineHeight: SIZES.xsmall }}
                  >
                    {item.album.title}
                    <ThemedText style={{ fontWeight: 800 }}>{" . "}</ThemedText>
                    {item.title}
                  </ThemedText>
                </ThemedView>
              </ExternalLink>
            </ThemedView>
          );
        }}
      />
    </ThemedView>
  );
}

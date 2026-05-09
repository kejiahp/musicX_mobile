import Button from "@/components/button";
import { FormInputField } from "@/components/formtext-field";
import ParallaxScrollView from "@/components/parallax-scroll-view";
import ThemedActivityIndicator from "@/components/themed-activityindicator";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { IconSymbol } from "@/components/ui/icon-symbol.ios";
import { Colors, SIZES } from "@/constants/theme";
import {
  edit_song_validation_schema,
  TEditSongValidationSchema,
} from "@/schema/song-schema";
import {
  DELETE_SONG,
  GET_SONG_BY_ARTIST,
  GET_SONG_BY_ID,
  UPDATE_SONG_BY_ID,
} from "@/service/landing-queries";
import { useMutation, useQuery } from "@apollo/client/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { Alert, StyleSheet } from "react-native";
import { useToast } from "react-native-toast-notifications";

type TEditSongRes = {
  song: {
    id: string;
    title: string;
    url: string;
    durationSeconds: number;
    artist: {
      id: string;
      name: string;
      createdAt: string;
    };
    album: {
      id: string;
      title: string;
      coverImage: string;
    };
    createdAt: string;
    updatedAt: string;
  };
};

type TUpdateSongRes = {
  updateSong: {
    success: boolean;
    message: string;
    data: {
      id: string;
      album: {
        id: string;
        title: string;
        coverImage: string;
      };
      artist: {
        id: string;
        name: string;
        createdAt: string;
      };
      title: string;
      createdAt: string;
    };
  };
};

export default function EditSong() {
  const { song_id } = useLocalSearchParams();
  const router = useRouter();
  const toast = useToast();
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<TEditSongValidationSchema>({
    resolver: zodResolver(edit_song_validation_schema),
    mode: "all",
  });

  const { loading, data, error } = useQuery<TEditSongRes>(GET_SONG_BY_ID, {
    variables: {
      id: song_id,
    },
  });
  const [deleteSong, { loading: deleteLoading }] = useMutation<{
    deleteSong: {
      success: boolean;
      message: string;
      data: null;
    };
  }>(DELETE_SONG, {
    onCompleted(data) {
      toast.show(data.deleteSong.message, { type: "success" });
      router.dismissTo("/");
    },
    onError(error) {
      toast.show(error?.message ?? "Something went wrong", {
        type: "danger",
      });
    },
    refetchQueries: [GET_SONG_BY_ARTIST],
  });

  const [updateSong, { loading: mutationLoading }] =
    useMutation<TUpdateSongRes>(UPDATE_SONG_BY_ID, {
      onCompleted(data) {
        toast.show(data.updateSong.message, { type: "success" });
        router.dismissTo("/");
      },
      onError(error) {
        toast.show(error?.message ?? "Something went wrong", {
          type: "danger",
        });
      },
      refetchQueries: [GET_SONG_BY_ID, GET_SONG_BY_ARTIST],
    });

  const onSubmitHandler = (inputData: TEditSongValidationSchema) => {
    updateSong({
      variables: {
        id: song_id,
        title: inputData.title,
        artistId: data?.song.artist.id,
        albumId: data?.song.album.id,
        url: inputData.url,
        durationSeconds: inputData.durationSeconds,
      },
    });
  };

  const onDeleteSongHandler = () => {
    Alert.alert("Delete Song", "Are you sure you want to delete this song?", [
      { onPress: () => {}, style: "cancel", text: "No" },
      {
        onPress: () => deleteSong({ variables: { id: song_id } }),
        style: "destructive",
        text: "Yes",
      },
    ]);
  };

  if (loading) {
    return (
      <ThemedView style={styles.loadingContainer}>
        <ThemedActivityIndicator />
      </ThemedView>
    );
  }

  if (error || !data) {
    return (
      <ThemedView style={styles.loadingContainer}>
        <ThemedText>
          {error?.message ?? "Failed to get song details"}
        </ThemedText>
      </ThemedView>
    );
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={data.song.album.coverImage}
          contentFit="cover"
          contentPosition="top center"
          style={styles.reactLogo}
        />
      }
    >
      <Button
        onPress={onDeleteSongHandler}
        varaint="destructive"
        size="sm"
        style={{
          width: SIZES.xxLarge,
          height: SIZES.xxLarge,
          position: "absolute",
          right: 60,
          top: 10,
          zIndex: 10,
        }}
      >
        <IconSymbol size={SIZES.large} color={"white"} name="trash" />
      </Button>

      <Button
        onPress={() => router.dismissTo("/")}
        varaint="default"
        size="sm"
        style={{
          width: SIZES.xxLarge,
          height: SIZES.xxLarge,
          position: "absolute",
          right: 20,
          top: 10,
          zIndex: 10,
        }}
      >
        <IconSymbol size={SIZES.large} color={"white"} name="xmark" />
      </Button>

      <ThemedText type="title" style={{ color: Colors.light.primary }}>
        Edit song
      </ThemedText>
      <ThemedView style={{ flexDirection: "row", alignItems: "center" }}>
        <ThemedText
          style={{ fontSize: SIZES.xsmall, lineHeight: SIZES.xsmall }}
        >
          {data.song.album.title}
        </ThemedText>
        <ThemedText
          style={{
            fontSize: SIZES.xsmall,
            marginHorizontal: SIZES.small / 4,
          }}
        >
          .
        </ThemedText>
        <ThemedText
          style={{ fontSize: SIZES.xsmall, lineHeight: SIZES.xsmall }}
        >
          {data.song.artist.name}
        </ThemedText>
      </ThemedView>

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <FormInputField
            label="Song Title"
            placeholder="Circe"
            keyboardType="default"
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
            errorMessage={errors.title?.message}
          />
        )}
        name="title"
        defaultValue={data.song.title}
      />

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <FormInputField
            label="Actual song url (e.g. music.youtube.com)"
            placeholder="https://lh3.googleusercontent.com/Hs9SH4cmzI-Oa27ZTFvyWuhYPnNGEJ3lLoJqROIqTlGzTa-0fqqmQJxo_Qh0EAw7FpFmv93tX5Cv0xQ=w544-h544-l90-rj"
            keyboardType="url"
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
            errorMessage={errors.url?.message}
          />
        )}
        name="url"
        defaultValue={data.song.url}
      />

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <FormInputField
            label="Duration in Seconds"
            placeholder="60"
            keyboardType="default"
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value.toString()}
            errorMessage={errors.durationSeconds?.message}
          />
        )}
        name="durationSeconds"
        defaultValue={data.song.durationSeconds}
      />

      <Button
        disabled={mutationLoading || deleteLoading}
        onPress={handleSubmit(onSubmitHandler)}
      >
        {mutationLoading || deleteLoading ? (
          <ThemedActivityIndicator />
        ) : (
          <ThemedText>Save</ThemedText>
        )}
      </Button>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  reactLogo: {
    height: "100%",
    width: "100%",
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});

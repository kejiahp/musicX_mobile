import { useApolloClient, useMutation } from "@apollo/client/react";
import { CREATE_SONG, GET_SONG_BY_ARTIST } from "@/service/landing-queries";
import { useToast } from "react-native-toast-notifications";
import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import {
  create_song_validation_schema,
  TCreateSongValidationSchema,
} from "@/schema/song-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@/components/button";
import { Colors, SIZES } from "@/constants/theme";
import { IconSymbol } from "@/components/ui/icon-symbol.ios";
import { ThemedText } from "@/components/themed-text";
import { ThemedScrollView, ThemedView } from "@/components/themed-view";
import ThemedActivityIndicator from "@/components/themed-activityindicator";
import { FormError, FormInputField } from "@/components/formtext-field";
import { Picker } from "@react-native-picker/picker";
import { useEffect, useMemo } from "react";
import Label from "@/components/label";
import { TArtistSongs } from "@/components/landing/song-listing";

type TCreateSongResponse = {
  createSong: {
    success: boolean;
    message: string;
    data: {
      id: string;
      album: {
        title: string;
      };
      artist: {
        id: string;
        name: string;
      };
      title: string;
      createdAt: string;
    };
  };
};

export default function CreateSongScreen() {
  const toast = useToast();
  const router = useRouter();
  const client = useApolloClient();

  const {
    watch,
    setValue,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<TCreateSongValidationSchema>({
    resolver: zodResolver(create_song_validation_schema),
    mode: "all",
  });

  const artistAlbums = useMemo(() => {
    const data = client.cache.readQuery<{ artists: TArtistSongs[] }>({
      query: GET_SONG_BY_ARTIST,
    });

    if (!data || !data.artists) return [];

    const artistAlbumPair: {
      artistId: string;
      artistName: string;
      albums: { albumId: string; albumTitle: string }[];
    }[] = [];

    for (const artist of data.artists) {
      const albums = new Map();

      for (const song of artist.songs) {
        albums.set(song.album.id, {
          albumId: song.album.id,
          albumTitle: song.album.title,
        });
      }

      artistAlbumPair.push({
        artistId: artist.id,
        artistName: artist.name,
        albums: Array.from(albums.values()),
      });
    }

    return artistAlbumPair;
  }, [client]);

  const [createSong, { loading }] = useMutation<TCreateSongResponse>(
    CREATE_SONG,
    {
      onCompleted(data) {
        toast.show(data.createSong.message, { type: "success" });
        router.dismissTo("/");
      },
      onError(error) {
        toast.show(error?.message ?? "Something went wrong", {
          type: "danger",
        });
      },
      refetchQueries: [GET_SONG_BY_ARTIST],
    },
  );

  const onSubmitHandler = (inputData: TCreateSongValidationSchema) => {
    createSong({
      variables: {
        title: inputData.title,
        artistId: inputData.artistId,
        albumId: inputData.albumId,
        url: inputData.url,
        durationSeconds: inputData.durationSeconds,
      },
    });
  };

  const selectedArtistId = watch("artistId");
  const selectedArtistAlbums = (() => {
    if (!Boolean(selectedArtistId)) return [];
    return artistAlbums.find((item) => item.artistId === selectedArtistId)!
      .albums;
  })();

  useEffect(() => {
    if (selectedArtistAlbums.length > 0) {
      setValue("albumId", selectedArtistAlbums[0].albumId);
    }
  }, [selectedArtistId]);

  return (
    <ThemedScrollView style={{ padding: SIZES.small }}>
      <Button
        onPress={() => router.dismissTo("/")}
        varaint="default"
        size="sm"
        style={{
          width: SIZES.xxLarge,
          height: SIZES.xxLarge,
          position: "absolute",
          right: 0,
          top: 0,
          zIndex: 10,
        }}
      >
        <IconSymbol size={SIZES.large} color={"white"} name="xmark" />
      </Button>

      <ThemedText type="title" style={{ color: Colors.light.primary }}>
        Create song
      </ThemedText>

      <ThemedText
        style={{ fontSize: SIZES.medium, marginVertical: SIZES.small }}
      >
        Add your song details to get started. Give it a title, choose a
        duration, and insert your audio url. When everything looks right, hit
        Create.
      </ThemedText>

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
        defaultValue={""}
      />

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <FormInputField
            label="Actual Song URL (e.g. music.youtube.com)"
            placeholder="https://lh3.googleusercontent.com/Hs9SH4cmzI-Oa27ZTFvyWuhYPnNGEJ3lLoJqROIqTlGzTa-0fqqmQJxo_Qh0EAw7FpFmv93tX5Cv0xQ=w544-h544-l90-rj"
            keyboardType="url"
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
            errorMessage={errors.url?.message}
          />
        )}
        name="url"
        defaultValue=""
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
        defaultValue={0}
      />

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <ThemedView style={{ marginVertical: 2 }}>
            <Label style={{ fontSize: SIZES.small, lineHeight: SIZES.large }}>
              Select Artist
            </Label>
            <Picker
              onBlur={onBlur}
              selectedValue={value}
              onValueChange={(itemValue) => onChange(itemValue)}
            >
              {artistAlbums.map((item, idx) => {
                return (
                  <Picker.Item
                    key={idx}
                    label={item.artistName}
                    value={item.artistId}
                  />
                );
              })}
            </Picker>
            <FormError message={errors.artistId?.message} />
          </ThemedView>
        )}
        name="artistId"
        defaultValue=""
      />
      {selectedArtistAlbums.length > 0 && (
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <ThemedView style={{ marginVertical: 2 }}>
              <Label style={{ fontSize: SIZES.small, lineHeight: SIZES.large }}>
                Select Album
              </Label>
              <Picker
                onBlur={onBlur}
                selectedValue={value}
                onValueChange={(itemValue) => onChange(itemValue)}
              >
                {selectedArtistAlbums.map((item) => {
                  return (
                    <Picker.Item
                      key={item.albumId}
                      label={item.albumTitle}
                      value={item.albumId}
                    />
                  );
                })}
              </Picker>
              <FormError message={errors.albumId?.message} />
            </ThemedView>
          )}
          name="albumId"
        />
      )}

      <Button disabled={loading} onPress={handleSubmit(onSubmitHandler)}>
        {loading ? (
          <ThemedActivityIndicator />
        ) : (
          <ThemedText>Create</ThemedText>
        )}
      </Button>
      <ThemedView style={{ height: SIZES.small * 3, width: "100%" }} />
    </ThemedScrollView>
  );
}

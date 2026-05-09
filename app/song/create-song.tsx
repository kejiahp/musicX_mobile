import { useMutation } from "@apollo/client/react";
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
import { ThemedScrollView } from "@/components/themed-view";
import ThemedActivityIndicator from "@/components/themed-activityindicator";
import { FormInputField } from "@/components/formtext-field";

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

export default function CreateSongCreen() {
  const toast = useToast();
  const router = useRouter();

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<TCreateSongValidationSchema>({
    resolver: zodResolver(create_song_validation_schema),
    mode: "all",
  });

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
    console.log(inputData);
  };

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
        duration, and upload your audio. When everything looks right, hit
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

      <Button disabled={loading} onPress={handleSubmit(onSubmitHandler)}>
        {loading ? (
          <ThemedActivityIndicator />
        ) : (
          <ThemedText>Create</ThemedText>
        )}
      </Button>
    </ThemedScrollView>
  );
}

import * as z from "zod";

export const edit_song_validation_schema = z.object({
  title: z
    .string("title is required")
    .trim()
    .min(1, "Too short!")
    .max(255, "Too long!"),
  url: z
    .url("url is required")
    .startsWith(
      "https://music.youtube.com",
      "URL must start with: https://music.youtube.com",
    ),
  durationSeconds: z.coerce
    .number()
    .int()
    .positive()
    .min(5, "Too short!") as z.ZodNumber,
});

export type TEditSongValidationSchema = z.infer<
  typeof edit_song_validation_schema
>;

export const create_song_validation_schema = z.object({
  title: z
    .string("title is required")
    .trim()
    .min(1, "Too short!")
    .max(255, "Too long!"),
  url: z
    .url("url is required")
    .startsWith(
      "https://music.youtube.com",
      "URL must start with: https://music.youtube.com",
    ),
  durationSeconds: z.coerce
    .number()
    .int()
    .positive()
    .min(5, "Too short!") as z.ZodNumber,
  artistId: z.uuidv4("Artist is required"),
  albumId: z.uuidv4("Album is required"),
});

export type TCreateSongValidationSchema = z.infer<
  typeof create_song_validation_schema
>;

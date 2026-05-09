import { gql } from "@apollo/client";

export const GET_AUTH_USER = gql`
  query GetAuthUser {
    me {
      success
      message
      data {
        id
        name
        email
        createdAt
        updatedAt
      }
    }
  }
`;

export const GET_GENRES = gql`
  query GetGenres {
    genres {
      id
      name
      createdAt
      updatedAt
    }
  }
`;

export const GET_SONG_BY_ARTIST = gql`
  query GetSongsByArtisit {
    artists {
      id
      name
      songs {
        id
        title
        url
        durationSeconds
        artist {
          id
        }
        album {
          id
          title
          coverImage
        }
      }
      createdAt
      updatedAt
    }
  }
`;

export const GET_SONG_BY_ID = gql`
  query GetSongById($id: UUID!) {
    song(id: $id) {
      id
      title
      durationSeconds
      url
      artist {
        id
        name
        createdAt
      }
      album {
        id
        title
        coverImage
      }
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_SONG_BY_ID = gql`
  mutation UpdateSongById(
    $id: UUID!
    $title: String
    $artistId: UUID
    $albumId: UUID
    $url: String
    $durationSeconds: Int
  ) {
    updateSong(
      id: $id
      title: $title
      artistId: $artistId
      albumId: $albumId
      url: $url
      durationSeconds: $durationSeconds
    ) {
      success
      message
      data {
        id
        album {
          id
          title
          coverImage
        }
        artist {
          id
          name
          createdAt
        }
        title
        durationSeconds
        createdAt
        url
      }
    }
  }
`;

export const CREATE_SONG = gql`
  mutation CreateSong(
    $title: String!
    $artistId: UUID!
    $albumId: UUID
    $url: String
    $durationSeconds: Int
  ) {
    createSong(
      title: $title
      artistId: $artistId
      albumId: $albumId
      url: $url
      durationSeconds: $durationSeconds
    ) {
      success
      message
      data {
        id
        album {
          title
        }
        artist {
          id
          name
        }
        title
        createdAt
      }
    }
  }
`;

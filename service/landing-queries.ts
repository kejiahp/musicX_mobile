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

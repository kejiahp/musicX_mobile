import { gql } from "@apollo/client";

export const SIGN_UP_OPERATION = gql`
  mutation SignUpNewUser($name: String!, $email: String!, $password: String!) {
    signup(name: $name, email: $email, password: $password) {
      success
      message
      data {
        name
        email
      }
    }
  }
`;

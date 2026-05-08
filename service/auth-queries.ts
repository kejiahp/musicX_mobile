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

export const LOGIN_OPERATION = gql`
  mutation LoginUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      success
      message
      data {
        token
      }
    }
  }
`;

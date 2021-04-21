import { gql } from "@apollo/client";

const LOGIN_USER = gql`
  mutation ($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      status
      email
      token
    }
  }
`;

export default LOGIN_USER;

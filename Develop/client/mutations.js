import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    // Mutation logic here
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    // Mutation logic here
  }
`;

export const SAVE_BOOK = gql`
  mutation saveBook($bookData: BookInput!) {
    // Mutation logic here
  }
`;

export const REMOVE_BOOK = gql`
  mutation removeBook($bookId: ID!) {
    // Mutation logic here
  }
`;

import { gql } from '@apollo/client';
// import { typeDefs } from '../../../server/models';

export const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    // Mutation logic here
    _id 
    username
    email
    bookCount
    savedBooks {
      bookId
      authors
      description
      title
      image
      link
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    user: addUser(username: $username, email: $email, password: $password)
    { 
      _id
      username
      email
      bookCount
      savedBooks {
        bookId
        authors
        description
        title
        image
        link
      }
  }
`;

export const SAVE_BOOK = gql`
  mutation saveBook($bookData: BookInput!) {
    // Mutation logic here
    saveBook(authors: $authors, description: $description, bookId: $bookId, image: $image, link: $link, title: $title)
    {
      _id
      username
      email
      bookCount
      savedBooks {
        bookId
        authors
        description
        title
        image
        link
      }
  }
`;

export const REMOVE_BOOK = gql`
  mutation removeBook($bookId: ID!) {
    // Mutation logic here
    removeBook(bookId: $bookId)
    {
      _id
      username
      email
      bookCount 
      savedBooks {
        bookId
        authors
        description
        title
        image
        link
      }
  }
`;


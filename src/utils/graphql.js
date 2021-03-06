import { gql } from '@apollo/client';

export const FETCH_POSTS_QUERY = gql`
  {
    getPosts {
      id
      body
      createdAt
      username
      likes {
        username
        createdAt
      }
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;

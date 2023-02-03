import { gql } from "@apollo/client";

export const ALL_POSTS = gql`
  query posts {
    posts {
      title
      body
      subreddit
      numDownvotes
      numUpvotes
      id
    }
  }
`;

export const CREATE_POST = gql`
  mutation createPost($title: String!, $body: String, $subreddit: String!) {
    createPost(title: $title, body: $body, subreddit: $subreddit) {
      title
      body
      subreddit
    }
  }
`;

export const UPVOTE_POST = gql`
  mutation upvotePost($id: ID!) {
    upvotePost(id: $id) {
      title
      body
      subreddit
      numDownvotes
      numUpvotes
      id
    }
  }
`;

export const DOWNVOTE_POST = gql`
  mutation downvotePost($id: ID!) {
    downvotePost(id: $id) {
      title
      body
      subreddit
      numDownvotes
      numUpvotes
      id
    }
  }
`;

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;

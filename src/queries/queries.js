import { gql } from "@apollo/client";

export const POSTS = gql`
  query posts($subreddit: String) {
    posts(subreddit: $subreddit) {
      title
      body
      subreddit
      upVotedBy
      downVotedBy
      id
    }
  }
`;

export const FULL_POST = gql`
  query post($postId: ID!) {
    post(id: $postId) {
      body
      downVotedBy
      id
      subreddit
      title
      upVotedBy
      comments {
        body
        id
        parentComment
        edited
      }
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

export const CREATE_COMMENT = gql`
  mutation createComment($parentPost: ID!, $body: String, $parentComment: ID) {
    createComment(
      parentPost: $parentPost
      body: $body
      parentComment: $parentComment
    ) {
      id
    }
  }
`;

export const EDIT_COMMENT = gql`
  mutation editComment($body: String!, $id: ID!) {
    editComment(body: $body, id: $id) {
      body
      id
      edited
    }
  }
`;

export const UPVOTE_POST = gql`
  mutation upvotePost($id: ID!) {
    upvotePost(id: $id) {
      title
      body
      subreddit
      upVotedBy
      downVotedBy
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
      upVotedBy
      downVotedBy
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

export const ME = gql`
  query me {
    me {
      username
      id
    }
  }
`;

export const SUBREDDITS = gql`
  query userSubreddits($userId: ID) {
    user(userId: $userId) {
      id
      subreddits {
        description
        id
        name
      }
    }
  }
`;

export const SUBREDDIT = gql`
  query Query($name: String) {
    subreddit(name: $name) {
      id
      name
      description
    }
  }
`;

export const JOIN_SUBREDDIT = gql`
  mutation joinSubreddit($name: String!) {
    joinSubreddit(name: $name) {
      id
      subreddits {
        description
        id
        name
      }
    }
  }
`;

export const LEAVE_SUBREDDIT = gql`
  mutation leaveSubreddit($name: String!) {
    leaveSubreddit(name: $name) {
      id
      username
      subreddits {
        description
        id
        name
      }
    }
  }
`;

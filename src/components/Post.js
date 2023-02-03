import { UPVOTE_POST, DOWNVOTE_POST, ALL_POSTS } from "../queries/queries";
import { useMutation } from "@apollo/client";

function Post({ title, body, subreddit, numUpvotes, numDownvotes, id }) {
  const [upvotePost] = useMutation(UPVOTE_POST, {
    refetchQueries: [{ query: ALL_POSTS }],
  });

  const [downvotePost] = useMutation(DOWNVOTE_POST, {
    refetchQueries: [{ query: ALL_POSTS }],
  });

  return (
    <div className="rounded bg-white border">
      <h3>
        {title} · r/{subreddit}
      </h3>
      <p>{body}</p>
      <button onClick={() => upvotePost({ variables: { id } })}>Upvote</button>
      <p>{numUpvotes - numDownvotes}</p>
      <button onClick={() => downvotePost({ variables: { id } })}>
        Downvote
      </button>
    </div>
  );
}

export default Post;

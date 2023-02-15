import Post from "./Post";
import { POSTS, ME } from "../queries/queries";
import { useQuery } from "@apollo/client";

function Feed({ subreddit }) {
  let result = useQuery(POSTS, { variables: { subreddit } });
  const user = useQuery(ME);

  if (result.loading || user.loading) {
    return <div>Loading posts...</div>;
  }

  return (
    <div className="w-160 space-y-4">
      {result.data.posts.map((p) => (
        <Post key={p.title} {...p} userId={user.data.me?.id} />
      ))}
    </div>
  );
}

export default Feed;

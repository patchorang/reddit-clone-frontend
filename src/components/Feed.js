import Post from "./Post";
import { ALL_POSTS } from "../queries/queries";
import { useQuery } from "@apollo/client";

function Feed() {
  const result = useQuery(ALL_POSTS);
  console.log(result);

  if (result.loading) {
    return <div>Loading posts...</div>;
  }

  return (
    <div className="w-160 space-y-4">
      {result.data.posts.map((p) => (
        <Post key={p.title} {...p} />
      ))}
    </div>
  );
}

export default Feed;

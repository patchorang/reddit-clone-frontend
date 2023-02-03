import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ALL_POSTS, CREATE_POST } from "../queries/queries";

function PostForm() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [subreddit, setSubreddit] = useState("");

  const [createPost] = useMutation(CREATE_POST, {
    refetchQueries: [{ query: ALL_POSTS }],
  });

  const submit = (e) => {
    e.preventDefault();
    createPost({ variables: { title, body, subreddit } });
    setTitle("");
    setBody("");
    setSubreddit("");
  };

  return (
    <form onSubmit={submit}>
      <div>
        title
        <input
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        body
        <input value={body} onChange={({ target }) => setBody(target.value)} />
      </div>
      <div>
        subreddit
        <input
          value={subreddit}
          onChange={({ target }) => setSubreddit(target.value)}
        />
      </div>
      <button type="submit">Post</button>
    </form>
  );
}

export default PostForm;

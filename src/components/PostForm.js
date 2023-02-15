import { useState } from "react";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { POSTS, CREATE_POST } from "../queries/queries";
import SubredditSelector from "./SubredditSelector";
import Button from "./Button";

const POST_TYPES = { TEXT: "Text", IMAGE: "Image" };

function PostForm({ defaultSubreddit, subreddits }) {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState(null);
  const [postType, setPostType] = useState(POST_TYPES.TEXT);
  const [subreddit, setSubreddit] = useState(subreddits[0].name);

  const [createPost] = useMutation(CREATE_POST, {
    refetchQueries: [{ query: POSTS, variables: { subreddit } }],
  });

  const submit = (e) => {
    e.preventDefault();
    createPost({ variables: { title, body, subreddit } });
    setTitle("");
    setBody("");
    setSubreddit("");
    navigate(`/r/${subreddit}`);
  };

  const handleSubredditChange = (subreddit) => {
    setSubreddit(subreddit);
  };

  const handlePostTypeChange = (e) => {
    setPostType(e.target.value);
  };

  const handleImageChange = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setImage(null);
    }
    setImage(e.target.files[0]);
  };

  const renderedTextPostForm = (
    <>
      <div className="pb-2 pt-2">
        <input
          value={title}
          placeholder="Title"
          onChange={({ target }) => setTitle(target.value)}
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div>
        <textarea
          value={body}
          placeholder="Text"
          onChange={({ target }) => setBody(target.value)}
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
    </>
  );

  const renderedImagePostForm = (
    <>
      <div className="pb-2 pt-2">
        <input
          value={title}
          placeholder="Title"
          onChange={({ target }) => setTitle(target.value)}
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div>
        <input
          type="file"
          accept="image/gif, image/jpeg, image/png"
          id="postFile"
          name="postFile"
          onChange={handleImageChange}
        />
      </div>
      {image && <img src={URL.createObjectURL(image)} />}
    </>
  );

  return (
    <form onSubmit={submit}>
      <SubredditSelector
        userSubreddits={subreddits}
        onChange={handleSubredditChange}
        placeholder="Select a community"
        defaultSelection={subreddit}
      />
      <div>
        <input
          type="radio"
          value={POST_TYPES.TEXT}
          name="postType"
          checked={postType === POST_TYPES.TEXT}
          onChange={handlePostTypeChange}
        />
        {POST_TYPES.TEXT}
        <input
          type="radio"
          value={POST_TYPES.IMAGE}
          name="postType"
          checked={postType === POST_TYPES.IMAGE}
          onChange={handlePostTypeChange}
        />
        {POST_TYPES.IMAGE}
      </div>
      {postType === POST_TYPES.TEXT && renderedTextPostForm}
      {postType === POST_TYPES.IMAGE && renderedImagePostForm}
      <Button type="submit">Post</Button>
    </form>
  );
}

export default PostForm;

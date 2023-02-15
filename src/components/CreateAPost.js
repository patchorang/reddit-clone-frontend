import PostForm from "./PostForm";

function CreateAPost({ subreddits }) {
  return (
    <div>
      <h2>Create a Post</h2>
      {/* TODO Handle responsive better */}
      <div className="w-160 rounded-md bg-white border shadow-sm p-2">
        <PostForm subreddits={subreddits} />
      </div>
    </div>
  );
}

export default CreateAPost;

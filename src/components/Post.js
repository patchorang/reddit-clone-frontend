import { useNavigate } from "react-router-dom";
import Voter from "./Voter";

function Post({ title, body, subreddit, upVotedBy, downVotedBy, id, userId }) {
  const navigate = useNavigate();

  const goToSubreddit = (e) => {
    e.stopPropagation();
    navigate(`/r/${subreddit}`);
  };

  //TODO fix nested click here
  return (
    <div
      className="rounded-md bg-white border shadow-sm cursor-pointer"
      onClick={() => navigate(`/r/${subreddit}/${id}`)}
    >
      <div className="flex flex-row pr-2 space-x-2">
        <Voter
          postId={id}
          upVotedBy={upVotedBy}
          downVotedBy={downVotedBy}
          userId={userId}
          className="bg-gray-50"
        />
        <div className="flex flex-col space-y-1 py-2">
          <div className="flex space-x-1 items-baseline  ">
            <div
              className="text-xs font-bold hover:underline"
              onClick={goToSubreddit}
            >
              r/{subreddit}
            </div>
            <div className="text-xs text-gray-500">
              · Posted by u/replacemewith real data · 20 hours ago
            </div>
          </div>
          <div className="text-lg">{title}</div>

          <p className="text-sm">{body}</p>
        </div>
      </div>
    </div>
  );
}

export default Post;

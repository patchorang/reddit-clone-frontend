import { FULL_POST } from "../queries/queries";
import { Link, useParams } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useQuery } from "@apollo/client";
import Voter from "./Voter";
import CommentForm from "./CommentForm";
import Panel from "./Panel";
import Comment from "./Comment";

function PostPage() {
  const user = useContext(UserContext);
  const { postId } = useParams();
  const { error, loading, data } = useQuery(FULL_POST, {
    variables: { postId },
  });

  if (loading) return <div>Loading...</div>;

  const { upVotedBy, downVotedBy, subreddit, title, body, comments } =
    data.post;

  const buildCommentTree = (comments, parent) => {
    let rootComments = comments.filter((c) => c.parentComment === parent);
    if (rootComments.length === 0) return null;
    rootComments = rootComments.map((c) => ({ ...c }));
    rootComments.forEach(
      (c) => (c.children = buildCommentTree(comments, c.id))
    );
    return rootComments;
  };

  const commentTree = buildCommentTree(comments, null);

  const renderComment = (c) => {
    const comment = (
      <Comment
        key={c.id}
        body={c.body}
        user="Adam Menz"
        id={c.id}
        edited={c.edited}
        parentPost={postId}
        childPosts={c.children}
      />
    );
    return comment;
  };

  const renderedComments = commentTree?.map((c) => renderComment(c));

  return (
    <div className="flex-col space-y-4 w-9/12 max-w-3xl">
      <Panel>
        <div className="flex flex-row pr-2 space-x-2">
          <Voter
            postId={postId}
            upVotedBy={upVotedBy}
            downVotedBy={downVotedBy}
            userId={user.id}
          />
          <div className="flex flex-col space-y-1 py-2">
            <div className="flex space-x-1 items-baseline">
              <Link className="text-xs font-bold" to={`/r/${subreddit}`}>
                r/{subreddit}
              </Link>
              <div className="text-xs text-gray-500">
                · Posted by u/replacemewith real data · 20 hours ago
              </div>
            </div>
            <div className="text-lg">{title}</div>

            <p className="text-sm">{body}</p>
          </div>
        </div>
        <div className="flex flex-col space-y-2 mx-7 my-4">
          <CommentForm parentPost={postId} />
        </div>
        <div className="px-8">{renderedComments}</div>
      </Panel>
    </div>
  );
}

export default PostPage;

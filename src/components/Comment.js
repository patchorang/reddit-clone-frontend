import Voter from "./Voter";
import EditCommentForm from "./EditCommentForm";
import CommentForm from "./CommentForm";
import { BsArrowsAngleExpand } from "react-icons/bs";
import { useState } from "react";

function Comment({
  body,
  user,
  upvotedBy,
  downvotedBy,
  edited,
  parentPost,
  id,
  childPosts,
}) {
  const [showReply, setShowReply] = useState(false);
  const [editing, setEditing] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const handleAddComment = () => {
    setShowReply(false);
  };

  const handleEditComment = () => {
    setEditing(false);
  };

  const handleCancelEdit = () => {
    setEditing(false);
  };

  const renderedCommentForm = (
    <CommentForm
      parentPost={parentPost}
      parentComment={id}
      reply={true}
      onSubmit={handleAddComment}
    />
  );

  const renderedEditForm = (
    <EditCommentForm
      postId={id}
      body={body}
      parentPost={parentPost}
      onSubmit={handleEditComment}
      onCancel={handleCancelEdit}
    />
  );

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className="flex space-y-2 ">
      {!collapsed && (
        <div
          className="w-1 hover:border-orange-400 border-l-2 border-gray-200"
          onClick={toggleCollapsed}
        ></div>
      )}
      <div className="flex flex-col space-y-1 ml-4 grow">
        <div className="flex space-y-1">
          {collapsed && <BsArrowsAngleExpand onClick={toggleCollapsed} />}
          <div className="text-xs font-bold">{user}</div>
        </div>
        {!collapsed && (
          <div>
            <div className="mb-2">
              {editing ? (
                renderedEditForm
              ) : (
                <div className="flex flex-col space-y-2">
                  <div className="text-sm">
                    {body}
                    {edited && (
                      <span className="pl-1 text-xs text-gray-400">
                        (edited)
                      </span>
                    )}
                  </div>

                  <div className="flex space-x-2 text-xs font-bold text-gray-400">
                    <div
                      onClick={() => {
                        setShowReply(!showReply);
                      }}
                    >
                      Reply
                    </div>
                    <div
                      onClick={() => {
                        setEditing(true);
                      }}
                    >
                      Edit
                    </div>
                    <div>Share</div>
                  </div>
                  {showReply && renderedCommentForm}
                </div>
              )}
            </div>

            <div className="flex flex-col space-y-4">
              {childPosts?.map((childPost) => (
                <Comment
                  key={childPost.id}
                  body={childPost.body}
                  user={user}
                  parentPost={parentPost}
                  id={childPost.id}
                  childPosts={childPost.children}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Comment;

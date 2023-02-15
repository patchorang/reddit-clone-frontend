import { useState } from "react";
import Button from "./Button";
import { useMutation } from "@apollo/client";
import { CREATE_COMMENT, FULL_POST } from "../queries/queries";

function CommentForm({ parentPost, parentComment, reply, onSubmit }) {
  const [comment, setComment] = useState("");

  const [createComment] = useMutation(CREATE_COMMENT, {
    refetchQueries: [{ query: FULL_POST, variables: { postId: parentPost } }],
  });

  const submit = (e) => {
    e.preventDefault();
    createComment({ variables: { body: comment, parentPost, parentComment } });
    setComment("");
    onSubmit();
  };

  return (
    <form className="leading-[0]" onSubmit={submit}>
      <textarea
        className="appearance-none border rounded-t rounded-b-none w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-b-0"
        placeholder="What are your thoughts?"
        value={comment}
        onChange={({ target }) => setComment(target.value)}
      />
      <div className="flex justify-end bg-gray-50 py-1 px-2 border-b border-l border-r rounded-b">
        <Button type="submit" small={true}>
          {reply ? "Reply" : "Comment"}
        </Button>
      </div>
    </form>
  );
}

export default CommentForm;

import { useState } from "react";
import Button from "./Button";
import { useMutation } from "@apollo/client";
import { EDIT_COMMENT, FULL_POST } from "../queries/queries";

function EditCommentForm({ postId, body, onCancel, onSubmit, parentPost }) {
  const [comment, setComment] = useState(body);

  const [editComment] = useMutation(EDIT_COMMENT, {
    refetchQueries: [{ query: FULL_POST, variables: { postId: parentPost } }],
  });

  const submit = (e) => {
    e.preventDefault();
    editComment({ variables: { body: comment, id: postId } });
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
        <Button onClick={onCancel} small={true} tertiary>
          Cancel
        </Button>
        <Button type="submit" small={true}>
          Save edits
        </Button>
      </div>
    </form>
  );
}

export default EditCommentForm;

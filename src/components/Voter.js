import {
  BsArrowUpCircle,
  BsArrowDownCircle,
  BsArrowDownCircleFill,
  BsArrowUpCircleFill,
} from "react-icons/bs";
import { UPVOTE_POST, DOWNVOTE_POST, POSTS } from "../queries/queries";
import { useMutation } from "@apollo/client";

function Voter({ postId, upVotedBy, downVotedBy, userId, className }) {
  const score = upVotedBy.length - downVotedBy.length;

  const [upvotePost] = useMutation(UPVOTE_POST, {
    refetchQueries: [{ query: POSTS }],
  });

  const [downvotePost] = useMutation(DOWNVOTE_POST, {
    refetchQueries: [{ query: POSTS }],
  });

  const renderedUpvoteButton = (
    <button
      onClick={(e) => {
        e.stopPropagation();
        upvotePost({ variables: { id: postId } });
      }}
    >
      {upVotedBy.includes(userId) ? (
        <BsArrowUpCircleFill />
      ) : (
        <BsArrowUpCircle />
      )}
    </button>
  );

  const renderedDownvoteButton = (
    <button
      onClick={(e) => {
        e.stopPropagation();
        downvotePost({ variables: { id: postId } });
      }}
    >
      {downVotedBy.includes(userId) ? (
        <BsArrowDownCircleFill />
      ) : (
        <BsArrowDownCircle />
      )}
    </button>
  );

  const classes = `w-8 flex flex-col space-y-1 items-center py-2 rounded-l-md ${className} `;

  return (
    <div className={classes}>
      {renderedUpvoteButton}
      <p>{score}</p>
      {renderedDownvoteButton}
    </div>
  );
}

export default Voter;

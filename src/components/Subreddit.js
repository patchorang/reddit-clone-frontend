import Feed from "./Feed";
import Button from "./Button";
import {
  SUBREDDITS,
  SUBREDDIT,
  JOIN_SUBREDDIT,
  LEAVE_SUBREDDIT,
  ME,
} from "../queries/queries";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";

function Subreddit() {
  const subredditName = useParams().id;

  // TODO implement optimistic UI
  const [joinSubreddit] = useMutation(JOIN_SUBREDDIT, {
    refetchQueries: [{ query: SUBREDDITS }],
  });
  const [leaveSubreddit] = useMutation(LEAVE_SUBREDDIT, {
    refetchQueries: [{ query: SUBREDDITS }],
  });

  const subreddit = useQuery(SUBREDDIT, {
    variables: { name: useParams().id },
  });

  const user = useQuery(ME);
  const result = useQuery(SUBREDDITS, {
    variables: { userId: user.data?.me?.id },
  });
  const userIsMember = result.data?.user?.subreddits.find((s) => {
    return s.name === subredditName;
  });

  const toggleSubredditMembership = (e) => {
    if (!userIsMember) {
      joinSubreddit({ variables: { name: subredditName } });
    } else {
      leaveSubreddit({ variables: { name: subredditName } });
    }
  };

  if (subreddit.loading || user.loading || result.loading) {
    return <div>Loading subreddit...</div>;
  }

  return (
    <div>
      <div className="flex flex-col mb-4">
        <div className="flex space-x-2">
          <h1 className="text-2xl font-bold">
            {subreddit.data.subreddit.description}
          </h1>
          <Button onClick={toggleSubredditMembership}>
            {userIsMember ? "Leave" : "Join"}
          </Button>
        </div>
        <div className="text-sm text-gray-500">
          r/{subreddit.data.subreddit.name}
        </div>
      </div>
      <Feed subreddit={subreddit.data.subreddit.name} />
    </div>
  );
}

export default Subreddit;

import SubredditSelector from "./SubredditSelector";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { SlPlus } from "react-icons/sl";

function Header({ userSubreddits }) {
  const navigate = useNavigate();

  const handleSubredditChange = (subreddit) => {
    if (subreddit === "Home") {
      navigate("/");
    } else if (subreddit === "Create Post") {
      navigate("/submit");
    } else {
      navigate(`/r/${subreddit}`);
    }
  };

  return (
    <div className="fixed flex justify-between items-center p-2 w-full bg-white px-8">
      <Link to="/" className="font-bold">
        Reddit
      </Link>
      <SubredditSelector
        userSubreddits={userSubreddits}
        includeHome={true}
        includeCreate={true}
        onChange={handleSubredditChange}
      />
      <input
        className="shadow appearance-none border rounded w-96 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        placeholder="Search does not work yet"
        type="search"
      />
      <button onClick={() => navigate("/submit")}>
        <SlPlus size={24} />
      </button>
      <div>Log In</div>
    </div>
  );
}

export default Header;

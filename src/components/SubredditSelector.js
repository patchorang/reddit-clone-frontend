import { useState } from "react";
import { useLocation } from "react-router-dom";

function SubredditSelector({
  userSubreddits,
  includeHome,
  includeCreate,
  onChange,
  defaultSelection,
}) {
  const location = useLocation();

  if (includeHome) {
    userSubreddits = [{ name: "Home" }, ...userSubreddits];
  }
  if (includeCreate) {
    userSubreddits = [{ name: "Create Post" }, ...userSubreddits];
  }

  let defaultValue = "Select a community";
  if (defaultSelection) {
    defaultValue = defaultSelection;
  } else if (location.pathname === "/") {
    defaultValue = "Home";
  } else if (location.pathname === "/submit") {
    defaultValue = "Create post";
  } else if (location.pathname.startsWith("/r")) {
    const subredditName = location.pathname.substring(3);
    defaultValue = subredditName;
  }

  const [selectedSubreddit, setSelectedSubreddit] = useState(defaultValue);

  const renderedSubreddits = userSubreddits?.map((s) => (
    <option key={s.name} value={s.name}>
      {s.name}
    </option>
  ));

  const handleChange = (e) => {
    const subreddit = e.target.value;
    setSelectedSubreddit(subreddit);
    onChange(subreddit);
  };

  return (
    <select
      className="appearance-none border rounded w-48 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      value={selectedSubreddit}
      onChange={handleChange}
    >
      {renderedSubreddits}
    </select>
  );
}

export default SubredditSelector;

import Feed from "./components/Feed";
import Subreddit from "./components/Subreddit";
import PostPage from "./components/PostPage";
import LoginForm from "./components/LoginForm";
import Header from "./components/Header";
import { useState, useEffect } from "react";
import { useApolloClient } from "@apollo/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { ME, SUBREDDITS } from "./queries/queries";
import CreateAPost from "./components/CreateAPost";
import { UserContext } from "./context/UserContext";

function App() {
  const [token, setToken] = useState(null);
  const client = useApolloClient();

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  useEffect(() => {
    const token = window.localStorage.getItem("reddit-user-token");
    if (token) {
      setToken(token);
    }
  }, []);

  const renderedLoggedOut = <LoginForm setToken={setToken} />;
  const renderedLoggedIn = (
    <div>
      <button onClick={logout}>log out</button>
    </div>
  );

  const user = useQuery(ME);
  const userSubreddits = useQuery(SUBREDDITS, {
    variables: { userId: user.data?.me?.id },
  });

  if (user.loading || userSubreddits.loading) {
    return <div>Loading...</div>;
  }

  return (
    <UserContext.Provider value={user?.data?.me}>
      <Router>
        <div className="App flex flex-col items-center">
          <Header userSubreddits={userSubreddits.data.user.subreddits} />
          <div className="w-100% h-16"></div>
          <Routes>
            <Route path="/" element={<Feed />} />
            <Route path="/r/:id" element={<Subreddit />} />
            <Route path="/r/:id/:postId" element={<PostPage />} />
            <Route
              path="/submit"
              element={
                <CreateAPost subreddits={userSubreddits.data.user.subreddits} />
              }
            />
          </Routes>
          {token ? renderedLoggedIn : renderedLoggedOut}
        </div>
      </Router>
    </UserContext.Provider>
  );
}

export default App;

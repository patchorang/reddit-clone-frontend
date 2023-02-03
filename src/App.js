import Feed from "./components/Feed";
import PostForm from "./components/PostForm";
import LoginForm from "./components/LoginForm";
import { useState, useEffect } from "react";
import { useApolloClient } from "@apollo/client";

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
      <PostForm />
      <button onClick={logout}>log out</button>
    </div>
  );

  return (
    <div className="App bg-slate-100 h-screen flex flex-col items-center">
      reddit
      <Feed />
      {token ? renderedLoggedIn : renderedLoggedOut}
    </div>
  );
}

export default App;

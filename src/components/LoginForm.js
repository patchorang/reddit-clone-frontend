import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../queries/queries";

function LoginForm({ setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [login, result] = useMutation(LOGIN);

  const submit = async (e) => {
    e.preventDefault();
    login({ variables: { username, password } });
  };

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      setToken(token);
      localStorage.setItem("reddit-user-token", token);
    }
  }, [result.data]);

  return (
    <form onSubmit={submit}>
      <div>
        username
        <input
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );
}

export default LoginForm;

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
} from "@apollo/client";
import ReactDOM from "react-dom/client";
import App from "./App";
import styles from "./index.css";
import { setContext } from "@apollo/client/link/context";

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("reddit-user-token");
  return {
    headers: {
      ...headers,
      authorization: token ? `bearer ${token}` : null,
    },
  };
});

const httpLink = new HttpLink({ uri: "http://localhost:4000" });

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

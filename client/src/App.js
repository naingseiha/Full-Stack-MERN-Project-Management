import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css"; // React Bootstrap styles

import Header from "./components/layout/Header";
import Home from "./pages/Home";
import Project from "./pages/Project";
import NotFound from "./pages/NotFound";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        projects: {
          keyArgs: false,
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  uri: "http://localhost:3000/graphql",
  cache: cache,
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="app-container">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects/:id" element={<Project />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <footer className="bg-white py-4 border-top">
            <div className="container text-center">
              <p className="text-muted mb-0">
                &copy; {new Date().getFullYear()} ProjectManage. All rights
                reserved.
              </p>
            </div>
          </footer>
        </div>
        <ToastContainer position="bottom-right" autoClose={3000} />
      </Router>
    </ApolloProvider>
  );
}

export default App;

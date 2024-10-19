import React from "react";
import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserSearch from "./components/UserSearch";
import RepoIssues from "./components/RepoIssues";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserSearch />} />
        <Route path="/repo-issue" element={<RepoIssues />} />
      </Routes>
    </Router>
  );
}

export default App;

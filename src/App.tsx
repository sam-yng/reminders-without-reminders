import React from "react";
import classNames from "classnames";
import { ListNav } from "./components/ListNav";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ListView } from "./components/ListView";
import { FilteredListView } from "./components/FilteredListView";

export const App: React.FC = () => {
  return (
    <Router>
      <main className={classNames("flex", "flex-row")}>
        <ListNav />
        <Routes>
          <Route path="/" element={<main></main>} />
          <Route path=":listId" element={<ListView />} />
          <Route
            path="/filteredList/:filteredId"
            element={<FilteredListView />}
          />
        </Routes>
      </main>
    </Router>
  );
};

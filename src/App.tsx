import React from "react";
import classNames from "classnames";
import { ListNav } from "./components/ListNav";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ListView } from "./components/ListView";

export const App: React.FC = () => {
  return (
    <Router>
      <main
        className={classNames("flex", "flex-row", "bg-black", "text-altwhite")}
      >
        <ListNav />
        <Routes>
          <Route path="/" element={<main></main>} />
          <Route path=":id" element={<ListView />} />
        </Routes>
      </main>
    </Router>
  );
};

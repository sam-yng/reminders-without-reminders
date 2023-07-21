import React, { useEffect } from "react";
import classNames from "classnames";
import { ListNav } from "./components/ListNav";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ListView } from "./components/ListView";

export const App: React.FC = () => {
  // useEffect(() => {
  //   const listStorage = localStorage.getItem("LISTS")
  //   if (listStorage !== null)
  // })

  return (
    <Router>
      <main
        className={classNames(
          "flex",
          "flex-row",
          "bg-offblack",
          "text-altwhite",
        )}
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

import React from "react";
import classNames from "classnames";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/listSlice";

export const ListView: React.FC = () => {
  const { id } = useParams();
  const listData = useSelector((state: RootState) => state.lists);
  const ListItem = listData.find((item) => item.id === id);

  return (
    <main>
      <h1 className={classNames("text-3xl", "text-altwhite")}>
        {ListItem?.name}
      </h1>
    </main>
  );
};

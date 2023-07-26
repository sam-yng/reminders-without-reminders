import React, { useMemo } from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { useReminders } from "../utils/useReminders";

type FilteredListProps = {
  icon: string;
  name: string;
};

export const FilteredList: React.FC<FilteredListProps> = ({
  icon,
  name,
}: FilteredListProps) => {
  const { flaggedTasks, taskData } = useReminders();

  const taskCount: number | undefined = useMemo(() => {
    if (name === "Flagged") {
      return flaggedTasks.length;
    }
    if (name === "All") {
      console.log(taskData);
      return taskData.length;
    }
  }, [taskData]);

  return (
    <Link
      to={`filteredList/${name.toLowerCase()}`}
      className={classNames("mx-2")}
    >
      <button
        className={classNames(
          "border-gray",
          "bg-offblack",
          "border",
          "flex-row",
          "flex",
          "justify-between",
          "px-2",
          "py-3",
          "w-full",
          "my-2",
          "rounded-xl",
        )}
      >
        <div className={classNames("flex", "flex-col")}>
          <img className={classNames("h-16", "w-16")} src={icon} />
          <h1 className={classNames("text-left", "mt-2")}>{name}</h1>
        </div>
        <h1 className={classNames("text-xl")}>{taskCount}</h1>
      </button>
    </Link>
  );
};

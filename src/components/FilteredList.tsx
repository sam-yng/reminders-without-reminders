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
  const { flaggedTasks, taskData, scheduledTasks, todayTasks } = useReminders();

  const taskCount: number | undefined = useMemo(() => {
    if (name === "Flagged") {
      return flaggedTasks.length;
    }
    if (name === "All") {
      return taskData.length;
    }
    if (name === "Scheduled") {
      return scheduledTasks.length;
    }
    if (name === "Today") {
      return todayTasks.length;
    }
  }, [taskData]);

  return (
    <Link
      to={`filteredList/${name.toLowerCase()}`}
      className={classNames("mx-2")}
    >
      <button
        className={classNames(
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
          <img className={classNames("h-12", "w-12")} src={icon} />
          <h1 className={classNames("text-left", "mt-2")}>{name}</h1>
        </div>
        <h1 className={classNames("text-xl")}>{taskCount}</h1>
      </button>
    </Link>
  );
};

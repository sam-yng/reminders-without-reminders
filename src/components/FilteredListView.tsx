import React, { useMemo } from "react";
import classNames from "classnames";
import { useParams } from "react-router-dom";
import { useReminders } from "../utils/useReminders";
import { Task } from "../utils/useReminders";
import { TaskItem } from "./TaskItem";

export const FilteredListView: React.FC = () => {
  const { filteredId } = useParams();
  const { flaggedTasks, taskData, scheduledTasks, todayTasks } = useReminders();

  const tasksToMap: Task[] = useMemo(() => {
    if (filteredId === "flagged") {
      return flaggedTasks;
    } else if (filteredId === "all") {
      return taskData;
    } else if (filteredId === "scheduled") {
      return scheduledTasks;
    } else if (filteredId === "today") {
      return todayTasks;
    } else {
      return [];
    }
  }, [filteredId, taskData]);

  return (
    <main className={classNames("w-1/2", "ml-16")}>
      <h1 className={classNames("text-4xl", "mt-8")}>
        {filteredId?.toUpperCase()}
      </h1>
      <input
        disabled
        className={classNames(
          "border",
          "rounded-lg",
          "mr-12",
          "py-2",
          "px-3",
          "w-full",
          "mt-8",
        )}
      />
      <ul
        className={classNames(
          "text-2xl",
          "mt-6",
          "ml-8",
          "list-disc",
          "tracking-wide",
          "space-y-3",
        )}
      >
        {tasksToMap.map((item) => (
          <TaskItem
            filtered={true}
            key={item.id}
            id={item.id}
            flagged={item.flagged}
            name={item.name}
          />
        ))}
      </ul>
    </main>
  );
};

import React, { useMemo } from "react";
import classNames from "classnames";
import { useParams } from "react-router-dom";
import { useReminders } from "../utils/useReminders";
import flag from "../assets/icons/image.png";
import check from "../assets/icons/checkmark.png";
import { flagTask, removeTask } from "../redux/taskSlice";
import { Task } from "../utils/useReminders";

export const FilteredListView: React.FC = () => {
  const { filteredId } = useParams();
  const { dispatch, flaggedTasks, taskData } = useReminders();

  const handleTaskRemove = (id: string) => {
    dispatch(removeTask({ id: id }));
  };

  const handleTaskFlag = (id: string, flagged: boolean) => {
    dispatch(flagTask({ id, flagged: !flagged }));
  };

  const tasksToMap: Task[] = useMemo(() => {
    if (filteredId === "flagged") {
      return flaggedTasks;
    } else if (filteredId === "all") {
      return taskData;
    } else {
      return [];
    }
  }, [filteredId, taskData]);

  return (
    <main className={classNames("w-1/2", "ml-16")}>
      <h1 className={classNames("text-4xl", "text-altwhite", "mt-8")}>
        {filteredId?.toUpperCase()}
      </h1>
      <form className={classNames("flex", "flex-row", "items-center", "mt-8")}>
        <input
          disabled
          autoFocus
          name="taskInput"
          className={classNames(
            "bg-offblack",
            "border",
            "border-gray",
            "rounded-lg",
            "mr-12",
            "py-2",
            "px-3",
            "w-full",
          )}
        />
      </form>
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
          <div
            key={item.id}
            className={classNames(
              "flex",
              "flex-row",
              "items-center",
              "justify-between",
              "w-11/12",
            )}
          >
            <li
              onClick={() => handleTaskRemove(item.id)}
              className={classNames(
                "hover:line-through",
                "hover:cursor-pointer",
              )}
            >
              {item.name}
            </li>
            <button onClick={() => handleTaskFlag(item.id, item.flagged)}>
              <img
                className={classNames(
                  "h-8",
                  "bg-altwhite",
                  "bg-opacity-10",
                  "p-2",
                  "rounded-xl",
                )}
                src={item.flagged ? check : flag}
              />
            </button>
          </div>
        ))}
      </ul>
    </main>
  );
};

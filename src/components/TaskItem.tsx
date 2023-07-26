import React from "react";
import classNames from "classnames";
import flag from "../assets/icons/red-flag.png";
import check from "../assets/icons/checkmark.png";
import { DateInput } from "./DateInput";
import { useReminders } from "../utils/useReminders";
import { removeTask, flagTask } from "../redux/taskSlice";

type TaskItemProps = {
  id: string;
  flagged: boolean;
  name: string;
  filtered: boolean;
};

export const TaskItem: React.FC<TaskItemProps> = ({
  id,
  flagged,
  name,
  filtered,
}: TaskItemProps) => {
  const { dispatch } = useReminders();

  const handleTaskRemove = (id: string) => {
    dispatch(removeTask({ id: id }));
  };

  const handleTaskFlag = (id: string, flagged: boolean) => {
    dispatch(flagTask({ id, flagged: !flagged }));
  };

  return (
    <div
      className={classNames(
        "flex",
        "flex-row",
        "items-center",
        "justify-between",
        "w-11/12",
      )}
      key={id}
    >
      <li
        onClick={() => handleTaskRemove(id)}
        className={classNames("hover:line-through", "hover:cursor-pointer")}
      >
        {name}
      </li>
      <div className={classNames("flex", "flex-row", "space-y-2")}>
        <DateInput disabled={filtered} id={id} />
        <button onClick={() => handleTaskFlag(id, flagged)}>
          <img
            className={classNames(
              "h-9",
              "bg-altwhite",
              "bg-opacity-10",
              "p-2",
              "rounded-xl",
            )}
            src={flagged ? check : flag}
          />
        </button>
      </div>
    </div>
  );
};

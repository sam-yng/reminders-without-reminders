import React from "react";
import classNames from "classnames";
import add from "../assets/icons/more.png";
import { useFormik } from "formik";
import { addTask, removeTask, flagTask } from "../redux/taskSlice";
import { useReminders } from "../utils/useReminders";
import { FormikErrors } from "../utils/useReminders";
import { useParams } from "react-router-dom";
import flag from "../assets/icons/image.png";
import check from "../assets/icons/checkmark.png";

export const ListView: React.FC = () => {
  const { dispatch, taskData, listData } = useReminders();
  const { listId } = useParams();
  const ListItem = listData.find((item) => item.id === listId);

  const handleTaskAdd = () => {
    dispatch(addTask({ name: formik.values.taskInput, listId: listId }));
  };

  const handleTaskRemove = (id: string) => {
    dispatch(removeTask({ id: id }));
  };

  const handleTaskFlag = (id: string, flagged: boolean) => {
    dispatch(flagTask({ id, flagged: !flagged }));
  };

  const formik = useFormik({
    initialValues: {
      taskInput: "",
    },
    validate() {
      const errors: FormikErrors = {};
      formik.values.taskInput === ""
        ? (errors.taskInput = "Task must have a name")
        : null;
    },
    onSubmit: () => {
      handleTaskAdd();
      formik.values.taskInput = "";
    },
  });

  return (
    <main className={classNames("w-1/2", "ml-16")}>
      <h1 className={classNames("text-4xl", "text-altwhite", "mt-8")}>
        {ListItem?.name}
      </h1>
      <form
        onSubmit={formik.handleSubmit}
        className={classNames("flex", "flex-row", "items-center", "mt-8")}
      >
        <input
          autoFocus
          name="taskInput"
          placeholder="Add Task"
          value={formik.values.taskInput}
          onChange={formik.handleChange}
          className={classNames(
            "bg-offblack",
            "border",
            "border-gray",
            "rounded-lg",
            "w-full",
            "py-2",
            "px-3",
          )}
        />
        <button type="submit">
          <img className="h-10 ml-2" src={add} />
        </button>
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
        {taskData
          .filter((item) => item.listId === listId)
          .map((item) => (
            <div
              className={classNames(
                "flex",
                "flex-row",
                "items-center",
                "justify-between",
                "w-11/12",
              )}
              key={item.id}
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

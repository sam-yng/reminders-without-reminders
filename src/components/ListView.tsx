import React from "react";
import classNames from "classnames";
import add from "../assets/images/more.png";
import { useFormik } from "formik";
import { addTask } from "../redux/taskSlice";
import { useReminders } from "../utils/useReminders";
import { FormikErrors } from "../utils/useReminders";
import { useParams } from "react-router-dom";

export const ListView: React.FC = () => {
  const { dispatch, taskData, listData } = useReminders();
  const { id } = useParams();
  const ListItem = listData.find((item) => item.id === id);

  const handleTaskAdd = () => {
    dispatch(addTask({ name: formik.values.taskInput, listId: id }));
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
      console.log(ListItem);
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
          "tracking-wider",
          "space-y-2",
        )}
      >
        {taskData
          .filter((item) => item.listId === id)
          .map((item) => (
            <div key={item.id}>
              <li>{item.name}</li>
            </div>
          ))}
      </ul>
    </main>
  );
};

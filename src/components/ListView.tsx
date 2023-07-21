import React from "react";
import classNames from "classnames";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ListState } from "../redux/listSlice";
import add from "../assets/images/more.png";
import { useFormik } from "formik";
import { FormikErrors } from "./ListNav";
import { TaskState, addTask } from "../redux/taskSlice";

export const ListView: React.FC = () => {
  const { id } = useParams();
  const listData = useSelector((state: ListState) => state.lists);
  const taskData = useSelector((state: TaskState) => state.tasks);
  const ListItem = listData.find((item) => item.id === id);
  const dispatch = useDispatch();

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
    onSubmit: (values) => {
      console.log(values);
      handleTaskAdd();
      console.log(taskData);
      formik.values.taskInput = "";
    },
  });

  return (
    <main className={classNames("w-1/2")}>
      <h1 className={classNames("text-4xl", "text-altwhite", "ml-16", "mt-8")}>
        {ListItem?.name}
      </h1>
      <form
        onSubmit={formik.handleSubmit}
        className={classNames("flex", "flex-row", "items-center", "mt-8")}
      >
        <input
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
            "ml-16",
            "py-2",
            "px-3",
          )}
        />
        <button type="submit">
          <img className="h-10 ml-2" src={add} />
        </button>
      </form>
    </main>
  );
};

import React, { useEffect } from "react";
import classNames from "classnames";
import { useSelector } from "react-redux";
import { ListState, List } from "../redux/listSlice";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { addList, removeList } from "../redux/listSlice";
import { useDispatch } from "react-redux";
import add from "../assets/images/more.png";

export type FormikErrors = {
  listInput?: string;
  taskInput?: string;
};

export const ListNav: React.FC = () => {
  const listData = useSelector((state: ListState) => state.lists);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/");
  }, []);

  const handleListAdd = () => {
    dispatch(addList({ name: formik.values.listInput }));
  };

  const handleListRemove = (id: string) => {
    dispatch(removeList({ id: id }));
  };

  const formik = useFormik({
    initialValues: {
      listInput: "",
    },
    validate() {
      const errors: FormikErrors = {};
      formik.values.listInput === ""
        ? (errors.listInput = "List must have a name")
        : null;
    },
    onSubmit: (values) => {
      console.log(values);
      handleListAdd();
      console.log(listData);
      formik.values.listInput = "";
    },
  });

  return (
    <main
      className={classNames(
        "border-r-2",
        "border-white",
        "min-w-[25vw]",
        "h-screen",
      )}
    >
      <nav className={classNames("py-6", "px-5")}>
        <h1 className={classNames("text-xl", "font-semibold")}>
          REMINDERS WITHOUT<br></br>REMINDERS
        </h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            formik.handleSubmit(e);
          }}
          className={classNames("flex", "flex-row", "items-center", "mt-6")}
        >
          <input
            name="listInput"
            value={formik.values.listInput}
            onChange={formik.handleChange}
            placeholder="Add List"
            className={classNames(
              "bg-offblack",
              "border",
              "border-gray",
              "rounded-lg",
              "w-full",
              "py-2",
              "px-3",
              "mr-2",
            )}
          />
          <button type="submit">
            <img className="h-10" src={add} />
          </button>
        </form>
        <h1 className={classNames("text-gray", "text-lg", "mt-4")}>My Lists</h1>
        <ul className={classNames("ml-2", "mt-2", "text-lg", "tracking-wider")}>
          {listData.map((item) => (
            <div
              key={item.id}
              className={classNames(
                "flex",
                "flex-row",
                "items-center",
                "mb-2",
                "justify-between",
              )}
            >
              <Link to={`${item.id}`} reloadDocument={false}>
                <li key={item.id}>{item.name}</li>
              </Link>
              <button
                onClick={() => handleListRemove(item.id)}
                className={classNames("border", "border-altwhite", "mr-2")}
              >
                <img src={add} className={classNames("rotate-45", "h-4")} />
              </button>
            </div>
          ))}
        </ul>
      </nav>
    </main>
  );
};

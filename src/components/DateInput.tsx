import React from "react";
import classNames from "classnames";
import date from "../assets/icons/calendar-two.png";
import { useFormik } from "formik";
import { FormikErrors, useReminders } from "../utils/useReminders";
import { setTaskDate } from "../redux/taskSlice";

type DateInputProps = {
  id: string;
  disabled?: boolean;
};

export const DateInput: React.FC<DateInputProps> = ({
  id,
  disabled,
}: DateInputProps) => {
  const { dispatch } = useReminders();

  const handleDateSubmit = (id: string, date: string) => {
    dispatch(setTaskDate({ id: id, date: date }));
  };

  const formik = useFormik({
    initialValues: {
      dateInput: "",
    },
    validate() {
      const errors: FormikErrors = {};
      formik.values.dateInput.length !== 10
        ? (errors.dateInput = "Date must be formated as DD/MM/YYYY")
        : null;
    },
    onSubmit: () => {
      handleDateSubmit(id, formik.values.dateInput);
      console.log(formik.values.dateInput);
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className={classNames(
        "border",
        "flex",
        "items-center",
        "rounded-xl",
        "p-1",
      )}
    >
      <img src={date} className={classNames("h-5", "pl-2")} />
      <input
        disabled={disabled}
        name="dateInput"
        onChange={formik.handleChange}
        value={formik.values.dateInput}
        placeholder="Add Date"
        className={classNames(
          "rounded-lg",
          "w-36",
          "text-sm",
          "h-full",
          "active:outline-none",
          "focus:outline-none",
          "ml-4",
        )}
      />
    </form>
  );
};

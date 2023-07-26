import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import { isToday } from "date-fns";
import React, { createContext, useContext, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

export interface TaskState {
  tasks: Task[];
}

export interface Task {
  id: string;
  name: string;
  complete?: boolean;
  flagged: boolean;
  listId: string | null;
  date: string;
}

export interface ListState {
  lists: List[];
}

export interface List {
  id: string;
  name: string;
}

export type FormikErrors = {
  listInput?: string;
  taskInput?: string;
  dateInput?: string;
};

export type RemindersContextType = {
  listData: List[];
  taskData: Task[];
  dispatch: Dispatch<AnyAction>;
  flaggedTasks: Task[];
  scheduledTasks: Task[];
  isDateToday: (date: string) => boolean;
  todayTasks: Task[];
};

const RemindersContext = createContext<RemindersContextType | undefined>(
  undefined,
);

export const RemindersProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const listData = useSelector((state: ListState) => state.lists);
  const taskData = useSelector((state: TaskState) => state.tasks);
  const dispatch = useDispatch();
  const flaggedTasks = taskData.filter((item) => item.flagged === true);
  const scheduledTasks = taskData.filter((item) => item.date.length > 0);

  const isDateToday = (date: string) => {
    const numbers = date.split("/");
    const dateObj = new Date(+numbers[2], numbers[1] - 1, +numbers[0]);
    return isToday(dateObj);
  };
  const todayTasks = taskData.filter((item) => isDateToday(item.date));

  const value = useMemo(
    () => ({
      listData,
      taskData,
      dispatch,
      flaggedTasks,
      scheduledTasks,
      todayTasks,
      isDateToday,
    }),
    [
      listData,
      taskData,
      dispatch,
      flaggedTasks,
      scheduledTasks,
      todayTasks,
      isDateToday,
    ],
  );

  return (
    <RemindersContext.Provider value={value}>
      {children}
    </RemindersContext.Provider>
  );
};

export const useReminders = (): RemindersContextType => {
  const value = useContext(RemindersContext);
  if (!value) {
    throw new Error(
      "useReminders can only be called from within a RemindersProvider",
    );
  }
  return value;
};

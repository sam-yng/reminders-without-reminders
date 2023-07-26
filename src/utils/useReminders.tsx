import { AnyAction, Dispatch } from "@reduxjs/toolkit";
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
};

export type RemindersContextType = {
  listData: List[];
  taskData: Task[];
  dispatch: Dispatch<AnyAction>;
  flaggedTasks: Task[];
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

  const value = useMemo(
    () => ({
      listData,
      taskData,
      dispatch,
      flaggedTasks,
    }),
    [listData, taskData, dispatch, flaggedTasks],
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

import { Dispatch, SetStateAction } from "react";
import { TTodo } from "../types/types";

export const loadTodos = (setTodos: Dispatch<SetStateAction<TTodo[]>>) => {
  const storedTodos = localStorage.getItem("todos");
  if (storedTodos) {
    setTodos(JSON.parse(storedTodos));
  }
};

export const saveTodos = (
  newTodos: TTodo[],
  setTodos?: Dispatch<SetStateAction<TTodo[]>>
) => {
  setTodos?.(newTodos);
  localStorage.setItem("todos", JSON.stringify(newTodos));
};

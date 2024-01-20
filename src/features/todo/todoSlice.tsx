import { createSlice, PayloadAction, nanoid } from "@reduxjs/toolkit";

interface Todo {
  id: string;
  text: string;
}

interface TodoState {
  todos: Todo[];
}

const initialState: TodoState = {
  todos: [],
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<{ text: string }>) => {
      const todo: Todo = {
        id: nanoid(),
        text: action.payload.text,
      };
      state.todos.push(todo);
    },

    removeTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
  },
});

export const { addTodo, removeTodo } = todoSlice.actions;
export default todoSlice.reducer;




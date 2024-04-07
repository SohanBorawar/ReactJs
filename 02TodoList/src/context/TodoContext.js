import { createContext,useContext } from "react";

export const TodoContext = createContext(
    {
        todos: [],
        addTodo: (todo) => {},
        deleteTodo: (id) => {},
        updateTodo: (id, newTodo) => {}
    }
);

export const TodoProvider = TodoContext.Provider;
 
const useTodoContext = () => {
    return useContext(TodoContext);
}

export default useTodoContext;
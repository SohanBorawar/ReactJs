import { useState } from "react";
import "./App.css";
import AddTodos from "./components/AddTodos/AddTodos";
import { TodoProvider } from "./context/TodoContext";
import TodoList from "./components/TodoList/TodoList";
import { CompletedList } from "./components/TodoList/TodoList";

import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'


function App() {
  const [todos, setTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);

  const addTodo = (todos) => {
    setTodos((prevTodos) => {
      return [{ id: Date.now(), ...todos }, ...prevTodos];
    });
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const updateTodo = (id, newTodo) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, todo: newTodo };
        }
        return todo;
      })
    );
  };

  return (
    <>
     <DndProvider backend={HTML5Backend}>
        <TodoProvider value={{ todos, addTodo, deleteTodo, updateTodo }}>
          <div className="bg-gray-500 min-h-screen flex justify-center items-center flex-col gap-5">
            <div>
              <AddTodos />
            </div>
            <div className="TodoListContainer">
            <div className="TodoList">
            <h1 className="text-2xl">Todos</h1>
              {todos.length === 0 && (
                <h1 className="text-center text-2xl mt-10">No Todos</h1>
              )}
              {todos.length > 0 &&
                todos.map((todo) => {
                  return (
                    <div key={todo.id}>
                      <TodoList todo={todo} />
                    </div>
                  );
                })}
            </div>
            <div className="TodoList">
              <h1 className="text-2xl">Completed Todos</h1>
              {completedTodos.length === 0 && (
                <h1 className="text-center text-2xl mt-10">No Completed Todos</h1>
              )}
              {completedTodos.length > 0 &&
                completedTodos.map((todo) => {
                  return (
                    <div key={todo.id}>
                      <TodoList props={setCompletedTodos} />
                    </div>
                  );
                })}
            </div>
            </div>
            
          </div>
        </TodoProvider>
      </DndProvider>
    </>
  );
}

export default App;

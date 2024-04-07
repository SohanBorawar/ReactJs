import React, { useState } from "react";
import  useTodoContext  from "../../context/TodoContext";
import { useDrag } from 'react-dnd'
import { useDrop } from 'react-dnd'


export default function TodoItem({ todo }) {
    
    const [isTodoEditable, setIsTodoEditable] = useState(false);
    const [todoMsg, setTodoMsg] = useState(todo.todo);
    const { deleteTodo , updateTodo } = useTodoContext();  

    const editTodo = () => {
        updateTodo(todo.id, { todo: todoMsg });
        setIsTodoEditable((prev) => !prev);
    }

    const deleteTodoItem = (id) => {
        deleteTodo(id);
    }

    const toggleCompleted = () => {
        toggleTodo(todo.id);
    };

    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'todo',
        item: { id: todo.id },
        collect: (monitor) => ({
          isDragging: !!monitor.isDragging()
        })
      }))

    return (
        <div ref={drag} style={{ opacity : isDragging ? 0.5 : 1 }}
            className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300  text-black ${
                todo.completed ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"
            }`}
        >
            <input
                type="text"
                className={`border outline-none w-full bg-transparent rounded-lg ${
                    isTodoEditable ? "border-black/10 px-2" : "border-transparent"
                } ${todo.completed ? "line-through" : ""}`}
                value={todoMsg}
                onChange={(e) => setTodoMsg(e.target.value)}
                readOnly={!isTodoEditable}
            />
            {/* Edit, Save Button */}
            <button
                className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
                onClick={() => {
                    if (todo.completed) return;

                    if (isTodoEditable) {
                        editTodo();
                    } else setIsTodoEditable((prev) => !prev);
                }}
                disabled={todo.completed}
            >
                {isTodoEditable ? "📁" : "✏️"}
            </button>
            {/* Delete Todo Button */}
            <button
                className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
                onClick={() => deleteTodoItem(todo.id)}
            >
                ❌
            </button>
        </div>
    );
}

export const CompletedList = (props) => {

    const [{ isOver }, drop] = useDrop(() => ({
        accept: 'todo',
        drop: (item) => {
            console.log(item);
            return addItemToCompleted(item.id)},
        collect: (monitor) => ({
          isOver: !!monitor.isOver()
        })
      }));

      const addItemToCompleted = (id) => {
        
        const completedTodo = todos.find((todo) => todo.id === id);
        if (completedTodo) {
          props.setCompletedTodos([...completedTodos, completedTodo]);
          deleteTodoItem(id);
        }
      }

    return (
        <div ref={drop} className="flex flex-col gap-3">
            <h1 className="text-xl font-bold">Completed Todos</h1>
            <div className="flex flex-col gap-3">
                {completedTodos.map((todo) => (
                    <TodoItem key={todo.id} todo={todo} />
                ))}
            </div>
        </div>
    );
}
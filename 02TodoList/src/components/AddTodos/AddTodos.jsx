import React, { useState } from 'react';
import './AddTodos.css';
import useTodoContext from '../../context/TodoContext';
export default function AddTodos() {
  const [todo, setTodo] = useState("");
  const {addTodo } = useTodoContext();

  const addTodoToList = () => {
    if(todo === "") {
      alert("Please enter a todo");
    }
    else{
      console.log(todo);
      addTodo({todo: todo});
    }
  }

  return (
    <div className="addInput">
      <input type="text" placeholder="Add a new todo" 
      onChange={(e)=> {setTodo(e.target.value)}}
      value={todo}
       />
      <button 
      draggable={true}
      onClick={() => addTodoToList()}
      >Add</button>
    </div>
  )
}
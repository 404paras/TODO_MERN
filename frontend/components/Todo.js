import React from "react";
import "../styles/Todo.css";
import { useState } from "react";
import TodoCard from "./TodoCard";

const Todo = () => {
  const [createTask, setCreateTask] = useState(false);
  const [taskList, setTaskList] = useState([]);
  const [inputs, setInputs] = useState({ title: "", body: "" });

  const create = () => {
    setCreateTask((prev) => !prev);
    document.getElementById("input").style.display = "block";
  };

  const change = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const addTask = () => {
    setTaskList((prevTaskList) => [...prevTaskList, inputs]);
    setInputs({ title: "", body: "" });
    setCreateTask(false);
    document.getElementById("input").style.display = "none";
  };

  const cardDel = (id) => {
    console.log(id);
    setTaskList(prevTaskList => prevTaskList.filter((task, index) => index !== id));
  };
  


  return (
    <div className="todo">
      <div className="add">
        <div className="title " id="input">
          <input
            type="text"
            name="title"
            placeholder="TITLE"
            value={inputs.title}
            onChange={change}
          />
          <textarea
            type="text"
            name="body"
            placeholder="BODY"
            value={inputs.body}
            onChange={change}
          />
        </div>
        {createTask ? (
          <button onClick={addTask} className="btn-add">
            Add Task
          </button>
        ) : (
          <button onClick={create} className="btn-create">
            Create Task
          </button>
        )}
      </div>
      <div className="cards">
       
        {taskList.length>0 ?(
          taskList.map((items, index) => (
            <TodoCard
              key={index}
              id={index}
              title={items.title}
              body={items.body}
              deleteCard={cardDel}
            />
          ))):(<h1 style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "60vh", margin: 0 }}>No task to display!!</h1>)}
      </div>
    </div>
  );
};

export default Todo;

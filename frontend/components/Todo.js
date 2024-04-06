import React, { useEffect } from "react";
import "../styles/Todo.css";
import { useState } from "react";
import TodoCard from "./TodoCard";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

const Todo = () => {
  const id = sessionStorage.getItem("id");

  const isLogin = useSelector((state) => state.isLogin);

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

  const addTask = async () => {
    if (isLogin && id) {
      await axios
        .post("http://localhost:3000/api/v2/addTask", {
          title: inputs.title,
          id: id,
          body: inputs.body,
        })
        .then((response) => {
          setInputs({ title: "", body: "" });
          setCreateTask(false);
          toast.success("Task added successfully");
          document.getElementById("input").style.display = "none";
        });
    } else {
      setTaskList((prevTaskList) => [...prevTaskList, inputs]);
      setInputs({ title: "", body: "" });
      setCreateTask(false);
      toast.success("Task added successfully");
      toast.error("Data is not saved. Please SignIn");
    }
  };

  const cardDel = async(user_id) => {
    
    if(id){
    
    await axios.delete(`http://localhost:3000/api/v2/deleteTask/${user_id}`).then((response)=>{
      console.log(response);
    });
    toast.success("Task deleted successfully")
    
    } else{  
    
        setTaskList((prevTaskList) =>
          prevTaskList.filter((task, index) => index !== user_id)
        );
      
      }
      };


  useEffect(() => {
    if(isLogin && id){
    const fetchTasks = async () => {
      
      try {
        const { data } = await axios.get(`http://localhost:3000/api/v2/getAllTask/${id}`);
        setTaskList(data.message);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();} // Fetch tasks initially
  }, [addTask]); // Trigger effect when addTask changes

 

  return (
    <div className="todo">
      <ToastContainer />
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
        {taskList.length > 0 ? (
          taskList.map((items, index) => (
            
            
            <TodoCard
              key={index}
              id={items._id || index}
              title={items.title}
              body={items.body}
              deleteCard={cardDel}
            />
          ))
        ) : (
          <h1
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "60vh",
              margin: 0,
            }}
          >
            No task to display!!
          </h1>
        )}
      </div>
    </div>
  );
};

export default Todo;

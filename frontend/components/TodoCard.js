import React from 'react'
import '../styles/todocard.css'
import { MdDelete } from "react-icons/md";
import { GrUpdate } from "react-icons/gr";

const TodoCard = ({title,body,id ,deleteCard }) => {

const deleteHandler=()=>{

  deleteCard(id);
  
}


  return (<div className='container'>
    <div className='data'>
    <div className='heading'>{title}</div>
    <div className='body'> {body}</div>
    </div><div className='control-btns'>
    <div className="update"> <GrUpdate /> </div>
    <div className="delete" onClick={deleteHandler}><MdDelete/> </div></div>

    </div>
  )
}

export default TodoCard
import React, { useState } from 'react';
import Inputs from './Components/Input/Inputs';
const App = () => {
  const [todo,settodo]=useState([])
  // const [edit,setEdit]=useState(false)
  const addTodo=(todoName,Description,status)=>{
    const data={
      id:todo.length+1,
      nm:todoName,
      des:Description,
      status:status
    }
    const todos=[...todo,data]
    settodo(todos)    
    console.log(todos);
  }
  const delTodo=(id)=>{
settodo(todo.filter((todo)=>todo.id!==id))
  }

 
  // console.log(todo);
  return (
    <>
    <Inputs  addTodo={addTodo} todo={todo} settodo={settodo} delTodo={delTodo}/>
    </>
  );
};

export default App;
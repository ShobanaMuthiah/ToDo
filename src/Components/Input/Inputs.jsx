import React, { useState, useEffect } from 'react';

const Inputs = ({ addTodo, todo, settodo, delTodo }) => {
    const [editing, setEditing] = useState(false);
    const [editId, setEditId] = useState(null);
    const [nm, setName] = useState('');
    const [des, setDes] = useState('');
    const [filter, setFilter] = useState('All');
    const [filterTodo, setFilterTodo] = useState([]);

    useEffect(() => {
        if (filter === 'All') {
            setFilterTodo(todo);
        } 
        else if (filter === 'Completed') {
            const completedTodos = todo.filter(item => item.status === true);
            // console.log(completedTodos);
            setFilterTodo(completedTodos)
            
        } else if (filter === 'Not Completed') {
            const notCompletedTodos = todo.filter(item => item.status === false);
            setFilterTodo(notCompletedTodos);
        }
    }, [filter, todo]);

    const submitTodo = () => {
        addTodo(nm, des, false); // Initialize new todos with status set to false
        setName('');
        setDes('');
    };

    const editTodo = (id) => {
        setEditing(true);
        setEditId(id);
        const edit = todo.find(i => i.id === id);
        if (edit) {
            setName(edit.nm);
            setDes(edit.des);
        }
    };

    const saveTodo = () => {
        const updatedTodos = todo.map(t => {
            if (t.id === editId) {
                return { ...t, nm, des }; // Update name and description
            }
            return t;
        });
        settodo(updatedTodos);
        setEditing(false);
        setEditId(null);
        setName('');
        setDes('');
    };

    const handleStatusChange = (id, newStatus) => {
        const updatedTodos = todo.map(t => {
            if (t.id === id) {
                return { ...t, status: newStatus }; // Update status of the specific todo
            }
            return t;
        });
        settodo(updatedTodos);
    };

    return (
        <>
            <h3 className='title'>My Todo</h3>
            <input type="text" value={nm} placeholder="Todo Name" onChange={(e) => setName(e.target.value)} />
            <input type="text" value={des} placeholder="Todo Description" onChange={(e) => setDes(e.target.value)} />
            {editing ? (
                <button className='save' onClick={saveTodo}>Save Todo</button>
            ) : (
                <button className='add' onClick={submitTodo}>Add Todo</button>
            )}
<div className="bodyhead">
            <h3>My Todos</h3>
            <h5>Status Filter :&nbsp;  &nbsp;
                <select id="filter" className='filt w-auto ' value={filter} onChange={(e) => setFilter(e.target.value)}>
                    <option value="All">All</option>
                    <option value="Completed">Completed</option>
                    <option value="Not Completed">Not Completed</option>
                </select>
            </h5></div>
            <div className="row row-cols-1 row-cols-sm-3 g-3">
                {filterTodo.map((ele) => (
                    <div key={ele.id}>
                        <div className="col">
                            <div className="card">
                                <p><b>Name:</b> {ele.nm}</p>
                                <p><b>Description:</b> {ele.des}</p>
                                <p><b>Status:</b> <select id="com" className={ele.status?'comp':'notcomp'}
                                        value={ele.status}
                                        onChange={(e) => handleStatusChange(ele.id, e.target.value === 'true')}
                                    >
                                        <option  value="true">Completed</option>
                                        <option  value="false">Not Completed</option>
                                    </select>
                                </p>
<div className="cardbtn">
<button className='edit' onClick={() => editTodo(ele.id)}>Edit</button>
                                <button className='del' onClick={() => delTodo(ele.id)}>Delete</button>
</div>
                                
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Inputs;

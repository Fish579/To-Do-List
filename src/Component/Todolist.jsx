import React, { useState } from 'react';
import { BiCheckCircle, BiCheckDouble, BiEdit, BiRefresh, BiReset, BiTrash } from "react-icons/bi";
import './Todolist.css';

function Todolist() {
    const [todos, setTodos] = useState([]);
    const [inputvalue, setinputvalue] = useState('');
    const [editindex, seteditindex] = useState(-1);

    const addtodo = () => {
        if (inputvalue.trim() !== '') {
            if (editindex !== -1) {
                const updatetodos = [...todos];
                updatetodos[editindex] = { task: inputvalue, completed: updatetodos[editindex].completed };
                setTodos(updatetodos);
                setinputvalue('');
                seteditindex(-1);  // Corrected
            } else {
                setTodos([...todos, { task: inputvalue, completed: false }]); // Corrected
                setinputvalue('');
            }
        }
    };

    const startedit = (index) => {
        setinputvalue(todos[index].task);
        seteditindex(index);
    };

    const canceledit = () => {  // No need for index here
        setinputvalue('');
        seteditindex(-1);
    };

    const removetodo = (index) => {
        const updatedtodos = todos.filter((_, i) => i !== index);
        setTodos(updatedtodos);
    };

    const toglecompleted = (index) => {
        const updatedtodos = [...todos];
        updatedtodos[index].completed = !updatedtodos[index].completed;
        setTodos(updatedtodos); // Corrected
    };

    return (
        <div className="todo-container">
            <h1>To-Do List</h1>
            <div className='input-section'>
                <input 
                    type="text" 
                    className="input-field" 
                    value={inputvalue} 
                    onChange={(e) => setinputvalue(e.target.value)} 
                    placeholder='Enter a new task' 
                />
                {editindex !== -1 ? (
                    <>
                        <button onClick={addtodo} className="update-btn"><BiCheckDouble /></button>
                        <button onClick={canceledit} className="cancel-btn"><BiRefresh /></button>
                    </>
                ) : (
                    <button onClick={addtodo} className="add-btn">Add</button>
                )}
            </div>
            <ul className="todo-list">
                {todos.map((todo, index) => (
                    <li key={index} className={todo.completed ? 'completed' : ''}>
                        {todo.task}
                        <div className="btn-group">
                            <button onClick={() => startedit(index)} className="btn-edit"><BiEdit /></button> {/* Corrected */}
                            <button onClick={() => removetodo(index)} className="btn-remove"><BiTrash /></button>
                            <button onClick={() => toglecompleted(index)} className="btn-done">
                                {todo.completed ? <BiReset /> : <BiCheckCircle />}
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Todolist;

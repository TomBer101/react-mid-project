import React, { useState } from 'react';

import '../../styles/components/TodoForm.css'

function TodoForm( {onAddTodo, handleCancel}) {
    const [title, setTitle] = useState('');

    const handleChange = (event) => {
        setTitle(event.target.value)
    }

    const handleSubmit = event => {
        event.preventDefault();
        onAddTodo(title);
        setTitle('');
    }
    
    const onCancel = event => {
        event.preventDefault();
        handleCancel();
    }
     
//what is the difference or what should be my conciderations either to send the user id or to get it from the app state?
    return (
        <form className='todo-form'>
            <div className="input-group">
                <label>Title: </label>
                <input type='text' name='title' value={title} onChange={handleChange}/>
            </div>
            <div className="button-container">
                <button className='btn' onClick={onCancel}>Cancle</button>
                <button className='btn' type='submit' onClick={handleSubmit}>Add</button>
            </div>
        </form>
    );
}

export default TodoForm;
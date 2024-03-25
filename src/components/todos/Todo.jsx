import React from 'react';

import '../../styles/components/Todo.css'

function Todo({title, completed, todoId, markAsComplete}) {
 
    return (
        <div className='todo block'>
            <label>Title :</label> <p>{title}</p><br/>
            <label>Completed:</label> {completed.toString()}
            {!completed && <button className='btn' onClick={() => markAsComplete(todoId)}>Mark Completed</button>}
        </div>
    );
}

export default Todo;
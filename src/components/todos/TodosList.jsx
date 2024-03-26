import React from 'react';
import Todo from './Todo';

import '../../styles/components/TodosList.css';

function TodosList({todos, userId, markAsComplete, openForm}) {
    return (
        <div className='todos-list container'>
            <span>Todos - User {userId} <button className='btn' onClick={() => openForm()}>Add</button></span>

            <div className="list-container">
                {
                    todos.map(todo => <Todo 
                        key={todo.id} 
                        completed={todo.completed} 
                        markAsComplete={markAsComplete} 
                        title={todo.title} 
                        todoId={todo.id} />)
                }
            </div>
        </div>
    );
}

export default TodosList;
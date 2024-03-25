import React, { useState } from 'react';

import TodosList from './TodosList';
import TodoForm from './TodoForm';

function Todos({todos, onCreateTodo, onCompleteTodo, userId}) {
    const [showTodos, setShowTodos] = useState(true);


    return (
        <div className='todos'>
            {
                showTodos ? <TodosList markAsComplete={onCompleteTodo} todos={todos} userId={userId} /> :
                            <TodoForm />
            }
        </div>
    );
}

export default Todos;
import React, { useState } from 'react';

import TodosList from './TodosList';
import TodoForm from './TodoForm';

function Todos({todos, onAddTodo, onCompleteTodo, userId}) {
    const [showTodos, setShowTodos] = useState(true);


    return (
        <div className='todos'>
            {
                showTodos ? <TodosList 
                            markAsComplete={onCompleteTodo} 
                            todos={todos} 
                            userId={userId}
                            openForm={() => setShowTodos(false)}/> 
                             :
                            <TodoForm handleCancel={() => setShowTodos(true)}
                            onAddTodo={onAddTodo}/>
            }
        </div>
    );
}

export default Todos;
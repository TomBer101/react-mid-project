import React from 'react';

import '../styles/UserPage.css'
import Todos from '../components/todos/Todos';
import Posts from '../components/posts/Posts';

function UserPage({userId, todos, posts, markTodoCompleted}) {
    return (
        <div className='user-page'>
            <Todos onCompleteTodo={markTodoCompleted} todos={todos} userId={userId}/>
            <Posts posts={posts} userId={userId}/>
        </div>
    );
}

export default UserPage;
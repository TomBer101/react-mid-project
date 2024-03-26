import React from 'react';

import '../styles/UserPage.css'
import Todos from '../components/todos/Todos';
import Posts from '../components/posts/Posts';

function UserPage({userId, todos, posts, markTodoCompleted, onAddTodo, onAddPost}) {

    console.log(todos);
    return (
        <div className='user-page'>
            <Todos onCompleteTodo={markTodoCompleted} todos={todos} userId={userId} onAddTodo={onAddTodo}/>
            <Posts posts={posts} userId={userId} onAddPost={onAddPost}/>
        </div>
    );
}

export default UserPage;
import React from 'react';
import PostsList from './PostsList';

function Posts({posts, userId, onAddTodo}) {
    return (
        <div className='posts'>
            <PostsList posts={posts} userId={userId}/>
        </div>
    );
}

export default Posts;
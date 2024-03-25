import React from 'react';
import PostsList from './PostsList';

function Posts({posts, userId}) {
    return (
        <div className='posts'>
            <PostsList posts={posts} userId={userId}/>
        </div>
    );
}

export default Posts;
import React, { useState } from 'react';
import PostsList from './PostsList';
import PostForm from './PostForm';

function Posts({posts, userId, onAddPost}) {
    const [showPosts, setShowPosts] = useState(true);

    return (
        <div className='posts'>
            {
                showPosts ? <PostsList posts={posts} userId={userId} openForm={() => setShowPosts(false)}/>
                :
                <PostForm handleCancel={() => setShowPosts(true)} onAddPost={onAddPost}/>
            }
        </div>
    );
}

export default Posts;
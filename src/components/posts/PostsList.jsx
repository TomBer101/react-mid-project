import React from 'react';
import Post from './Post';

function PostsList({posts, userId}) {
    return (
        <div className="posts-list">
            <span>Todos - User {userId} <button className='btn'>Add</button></span>

            <div className='list-container'>
            {
                posts.map(post => <Post key={post.id} body={post.body} title={post.title} />)
            }
        </div>
        </div>
        
    );
}

export default PostsList;
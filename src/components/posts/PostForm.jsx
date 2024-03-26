import React, { useState } from 'react';

function PostForm({onAddPost, handleCancel}) {
    const [postInput, setPostInput] = useState({
        title : '',
        body : ''
    });

    const handleChange = event => {
        const {name, value} = event.target;
        setPostInput({
            ...postInput,
            [name] : value
        });
    }

    const onCancel = event => {
        event.preventDefault();
        handleCancel();
    }

    const handleSubmit = event => {
        event.preventDefault();
        onAddPost(postInput);
        setPostInput({
            title : '',
            body :''
        });
    }

    return (
        <form action="" className="post-form">
            <div className="input-group">
                <label>Title : </label>
                <input type='text' name='title' value={postInput.title} onChange={handleChange} />
            </div>
            <div className="input-group">
                <label>Body : </label>
                <input type='text' name='body' value={postInput.body} onChange={handleChange} />
            </div>
            <div className="button-container">
                <button className='btn' onClick={onCancel}>Cancle</button>
                <button className='btn' type='submit' onClick={handleSubmit}>Add</button>
            </div>
        </form>
    );
}

export default PostForm;
import React, { useState } from 'react';

import '../styles/components/UserForm.css'

function UserForm({ onCancel, handleAddUser }) {
    const [userInput, setUserInput] = useState({
        name: '',
        email: ''
    });

    const handleChange = event => {
        const { name, value } = event.target;
        setUserInput({
            ...userInput,
            [name]: value
        });
    }

    const handleCancel = event => {
        event.preventDefault();
        onCancel();
    }

    const handleSubmit = event => {
        event.preventDefault();
        handleAddUser(userInput);
        setUserInput({
            name : '',
            email :''
        });
    }

    return (
        <form action="" className="user-form">
            <div className="input-group">
                <label>Name : </label>
                <input type='text' name='name' value={userInput.name} onChange={handleChange} />
            </div>
            <div className="input-group">
                <label>Email : </label>
                <input type='text' name='email' value={userInput.email} onChange={handleChange} />
            </div>
            <div className="button-container">
                <button className='btn' onClick={handleCancel}>Cancle</button>
                <button className='btn' type='submit' onClick={handleSubmit}>Add</button>
            </div>
        </form>
    );
}

export default UserForm;
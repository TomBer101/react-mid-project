import React, { useState } from 'react';
import UsersList from '../components/UsersList';

import '../styles/UsersPage.css'

function UsersPage({users, updateUser, deleteUser, usersWithUncompletedTasks}) {
    const [searchTerm, setSearchTerm] = useState('');
console.log(usersWithUncompletedTasks);
    const handleSearchTermChange = event => {
        setSearchTerm(event.target.value);
    }

    return (
        <div className='users-page'>
            <div className="users-page-header">
                Search: <input type='text' value={searchTerm} onChange={handleSearchTermChange} />
                <button>Add</button>
            </div>
            
            <UsersList 
                filterTerm={searchTerm} 
                users={users} 
                updateUser={updateUser} 
                deleteUser={deleteUser} 
                usersWithUncompletedTasks={usersWithUncompletedTasks}/>      
        </div>
    );
}

export default UsersPage;
import React from 'react';
import User from './User';

import '../styles/components/UsersList.css'

function UsersList({users, filterTerm}) {


    let userComponents;

    if (filterTerm) {
        const lowerCaseTerm = filterTerm.toLowerCase();

        const filteredUsers = users.filter(user => {
            const lowerCaseName = user.name.toLowerCase();
            const lowerCaseEmail = user.email.toLowerCase();
            
            return lowerCaseEmail.includes(lowerCaseTerm) || lowerCaseName.includes(lowerCaseTerm);
        });

        userComponents = filteredUsers.map(user => (
            <User key={user.id} {...user} />
        ))
    } else {
        userComponents = users.map(user => <User key={user.id} {...user} />);
    }


    return (
        <div className='users-list'>
            { userComponents }
        </div>
    );
}

export default UsersList;
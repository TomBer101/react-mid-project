import React from 'react';
import User from './User';

import '../styles/components/UsersList.css'

function UsersList({users, filterTerm, updateUser, deleteUser, usersWithUncompletedTasks, chooseUser, chosenUser}) {
console.log("users: ", users);
console.log('users with tasks: ', usersWithUncompletedTasks);

    let userComponents;

    if (filterTerm) {
        const lowerCaseTerm = filterTerm.toLowerCase();

        const filteredUsers = users.filter(user => {
            const lowerCaseName = user.name.toLowerCase();
            const lowerCaseEmail = user.email.toLowerCase();
            
            return lowerCaseEmail.includes(lowerCaseTerm) || lowerCaseName.includes(lowerCaseTerm);
        });
        console.log('filtered users: ', filteredUsers);

        userComponents = filteredUsers.map(user => (
            <User key={user.id} {...user}                                        updateUser={updateUser} 
            deleteUser={deleteUser} 
            openTodos={usersWithUncompletedTasks.has(user.id.toString())}
            chooseUser={chooseUser}
            chosenUser={chosenUser}/>
        ))
    } else {
        userComponents = users.map(user => <User 
                                        key={user.id} 
                                        {...user} 
                                        updateUser={updateUser} 
                                        deleteUser={deleteUser} 
                                        openTodos={usersWithUncompletedTasks.has(user.id.toString())}
                                        chooseUser={chooseUser}
                                        chosenUser={chosenUser}
                                        />);
    }


    return (
        <div className='users-list'>
            { userComponents }
        </div>
    );
}

export default UsersList;
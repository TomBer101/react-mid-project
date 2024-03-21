
import { useState } from 'react';
import '../styles/components/User.css'


const User = ({ id, name, email, address, posts, todos }) => {
    const [expanded, setExpanded] = useState(false);

    const openTodos = todos.find(todo => !todo.completed) !== undefined ? true : false;

    return (
        <div className={`user ${openTodos ? 'red-border' : 'green-border'}`}>
            <div className="user-basic-details">
                <label>ID: {id}</label> 
                <label >Name :  <input type="text" value={name} name="name" /> </label>
                <lable>Email : <input type="email" value={email} name="email" /> </lable> 
            </div>

            <div className="button-container">
                <div className="more-detailes">
                <button className="show-more" onMouseEnter={() => setExpanded(true)} onClick={() =>{console.log('cik'); setExpanded(false)} }>Other Data</button>
                <div className="extra-data" style={{display : expanded? 'block' : 'none'}}>
                    <label>Street:<input type="text" value={address.street} name="name" /> </label>  
                    <label >City :  <input type="text" value={address.city} name="name" /> </label>
                    <lable>Zip Code : <input type="email" value={address.zipcode} name="email" /> </lable> 
                </div>
                </div>
               
                <div className="action-buttons-container">
                    <button>Update</button>
                    <button>Delete</button>
                </div>
            </div>

        </div>
    )
}

export default User;

import { useState } from 'react';
import '../styles/components/User.css'


const User = ({ id, name, email, address, updateUser, deleteUser, openTodos, chooseUser, chosenUser }) => {
    const [expanded, setExpanded] = useState(false);
    const [user, setUser] = useState ({
        id : id,
        name : name,
        email : email,
        street : address?.street,
        city : address?.city,
        zipcode : address?.zipcode
    })


    const handleUpdate = () => {
        const newData = {
            id : id, 
            name : user.name,
            email : user.email,
            address : {
                street : user.street,
                city : user.city,
                zipcode : user.zipcode
            }
        }

        updateUser(id, newData);
    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        setUser({
            ...user,
            [name] : value
        })
    }

    return (
        <div className={`user ${openTodos ? 'red-border' : 'green-border'} ${chosenUser === id? 'chosen-user' : ''}`}>
            <div className="user-basic-details">
                <label onClick={() => {chooseUser(id); console.log(chosenUser);}}>ID: {id}</label>
                <div className="input-group">
                                    <label >Name :</label>
                <input style={{display : "inline-block"}} type="text" value={user.name} name="name" onChange={handleChange}/> 
                </div>
                <div className="input-group">
                <label>Email :</label>
                <input type="email" value={user.email} name="email" onChange={handleChange}/>  
                </div>

            </div>

            <div className="button-container">
                <div className="more-detailes">
                    <button className="show-more btn" onMouseEnter={() => setExpanded(true)} onClick={() =>{setExpanded(false)} }>Other Data</button>
                    <div className="extra-data" style={{display : expanded? 'flex' : 'none'}}>
                        <label>Street:<input type="text" value={address?.street} name="street" onChange={handleChange}/> </label>  
                        <label >City :  <input type="text" value={address?.city} name="city" onChange={handleChange}/> </label>
                        <label>Zip Code : <input type="email" value={address?.zipcode} name="zipcode" onChange={handleChange}/> </label> 
                    </div>
                </div>
               
                <div className="action-buttons-container">
                    <button className='btn' onClick={handleUpdate}>Update</button>
                    <button className='btn' onClick={() => deleteUser(id)}>Delete</button>
                </div>
            </div>

        </div>
    )
}

export default User;
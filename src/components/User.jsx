

const User = ({id, name, email}) => {

    return (
        <div className="user">
            ID: {id}
            Name : <input type="text" value={name} name="name" />
            Email : <input type="email" value={email} name="email" />

            <button className="show-more">Other Data</button>
            <div className="action-buttons-container">
                <button>Update</button>
                <button>Delete</button>
            </div>
        </div>
    )
}

export default User;
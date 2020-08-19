import React from 'react';
import { Link } from 'react-router-dom'

function User(props) {
    let { user } = props

    const updateUser = () => {
        props.updateUser(user.id)
    }

    return (
        <Link to='/catalog'>
            <div className='user' onClick={updateUser} style={{ backgroundImage: `url(${user.img})`, backgroundSize: '100% 100%' }}>.</div>
            <div className='user-name'>{user.name}</div>
        </Link>
    )
}

export default User;

import React, { Component } from 'react';
import { Link } from 'react-router-dom'
// import '../CSSFILE'

class User extends Component {

    updateUser = () => {
        this.props.updateUser(this.props.user.id)
    }
    render() {
        let user = this.props.user

        return (
            <Link to='/catalog'>
                    <div className='user' onClick={this.updateUser} style={{ backgroundImage: `url(${user.img})`, backgroundSize: '100% 100%' }}>.</div>
                    <div className='user-name'>{user.name}</div>
            </Link>
        )
    }
}

export default User;

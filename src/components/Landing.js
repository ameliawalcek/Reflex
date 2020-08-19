import React from 'react';
//import '../style/JS_FILE'
import User from './User';

function Landing(props) {

    return (
        <div id='landing'>
            <h2>Who's Watching?</h2>
            <div id="user-container">
                {props.users.map(u => <User key={u.name} user={u} updateUser={props.updateUser} />)}
            </div>
        </div>
    )
}

export default Landing;
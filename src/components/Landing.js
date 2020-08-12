import React, { Component } from 'react';
//import '../style/JS_FILE'
import { BrowserRouter as Router, Link } from "react-router-dom"
import User from './User';

class Landing extends Component {

    render() {
        return (
            <div>
                <div id='landing'>
                    <h2>Who's Watching?</h2>
                    <div id="user-container">
                        {this.props.users.map(u => <User key={u.name} user={u} updateUser={this.props.updateUser} />)}
                    </div>
                </div>
            </div>
        )
    }
}

export default Landing;
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Maverick extends Component {
    render() {
        return (
            <div>
                <h1>But, Maverick is better!!</h1>
                <Link to='/'>Home</Link>
            </div>
        )
    }
}

export default Maverick;
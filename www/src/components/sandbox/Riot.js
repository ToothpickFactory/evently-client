import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Riot extends Component {
    state = {};
  
    // _awesomeAlert = () => {
    //     alert(`${this.props.name} the builder!`);
    // }
    
    render(){
        return(
            <div>
                <h1>RIOT IS FREAKING AWESOME!!!!###</h1>
                <Link to='/'>Home</Link>
            </div>
        )
    }
}

export default Riot;
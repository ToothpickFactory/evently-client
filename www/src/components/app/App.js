import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Components 
import EventCreate from '../event-create/Event-Create';
import Giffy from '../giffy/Giffy';
import Event from '../event/Event';
import Events from '../events/Events';
import NavBar from '../navbar/NavBar';
import Api from '../api/Api';

// Style
import './App.scss';

class App extends Component {
    
    render() {
        return (
            <BrowserRouter>
                <div className="App container">
                    <NavBar />
                    <Switch>
                        <Route path='/e/:eventId' component={Event}/>
                        <Route path='/giffy' component={Giffy}/>
                        <Route path='/e' component={Events}/>
                        <Route path='/api' component={Api}/>
                        <Route path='/' component={EventCreate}/>
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { URL_API } from '../../data/config';
import './Events.scss';
import SearchForm from '../searchform/SearchForm';

class Events extends Component {
	
	constructor (props) {
	    super(props);
	    this.state = {
	    	events: []
	    };
	}
	
	componentDidMount() {
		// GET data
		this.performSearch('');
	}
	
	performSearch = (query) => {
        let url = '';
        if (query !== '') {
        	console.log(query);
        	const queries = this.createQuery(query);
            url = `${URL_API}/events?${queries}`;
        } else {
            url = `${URL_API}/events`;
        }
        
        axios.get(url)
          .then( response => {
          	console.log(response);
        	this.setState({
				events: response.data
			});
          })
          .catch( error => {
            console.log('Error fetching and parsing data', error);
        });
    }
    
    createQuery(query){
    	let queryString = "tags=";
    	const strings = query.split(" ");
    	strings.map((singleString, index) => (
    		queryString += singleString + "&"
    	));
    	//tags=dont&tags=do&tags=drugs
    	console.log("queryString", queryString);
    	return queryString;
    }
    
  getDateString(milli){
  	const datetime = new Date(milli);
  	const days = ["Sun","Mon","Tues","Wed","Thur","Fri","Sat"];
  	const months = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec" ];
  	
  	const day = days[datetime.getDay()];
  	const month = months[datetime.getMonth()];
  	const date = datetime.getDate();
  	const year = datetime.getFullYear();
  	const hours = datetime.getHours() > 12 ? (datetime.getHours() - 12) : datetime.getHours();
  	const minutes = datetime.getMinutes() < 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();
  	const timezone = datetime.toString().match(/\((.*)\)/).pop();
  	const am = "AM";
  	const pm = "PM";
  	
  	let dateString = `${day} ${month} ${date}, ${year} ${hours}:${minutes} ${datetime.getHours() < 12 ? am : pm} (${timezone})`;
  	return dateString;
  }

  render() {
    return (
    	<div>
    		<div className="left-col">
    			<SearchForm onSearch={this.performSearch} />
    		</div>
    		<div className="right-col">
    			{this.state.events.map((event, index) => (
    			<div className="event-form" key={event._id}>
    				<Link to={'/e/' + event._id}>
						<p><strong>Title:</strong> {event.title}</p>
						<p><strong>Organizer:</strong> {event.owner.name}</p>
						<p><strong>Slots Available:</strong> {event.slots - event.participants.length}</p>
						<p><strong>Start Time:</strong> { this.getDateString(event.startTime) }</p>
						{ event.tags &&
							<p><strong>Tags:</strong> {event.tags.map((tag, index) => (<span key={index}>{tag}&nbsp;</span>))}</p>
						}
					</Link>
				</div>
    			))}
    		</div>
		</div>
    );
  }
}

export default Events;
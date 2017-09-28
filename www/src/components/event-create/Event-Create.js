import React, { Component } from 'react';
import { Router, Redirect } from 'react-router-dom';
import axios from 'axios';
import ReCAPTCHA from "react-google-recaptcha";

import { URL_API } from '../../data/config';
import './Event-Create.scss';

class EventCreate extends Component {
	
	constructor () {
	    super();
	    this.state = {
	    	redirect: false,
	        title: "",
	        slots: 0,
	        startTime: 0,
	        tags: [],
	        owner: "",
	        id: 0
	    };
	}
	
	createTags(tagsString){
		let tagsArray = [];
		tagsArray = tagsString.split(",");
		tagsArray = this.trimTags(tagsArray);
		return tagsArray;
	}
	
	trimTags(tagsArray){
		let trimmedTags = [];
		tagsArray.map( (tag) => { trimmedTags.push(tag.trim().toLowerCase()); });
		return trimmedTags;
	}
	
	onChange(value) {
  		console.log("Captcha value:", value);
	}	
	
	handleChange = e => {
	    const target = e.target;
	    const value = target.value;
	    const name = target.name;
	    
	    if (name === "startTime") {
	    	this.setState({
	        startTime: Date.parse(value)
	    });
	    } else if(name === "tags") {
	    	this.setState({
	        tags: this.createTags(value)
	    	});
	    } else if(name === "slots") {
	    	this.setState({
	        slots: parseInt(value)
	    	});
	    } else {
	    	this.setState({
	        [name]: value
	    	});
	    }
	}
	
	handleSubmit = e => {
        e.preventDefault();
        console.log("Submitted", this.state);
        const config = {
  				headers: {'Content-Type': 'application/json'}
				};
        axios.post(`${URL_API}/events`, {
						  "title": this.state.title,
						  "slots": this.state.slots,
						  "startTime": this.state.startTime,
						  "participants": [],
						  "tags": this.state.tags,
						  "owner": {
						  	"id": this.state.owner.toUpperCase(), 
						    "name": this.state.owner
						  }
		        }, config )
		        .then( response => {
		        	console.log(response);
		        	this.setState({ id: response.data._id });
		        	this.setState({ redirect: true });
		        })
		        .catch( error => {
	        		console.log('ERROR:', error.response);
	        		// error message
        });
        
        
        e.currentTarget.reset();
    }
  
  render() {
  	const { redirect } = this.state;
  	const url = `/events/${this.state.id}`;
    	
  	if (redirect) {
  		return <Redirect push to={{
  							pathname: url,
  							state: { title: this.state.title }
  		}} />;
  	}
    	
    return (
      <div className="event-form">
				<form onSubmit={this.handleSubmit}>
					<input name="title" onChange={this.handleChange} type="text" placeholder="Title" />
					<input name="owner" onChange={this.handleChange} type="text" placeholder="Owner" />
					<input name="slots" onChange={this.handleChange} type="number" placeholder="Slots" />
					<input name="startTime"  onChange={this.handleChange} type="datetime-local" placeholder="Start Time" />
					<input name="tags" onChange={this.handleChange} type="text" placeholder="Tags (Comma separated)" />
					<button type="submit">CREATE</button>
					<ReCAPTCHA
					    ref="recaptcha"
					    sitekey="Your client site key"
					    onChange={this.onChange}
					/>
				</form>
			</div>
    );
  }
}

export default EventCreate;


// {
//   "secondId": "-erfdwe",
//   "thirdId": "edc-ewq",
//   "title": "Raiding the black zone",
//   "slots": 10,
//   "startTime": 123,
//   "owner": {
//     "id": "cde3vfr4",
//     "name": "Riotgear66"
//   },
//   "webhook": "http://some-address.com/webhook"
// }
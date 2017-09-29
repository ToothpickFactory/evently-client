import React, { Component } from 'react';
import axios from 'axios';
import ReCAPTCHA from "react-google-recaptcha";

import { URL_API } from '../../data/config';
import './Event.scss';

class Event extends Component {
	
	constructor (props) {
	    super(props);
	    this.state = {
	        id: this.props.match.params.eventId,
	        title: "",
	        startTime: 0,
	        slots: 0,
	        participants: [],
	        tags: [],
	        joined: false,
	        newPlayer: {}
	    };
	}
	
	componentWillMount() {
		// GET form data
		const url = `${URL_API}/events/${this.state.id}`;
		axios.get(url)
			.then( response => {
				console.log(response);
				this.setState({
					title: response.data.title,
					startTime: response.data.startTime,
					slots: response.data.slots,
					participants: response.data.participants,
					owner: response.data.owner,
					tags: response.data.tags
				});
			})
			.catch( error => {
				console.log(error);
		});
	}
	
	handleChange = e => {
	    const target = e.target;
	    const value = target.value;
	    
	    this.setState({
	        newPlayer: { "id": value.toUpperCase(), 
	        						 "name": value }
	    });
	}
	
	handleSubmit = e => {
        e.preventDefault();
        console.log("handleSubmit", this.state);
        let players = this.state.participants;
        players.push(this.state.newPlayer);
        
        this.setState({
        	participants: players,
        	joined: true
        });
        
        const url = `${URL_API}/events/${this.state.id}`;
        const config = {
  				headers: {'Content-Type': 'application/json'}
				};
        axios.put(url, {
        			"_id": this.state.id,
						  "title": this.state.title,
						  "slots": this.state.slots,
						  "startTime": this.state.startTime,
						  "participants": this.state.participants,
						  "owner": this.state.owner,
						  "tags": this.state.tags
		        }, config )
		        .then( response => {
		        	console.log(response);
		        	// this.setState({ redirect: true });
		        })
		        .catch( error => {
	        		console.log('ERROR:', error.response);
	        		// error message
        });
        
        e.currentTarget.reset();
    }
    
  handleRemove = e => {
  	console.log("handleRemove", this.state);
  	e.preventDefault();
  	let players = this.state.participants;
    let index = players.indexOf(this.state.newPlayer.name);
    players.splice(index, 1);
    
    this.setState({
    	participants: players,
    	joined: false,
    	newPlayer: {}
    });
    
    const url = `http://45.55.247.237:3003/events/${this.state.id}`;
    const config = {
			headers: {'Content-Type': 'application/json'}
		};
    axios.put(url, {
    			"_id": this.state.id,
				  "title": this.state.title,
				  "slots": this.state.slots,
				  "startTime": this.state.startTime,
				  "participants": this.state.participants,
				  "owner": this.state.owner,
				  "tags": this.state.tags
        }, config )
        .then( response => {
        	console.log(response);
        	// this.setState({ redirect: true });
        })
        .catch( error => {
      		console.log('ERROR:', error.response);
      		// error message
    });
  }
  
  countDown() {
  	const _second = 1000;
  	const _minute = _second * 60;
  	const _hour = _minute * 60;
  	const _day = _hour * 24;
  	
  	const now = new Date();
  	const distance = this.state.startTime - now;
  	
  	if(distance < 0) {
  		return "EXPIRED";
  	}
  	
  	const days = Math.floor(distance / _day);
  	const hours = Math.floor((distance % _day) / _hour);
  	const minutes = Math.floor((distance % _hour) / _minute);
  	
  	let timer = `${days}d ${hours}hr ${minutes}min`;
  	
  	return timer;
  }
  
  displayInput() {
  	if ((this.state.slots - this.state.participants.length) > 0 && this.state.joined == false) {
  		return (<input name='newPlayer' onChange={this.handleChange} type='text' placeholder='Input Name' />);
			}
  }
  
  displaySubmitButton(){
  	if ((this.state.slots - this.state.participants.length) > 0 && this.state.joined == false ) {
  		return (<button type="submit">JOIN</button>);
			} else if ((this.state.slots - this.state.participants.length) > 0 && this.state.joined == true) {
				return (<button type="button" onClick={this.handleRemove.bind(this)} style={{background: "red"}}>REMOVE</button>);
			} else {
				return (<span className="eventFull">EVENT FULL</span>);
			}
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
  
  onChange(value) {
  	console.log("Captcha value:", value);
	}	
  
  render() {
    return (
      <div className="event-form">
				<form onSubmit={this.handleSubmit}>
  				<span><strong>Title:</strong> {this.state.title} <br /></span>
  				<span><strong>Starts In:</strong> {this.countDown()} <br /></span>
  				<span><strong>Start Date:</strong> { this.getDateString(this.state.startTime)} <br /></span>
  				<span><strong>Tags:</strong> { this.state.tags && this.state.tags.map((tag, index) => (<span key={index}>{tag}&nbsp;</span>))}   </span>
  				<span><strong>Participants: </strong></span>{this.state.participants.map((participant, index) => (
  					<div key={index}>{participant.name}</div>
  				))}
  				{ this.displayInput()	}
  				{ this.displaySubmitButton() }
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

export default Event;
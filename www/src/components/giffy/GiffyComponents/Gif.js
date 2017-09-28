import React from 'react';

class Gif extends React.Component {
    
    state = {
        url: this.props.url
    }
     
    // onGifClick = url => {
    //     this.setState({ gifUrl: url });
    //     console.log("Gif Clicked ", this.state.gifUrl);
    //     this.handleClick();
    // }
    
    // handleClick = () => {
    //     this.props.handleClick(this.state.gifUrl);
    // }
    
    render() {
        return (
            <li className="gif-wrap" onClick={() => { this.props.handleClick(this.state.url)}}>
                <img src={this.props.url} alt="" />
            </li>
        );
    }
}

export default Gif;



//<GifPage url={props.url} />
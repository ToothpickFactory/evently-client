import React from 'react';
import axios from 'axios';
import './Giffy.scss';

import GifList from './GiffyComponents/GifList';
import SearchForm from './GiffyComponents/SearchForm';
import GifPage from './GiffyComponents/GifPage';

class Giffy extends React.Component {
   
    constructor() {
        super();
        this.state = {
          gifs: [],
          gifUrl: ""
        };
    }
    
    componentDidMount() {
        this.performSearch();
    }
    
    performSearch = (query) => {
        let url = '';
        if (query !== '') {
            url = `https://api.giphy.com/v1/gifs/search?api_key=a2f4f5dcff284eb6a5b981a861088b1a&q=${query}&limit=24`;
        } else {
            url = "https://api.giphy.com/v1/gifs/trending?api_key=a2f4f5dcff284eb6a5b981a861088b1a&limit=24";
        }
        
        axios.get(url)
          .then( response => {
              this.setState({
                gifs: response.data.data,
                gifUrl: ""
              })
          })
          .catch( error => {
            console.log('Error fetching and parsing data', error);
          });
    }
    
    getGif = (url) => {
        this.setState({
            gifUrl: url  
        });
    }
    
    render() {
        return (
            <div>
                <div className="main-header">
                    <div className="inner">
                        <h1 onClick={this.performSearch}  className="main-title">GifSearch</h1>
                        <SearchForm onSearch={this.performSearch} />
                    </div>
                </div>
                <div className="main-content">
                    { this.state.gifUrl !== "" ? (
                        <GifPage url={this.state.gifUrl} handleClick={this.getGif} />
                    ) : (
                        <GifList handleClick={this.getGif} data={this.state.gifs} />
                    )}
                </div>
            </div>    
        )
    }
}

export default Giffy;
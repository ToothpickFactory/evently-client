import React from 'react';

const GifPage = props => (
  <div className='gif-page'>
    <img src={props.url} alt="" onClick={props.handleClick}/>
    <p>Copy Url: <br />{props.url}</p>
  </div>
);

export default GifPage;
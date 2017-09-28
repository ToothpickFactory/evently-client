import React, { Component } from 'react';
import './SearchForm.scss';

class SearchForm extends Component {
    
    state = {
        searchText: ''
    }
    
    onSearchChange = e => {
        this.setState({ searchText: e.target.value.toLowerCase() });
    }
    
    handleSubmit = e => {
        e.preventDefault();
        this.props.onSearch(this.state.searchText);
        e.currentTarget.reset();
    }
    
    render() {
        return (
            <form className="searchform" onSubmit={this.handleSubmit} >
                <label className="is-hidden" htmlFor="search">Search</label>
                <input type="search"
                       onChange={this.onSearchChange}
                       name="search"
                       placeholder="Search Tags..." />
                <button type="submit" id="submit" className="searchbutton">
                    <i className="material-icons icnsearch">search</i>
                </button>
            </form>
        );
    }
}

export default SearchForm;
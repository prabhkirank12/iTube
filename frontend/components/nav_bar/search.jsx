import React from 'react';
import _ from "lodash";
import { queryVideoCreator } from '../../util/video_api_util';
// form for the search bar
// add onChange, debounce it
// need an ajax request, create 

class SearchBar extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            video: '',
            queryString: ''         
        };
        this.setState = this.setState.bind(this);
        this.queryVideo = queryVideoCreator(this.setState);
        this.handleChange = this.handleChange.bind(this);
        this.sendQuery = this.sendQuery.bind(this);
    }

    //takes in the event, to get the value
    handleChange(e) {
        e.preventDefault();
        this.setState(() => ({queryString: e.target.value}));
        this.sendQuery();
    }

    sendQuery() {
        // debounce it here
        this.queryVideo(this.state.queryString);
    }

    render(){
        return (
            <form className="search" >
                <input type="text" className="search-bar" placeholder="Search"  onChange={_.debounce(this.handleChange, 300)}/>
                {/* If this.state.videos === '' then return null Search dropdown component pass prop this.state.videos, show ul list with video titles add (Link) */}
            </form>
        )
    }

}

export default SearchBar;
//The home page

import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../side_bar/side_bar'
import NavBar from '../nav_bar/nav_bar_container'
import VideoIndex from "../video/video_index_container"
import FixedSideBar from '../fixed_side_bar/fixed_sidebar_container';


class Home extends React.Component {
    constructor(props){
        super(props);
    }
    render () {

        const sessionLinks = () => (
            <>
                <nav>
                    <NavBar history={this.props.history}/>
                </nav>
                <div className="app-page">
                    <FixedSideBar />
                    <VideoIndex history={this.props.history}/>
                </div>
            </>
        );
        return (
            sessionLinks()
        )
    }
}
export default Home;

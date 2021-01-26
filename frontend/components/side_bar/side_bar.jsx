//Sidebar that open when clicked on the menu icon
import React from 'react';
import { Link } from 'react-router-dom';
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";

class SideBar extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            open: true
        }
    }
    render(){
        return(
            <div className="side-bar">
                <Link to="/" className="home">
                    <AiIcons.AiFillHome className="side-icons" />
                    <p>Home</p>
                </Link>
                <a target="_blank" href="https://github.com/prabhkirank12" className="github">
                    <FaIcons.FaGithub /> 
                    <p>Github</p>
                </a>
                <a target="_blank" href="https://github.com/prabhkirank12" className="linkedin">
                    <FaIcons.FaLinkedin/> 
                    <p>LinkedIn</p>
                </a>
            </div>
        )
    }
}

export default SideBar;
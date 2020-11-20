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
                    <button>
                        <AiIcons.AiOutlineHome />
                        <p>Home</p>
                    </button> 
                </Link>
                <a href="https://github.com/prabhkirank12" className="github">
                    <button>
                        <FaIcons.FaGithub /> 
                        <p>Github</p>
                    </button>
                </a>
                <a href="https://github.com/prabhkirank12" className="linkedin">
                    <button>
                        <FaIcons.FaLinkedin/> 
                        <p>LinkedIn</p>
                    </button>
                </a>
            </div>
        )
    }
}

export default SideBar;
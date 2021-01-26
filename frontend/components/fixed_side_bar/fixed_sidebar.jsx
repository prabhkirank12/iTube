//Fixed Sidebar on the homepage
import React from 'react';
import * as FaIcons from "react-icons/fa";
import * as HiIcons from "react-icons/hi";
import * as MdIcons from "react-icons/md";
import * as AiIcons from "react-icons/ai";

class FixedSideBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: true
        }
    }
    render() {
        return (
            <div className="fixed-side-bar">
                <a href="/" className="new-icons" >
                    <AiIcons.AiFillHome className="side-icons" />
                    <p id="ptag" className="home-btn">Home</p>
                </a>
                <a target="_blank" href="https://github.com/prabhkirank12" className="new-icons">
                    <FaIcons.FaGithub className="side-icons" />
                    <p id="ptag">Github</p>
                </a>
                <a target="_blank" href="https://github.com/prabhkirank12" className="new-icons">
                    <FaIcons.FaLinkedin className="side-icons" />
                    <p id="ptag">LinkedIn</p>
                </a>
            </div>
        )
    }
}


export default FixedSideBar; 
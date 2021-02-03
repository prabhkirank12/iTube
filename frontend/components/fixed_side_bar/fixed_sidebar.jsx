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
                <a target="_blank" href="https://www.linkedin.com/in/prabhkiran-kaur-a4754161/" className="new-icons">
                    <FaIcons.FaLinkedin className="side-icons" />
                    <p id="ptag">LinkedIn</p>
                </a>
                <a target="_blank" href="https://angel.co/u/prabhkiran-kaur" className="new-icons">
                    <FaIcons.FaAngellist className="side-icons" />
                    <p id="ptag">AngelList</p>
                </a>
            </div>
        )
    }
}


export default FixedSideBar; 
import React from 'react';
import { Link } from 'react-router-dom';
import * as FaIcons from "react-icons/fa";
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
                    <button id="home-icon">
                        <AiIcons.AiOutlineHome className="side-icons" />
                        <p id="ptag" className="home-btn">Home</p>
                    </button>
                </a>
                <a href="https://github.com/prabhkirank12" className="new-icons">
                    <button>
                        <FaIcons.FaGithub className="side-icons" />
                        <p id="ptag">Github</p>
                    </button>
                </a>
                <a href="https://github.com/prabhkirank12" className="new-icons">
                    <button>
                        <FaIcons.FaLinkedin className="side-icons"/>
                        <p id="ptag">LinkedIn</p>
                    </button>
                </a>
            </div>
        )
    }
}

export default FixedSideBar;
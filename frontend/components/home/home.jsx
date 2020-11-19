import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
// import DropdownItem from 'react-bootstrap/esm/DropdownItem';
import Sidebar from '../side_bar/side_bar'
import NavBar from '../nav_bar/nav_bar_container'
// import { SidebarData } from '../side_bar/side_bar_data'
// import * as AiIcons from "react-icons/ai"

class Home extends React.Component {
    constructor(props){
        super(props);
    }
    render () {

        const sessionLinks = () => (
            <nav>
                <NavBar />
            </nav>
        );
        const personalHome = () => {
            return (
            <hgroup>
                <h2>Hi, {this.props.currentUser.first_name}!</h2>
                <div className="dropdown">
                    <Dropdown>
                        <Dropdown.Toggle
                            variant="secondary btn-sm"
                            id="dropdown-basic">
                            {this.props.currentUser.first_name[0]}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item>{this.props.currentUser.first_name}</Dropdown.Item>
                            <Dropdown.Item>{this.props.currentUser.last_name}</Dropdown.Item>
                            <br />
                            <Dropdown.Item>{this.props.currentUser.email}</Dropdown.Item>
                            <br />
                            <Dropdown.Item onClick={this.props.logout} >Sign Out</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </hgroup>
            )
        };
        return (
            this.props.currentUser ? personalHome() : sessionLinks()
        )
    }
}
export default Home;

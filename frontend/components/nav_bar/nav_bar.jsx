//The navigation bar
import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import * as FaIcons from "react-icons/fa";
import * as BsIcons from "react-icons/bs";
import * as CgIcons from "react-icons/cg";
import * as AiIcons from "react-icons/ai";
import * as RiIcons from "react-icons/ri";
import { SidebarData } from "../side_bar/side_bar_data";
import SearchBar from './search';

class NavBar extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            sidebar: false
        };
        this.handleDemoSubmit = this.handleDemoSubmit.bind(this);
        this.showSidebar = this.showSidebar.bind(this);
        // this.moreIcon = this.moreIcon.bind(this);
        this.showSigninDemo = this.showSigninDemo.bind(this);
        this.upload = this.upload.bind(this);
    }

    handleDemoSubmit(){
        const user = {
            email: 'demoUser@yahoo.com',
            password: 'password'
        };
        this.props.login(user)
    };

    componentDidMount(){
        this.props.currentUser
    }

    showSigninDemo() {
        // debugger;

        if(!this.props.currentUser){
            return(
                <>
                    <Link className="home" to="/login"> <BsIcons.BsFillPersonFill className="humanIcon" /> SIGN IN</Link>
                    <button className="home" onClick={this.handleDemoSubmit}>DEMO</button>
                </>
            )
        }else{
            return (
                <>
                <div className="dropdown">
                    <Dropdown>
                        <Dropdown.Toggle
                            variant="secondary btn-sm"
                            id="dropdown-basic">
                            {this.props.currentUser.first_name[0]}
                        </Dropdown.Toggle>

                        <Dropdown.Menu id="dropdown-items">
                            {/* <CgIcons.CgProfile className="profileIcon" /> */}
                            <Dropdown.Item className="dropdownItem"> <CgIcons.CgProfile className="profileIcon" /> <div className="profile-name"> {this.props.currentUser.first_name} {this.props.currentUser.email}</div> </Dropdown.Item>
                            <br />
                            <Dropdown.Item onClick={this.props.logout} className="logOutItem"> <RiIcons.RiLogoutBoxRLine className="logOutIcon" /> Sign Out</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                </>
            )
        }
    }

    showSidebar(){
        this.setState({sidebar: !this.state.sidebar})
    }

    upload(){
        if(!this.props.currentUser){
            return(
                this.props.history.push('/login')
            )
        }else{
            return(
                this.props.openModal('upload')
            )
        }
    }
    
    render (){
        const sideBarSignin = (!this.props.currentUser ? 
                    <Link className="home2" to="/login"> <BsIcons.BsFillPersonFill className="humanIcon" /> Sign in</Link>
                    : null )

         return (
            <>
                <div className="navbar">
                    <div className="left-navbar">
                        <button className="menu-bars" onClick={this.showSidebar}> <FaIcons.FaBars/></button>
                        <Link className="logo" to="/"><img src={window.logoUrl} alt="logo" /></Link>
                    </div>
                    <div className="center-navbar">
                        <SearchBar />
                        <AiIcons.AiOutlineSearch className="search-icon"/>
                    </div>
                    <div className="right-navbar">
                        <button className="other-icon" onClick={this.upload}><RiIcons.RiVideoAddLine /></button>
                        {/* <button className="other-icon">{this.moreIcon()}</button> */}
                         {this.showSigninDemo()}
                    </div>
                </div>
                <nav className={ this.state.sidebar ? 'nav-menu active' : 'nav-menu'}>
                     <ul className='nav-menu-items' onClick={this.showSidebar}>
                        {
                            SidebarData.map((item, index) => {
                                return (
                                    <li key={index} className={item.cName}>
                                        <a href={item.href} target="_blank">
                                            {item.icon}
                                            <span>{item.title}</span>
                                        </a>
                                    </li>
                                )
                            })
                        }
                        {/* <hr /> */}
                        {sideBarSignin}
                    </ul>
                </nav>
            </>
         )
     }
}


export default NavBar
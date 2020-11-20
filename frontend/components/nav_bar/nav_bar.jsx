import React from 'react';
import { Link } from 'react-router-dom';
import * as FaIcons from "react-icons/fa";
import * as BsIcons from "react-icons/bs";
import * as IoIcons from "react-icons/io"
import { SidebarData } from "../side_bar/side_bar_data"

class NavBar extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            sidebar: false
        };
        this.handleDemoSubmit = this.handleDemoSubmit.bind(this);
        this.showSidebar = this.showSidebar.bind(this);
        this.moreIcon = this.moreIcon.bind(this);
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

    moreIcon() {
        if(this.props.currentUser){
            return <FaIcons.FaBell />
        }else{
            return <BsIcons.BsThreeDotsVertical />
        }
    }

    showSidebar(){
        this.setState({sidebar: !this.state.sidebar})
    }
    
    render (){

         return (
            <>
                <div className="navbar">
                    <div className="left-navbar">
                        <button className="menu-bars" onClick={this.showSidebar}> <FaIcons.FaBars/></button>
                        <Link className="logo" to="/"><img src={window.logoUrl} alt="logo" /></Link>
                    </div>
                    <div className="right-navbar">
                         <button className="other-icon"><IoIcons.IoMdApps /></button>
                        <button className="other-icon">{this.moreIcon()}</button>
                        <Link className="home" to="/login"> <BsIcons.BsFillPersonFill className="humanIcon" /> Sign in</Link>
                        <button className="home" onClick={this.handleDemoSubmit}>Demo User</button> 
                    </div>
                </div>
                <nav className={ this.state.sidebar ? 'nav-menu active' : 'nav-menu'}>
                     <ul className='nav-menu-items' onClick={this.showSidebar}>
                        {
                            SidebarData.map((item, index) => {
                                return (
                                    <li key={index} className={item.cName}>
                                        <Link to={item.path}>
                                            {item.icon}
                                            <span>{item.title}</span>
                                        </Link>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </nav>
            </>
         )
     }
}


export default NavBar
import React from 'react';
import { Link } from 'react-router-dom';
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as HiIcons from "react-icons/hi";
import * as MdIcons from "react-icons/md";


export const SidebarData = [
    {
        title: 'Home',
        path: '/',
        icon: <AiIcons.AiOutlineHome />,
        cName: 'nav-text'
    },
    {
        title: 'Trending',
        path: '/',
        icon: <HiIcons.HiOutlineFire />,
        cName: 'nav-text'
    },
    {
        title: 'Subscription',
        path: '/',
        icon: <MdIcons.MdSubscriptions />,
        cName: 'nav-text'
    },
    {
        title: 'Github',
        path: 'https://github.com/prabhkirank12',
        icon: <FaIcons.FaGithub /> ,
        cName: 'nav-text'
    },
    {
        title: 'LinkedIn',
        path: 'https://github.com/prabhkirank12',
        icon: <FaIcons.FaLinkedin /> ,
        cName: 'nav-text'
    },
]
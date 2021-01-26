import React from 'react';
import { Link } from 'react-router-dom';
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as HiIcons from "react-icons/hi";
import * as MdIcons from "react-icons/md";


export const SidebarData = [
    {
        title: 'Home',
        href: '/',
        icon: <AiIcons.AiFillHome />,
        cName: 'nav-text',
    },
    {
        title: 'Github',
        href: "https://github.com/prabhkirank12",
        icon: <FaIcons.FaGithub /> ,
        cName: 'nav-text',
    },
    {
        title: 'LinkedIn',
        href: 'https://github.com/prabhkirank12',
        icon: <FaIcons.FaLinkedin /> ,
        cName: 'nav-text',
    },
]
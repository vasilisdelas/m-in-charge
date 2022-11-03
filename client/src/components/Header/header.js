import '../../css/header.css';

import SidebarLink from './link.js';

import * as React from 'react';

import brandImage from '../../media/logo.png';

import { Link } from "react-router-dom";
import {FiLogIn} from 'react-icons/fi';
import {FiLogOut} from 'react-icons/fi';
import {RiMenuUnfoldFill} from 'react-icons/ri';
import {RiCloseFill} from 'react-icons/ri';

function Header() {
    const [expand, setExpand] = React.useState(false);
    const [username, setUsername] = React.useState(window.localStorage.getItem('username'));
    const [isLogged, setIsLogged] = React.useState(window.localStorage.getItem('isLoggedIn'));
    const [role, setRole] = React.useState();

    React.useEffect(() => {
        fetch(`http://localhost:4000/api/users/getrole`, {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
            })
        }).then((res) => res.json()).then(data => setRole(data));
    }, [isLogged])

    const expandSidebar = () => {
        setExpand(!expand)
    }

    const handleUserBtnClick = () => {
        if (isLogged) {
            setIsLogged(false);
            window.localStorage.removeItem('isLoggedIn')
            setUsername(null);
            window.localStorage.removeItem('username');
        }
    }

    return (
        <>
            <div className={expand ? 'header big-sidebar' : 'header small-sidebar'}>
                <div className="branding">
                    <img style={{
                        width:'64px',height:'64px'
                    }} src={brandImage}/>
                </div>
                <div className="menu-icon" onClick={expandSidebar}>
                    {!expand ? <RiMenuUnfoldFill className='menu'/> : <RiCloseFill className='menu'/>}
                </div>
                <div className="user">
                <div className="username">
                    { isLogged ?
                        <>
                            <div className={role === "Admin" ? "role admin" : "role default"}>
                                <span className="user-role"> { role === "Admin" ? "Admin" : "User" } </span>
                            </div>
                        </>
                        :
                        <>
                        <div className="role visitor">
                            <span className="user-role"> Visitor </span>
                        </div>
                    </>
                    }
                </div>
            </div>
            <SidebarLink showIcons={expand} />
            <div className="user-btn-section">
                <Link to={ isLogged ? "/" : "/login"}>
                    <button onClick={() => { handleUserBtnClick() } }
                    className={"user-btn " + ( isLogged ? 'logout' : 'signup')}> { isLogged ? <FiLogOut/> : <FiLogIn/>}
                    </button>
                </Link>
            </div>
        </div>
        </>
    )
}

export default Header;
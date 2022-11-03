
import {BsNewspaper} from 'react-icons/bs';
import {RiInformationFill} from 'react-icons/ri';
import {BsCodeSlash} from 'react-icons/bs';
import {RiMapPin2Fill} from 'react-icons/ri';
import {BsPersonPlusFill} from 'react-icons/bs';
import {BsTools} from 'react-icons/bs';
import {FaSignInAlt} from 'react-icons/fa';
import {TbToolsOff} from 'react-icons/tb';

import { Link } from 'react-router-dom';
import React from 'react';


export default function SidebarLink(props) {
    let borderRight = "icon border-right";
    let borderLeft = "sidebar-text border-left";

    const isLogged = window.localStorage.getItem('isLoggedIn');
    const username = window.localStorage.getItem('username');

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
            }).then((res) => res.json()).then(data => setRole(data) );
    }, [])

    return (
        <>
            <Link to='/'>
                <div className="sidebar-link">
                    <div className={ borderRight }>
                        <RiMapPin2Fill/>
                    </div>
                    { props.showIcons &&
                    <div className={ borderLeft }>
                        <Link to='/'>Map</Link>
                    </div>
                    }
                </div> 
            </Link>
            
            <Link to='/About'>
                <div className="sidebar-link">
                    <div className={ borderRight }>
                        <RiInformationFill/>
                    </div>
                    { props.showIcons &&
                    <div className={ borderLeft }>
                        <Link to='/About'>About</Link>
                    </div>
                    }
                </div> 
            </Link>
        
            <Link to='/News'>
                <div className="sidebar-link">
                    <div className={ borderRight }>
                        <BsNewspaper/>
                    </div>
                    { props.showIcons &&
                    <div className={ borderLeft }>
                        <Link to='/News'>News</Link>
                    </div>
                    }
                </div> 
            </Link>
            {!isLogged &&
            <>
                <Link to='/Login'>
                    <div className="sidebar-link">
                        <div className={ borderRight }>
                            <FaSignInAlt/>
                        </div>
                        { props.showIcons &&
                        <div className={ borderLeft }>
                            <Link to="/Login">Login</Link>
                        </div>
                        }
                    </div> 
                </Link>
                
                <Link to='/Register'>
                    <div className="sidebar-link">
                        <div className={ borderRight }>
                            <BsPersonPlusFill/>
                        </div>
                        { props.showIcons &&
                        <div className={ borderLeft }>
                            <Link to='/register'>Register</Link>
                        </div>
                        }
                    </div> 
                </Link>
            </>
            }
            {(isLogged && role === "Admin") &&
                <>
                    <Link to='/requests'>
                        <div className="sidebar-link">
                            <div className={ borderRight }>
                                <BsTools/>
                            </div>
                            { props.showIcons &&
                            <div className={ borderLeft }>
                                <Link to='/requests'>Requests</Link>
                            </div>
                            }
                        </div>  
                    </Link>

                    <Link to='/requests/remove'>
                        <div className="sidebar-link">
                            <div className={ borderRight }>
                                <TbToolsOff/>
                            </div>
                            { props.showIcons &&
                            <div className={ borderLeft }>
                                <Link to='/requests/remove'>Remove</Link>
                            </div>
                            }
                        </div>
                    </Link>
                </>
            }
            <Link to='/github'>
                <div className="sidebar-link">
                    <div className={ borderRight }>
                        <BsCodeSlash/>
                    </div>
                    { props.showIcons &&
                    <div className={ borderLeft }>
                        <Link to='/github'>Github</Link>
                    </div>
                    }
                </div> 
            </Link>
        </>
    )
}
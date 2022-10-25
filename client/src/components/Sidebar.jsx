import React, {useState} from 'react';
import {RiHome6Fill} from 'react-icons/ri';
import {RiInformationFill} from 'react-icons/ri';
import {RiMapPin2Fill} from 'react-icons/ri';
import {RiLoginBoxFill} from 'react-icons/ri';
import {RiUserShared2Fill} from 'react-icons/ri';
import {RiMailFill} from 'react-icons/ri';
import {RiMenuUnfoldFill} from 'react-icons/ri';
import {RiCloseFill} from 'react-icons/ri';
import { Link } from 'react-router-dom';
import '../styles/Sidebar.css';

const Sidebar = () => {

  const [expand, setExpand] = useState(false);

  const expandSidebar = () => {
    setExpand(!expand)
  }

  return (
    <div className={expand ? 'big-sidebar' : 'small-sidebar'}>

        <div className="menu-icon" onClick={expandSidebar}>
          {!expand ? <RiMenuUnfoldFill className='menu'/> : <RiCloseFill className='menu'/>}
        </div>

        <nav>
            <ul className={expand ? 'ul-item' : 'ul-item oicon'}>
                
                <li>
                  <RiHome6Fill className='icon'/>
                  <Link to='/'>Home</Link>
                </li>

                <li>
                  <RiInformationFill className='icon'/>
                  <Link to='/'>About</Link>
                </li>

                <li>
                  <RiMapPin2Fill className='icon'/>
                  <Link to='/'>Map</Link>
                </li>

                <li>
                  <RiLoginBoxFill className='icon'/>
                  <Link to='/'>Login</Link>
                </li>

                <li>
                  <RiUserShared2Fill className='icon'/>
                  <Link to='/'>Register</Link>
                </li>

                <li>
                  <RiMailFill className='icon'/>
                  <Link to='/'>Contact</Link>
                </li>

            </ul>
        </nav>

    </div>
  )
}

export default Sidebar;
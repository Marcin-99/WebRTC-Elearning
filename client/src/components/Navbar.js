import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { UserContext } from './contexts/UserContext';


const Navbar = (props) => {

    const { username } = useContext(UserContext);

    return (
        <ul id='navBar'>
            <li><NavLink to={ props.currentUrl + '/game' }>Game</NavLink></li>
            <li><NavLink to={ props.currentUrl + '/stats' }>Stats</NavLink></li>
            <li><NavLink to={ props.currentUrl + '/tutorial' }>Tutorial</NavLink></li>
            <li><span id='navUsername'>{ username }</span></li>
		</ul>
    )
}


export default Navbar;

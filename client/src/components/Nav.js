import React from 'react'
import LogoGreen from '../images/logo-green-bg.svg'
import { useLocation } from 'react-router-dom';
import NotLoggedIn from './NotLoggedIn';
import LoggedIn from './LoggedIn';

function Nav({ isLoggedIn, setIsLoggedIn }) {
    const location = useLocation();

    return (
        <div className='nav'>
            <div id="logo">
                <img src={LogoGreen} alt="Logo" />
                Gallery.io
            </div>
            <nav>
                {isLoggedIn ? <LoggedIn location={location} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} /> : <NotLoggedIn location={location} />}
            </nav>
        </div>
    )
}

export default Nav

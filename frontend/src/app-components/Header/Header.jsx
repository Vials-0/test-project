import React from 'react';
import './Header.css';
import { Link } from "react-router-dom";


const Header = () => {
    return (
        <Link to='/'>
            <div className='header'>
                <h1 className='header-text'>Staysafe</h1>
            </div>
        </Link>
    )
}

export default Header;
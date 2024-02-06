import React from 'react';
import './Header.scss';
import logo from "../../images/logo.png";

const Header = () => {
    return (
        <div className='header'>
            <nav>
                <ul className='nav_ul'>
                    <li>
                        <img className='logo' src={logo} alt='логотип' />
                    </li>
                    <li>Головна</li>
                    <li>Мій акаунт</li>
                    <li>Налаштування</li>
                    <li>Про нас</li>
                </ul>
            </nav>
        </div>
    );
};

export default Header;

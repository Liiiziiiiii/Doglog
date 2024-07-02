import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.scss';
import logo from "../../images/logo.png";

const Header = () => {
    const [userId, setUserId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUserId = localStorage.getItem('UserId');
        setUserId(storedUserId);
    }, []);

    const handleMyAccountClick = () => {
        if (userId) {
            navigate(`/myaccount/${userId}`);
        } //else {
        //     navigate('/login'); 
        // }
    };

    return (
        <div className='header'>
            <nav>
                <ul className='nav_ul'>
                    <li>
                        <img className='logoNav' src={logo} alt='логотип' />
                    </li>
                    <li>
                        <Link to="/">Головна</Link>
                    </li>
                    <li>
                        <a onClick={handleMyAccountClick} style={{ cursor: 'pointer' }}>Мій акаунт</a>
                    </li>
                    <li>Налаштування</li>
                    <li>Про нас</li>
                </ul>
            </nav>
        </div>
    );
};

export default Header;

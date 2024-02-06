import React from 'react';
import { Link } from 'react-router-dom';
import './MyAcc.scss';


const MyAcc = () => {
    return (
        <div>
            <div className="myacc">
                <h1>Мій Акаунт</h1>
                <div>
                    <input type="text" id="login" name="login" placeholder="Login" className="rounded-input" />
                </div>
                <div>
                    <input type="password" id="password" name="password" placeholder="Password" className="rounded-input" />
                </div>
                <div className="forgot-password">
                    <p><a href="#">Забули пароль?</a></p>
                </div>
                <div>
                    <button className="login-button">Увійти</button>
                </div>

            </div>

            <div className="create-account">
                <p>Не маєте акаунту? </p>
                <Link to="/create-account"><button className="create-account-button">Створити акаунт</button></Link>
            </div>
        </div>
    );
};


export default MyAcc;
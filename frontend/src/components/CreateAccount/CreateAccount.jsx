import React from 'react';
import './CreateAccount.scss';


const CreateAccount = () => {
    return (
        <div>
            <div className="create-account-section">
                <h2 className="create-account-heading">Створення акаунту</h2>
                <form>
                    <div className="form-group">
                        <input type="text" id="firstName" name="firstName" placeholder="Ім'я" required />
                    </div>
                    <div className="form-group">
                        <input type="text" id="lastName" name="lastName" placeholder="Прізвище" required />
                    </div>
                    <div className="form-group">
                        <input type="email" id="email" name="email" placeholder="Електронна пошта" required />
                    </div>
                    <div className="form-group">
                        <input type="password" id="password" name="password" placeholder="Пароль" required />
                    </div>
                    <div className="form-group">
                        <input type="tel" id="phoneNumber" name="phoneNumber" placeholder="Номер телефону" required />
                    </div>
                    <div className="form-group">
                        <input type="text" id="location" name="location" placeholder="Місцезнаходження" />
                    </div>
                    <div className="form-group">
                        <input type="text" id="breederName" name="breederName" placeholder="Назва розплідника" />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="register-button">Зареєструватись</button>
                    </div>
                </form>
            </div>
        </div>
    );
};


export default CreateAccount;
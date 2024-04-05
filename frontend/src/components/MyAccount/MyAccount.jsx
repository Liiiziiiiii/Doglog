import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './MyAccount.scss';
import go_back from "../../images/go_back.png";
import account_photo from "../../images/account_photo.png";
import edit_img from "../../images/edit_account.png";
import Header from '../Header/Header';
import Footer from '../Footer/Footer';


const MyAccount = () => {
    const { userId } = useParams();
    const navigate = useNavigate(); 
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchData = async () => { 
            try {
                const response = await axios.get(`http://localhost:5254/api/RegistarationUsers/${userId}`); 
                console.log('Response:', response);
                setUserData(response.data);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData(); 
    }, [userId, navigate]);

    return (
        <div className='my_account_container'>
            <Header />
            <div className='account_header'>
                <button className='button_account'>
                    <img className='go_back_img' src={go_back} alt='go back img' />
                    <span className='button_account_text'>Повернутись</span>
                </button>
                <h2 className='my_account_header'>МІЙ АКАУНТ</h2>
            </div>
            <div className="my_account_container background_rectangle">
                <div className='account_details'>
                    <div>
                        <img className='account_photo' src={account_photo} alt='account photo' />
                    </div>
                    {userData && ( 
                        <div className='account_info'>
                            <p>Ім’я: {userData.name}</p>
                            <p>Прізвище: {userData.surname}</p>
                            <p>Номер телефону: {userData.phone}</p>
                            <p>Email: {userData.email}</p>
                            <p>Місце знаходження: {userData.location}</p>
                            <p>Назва розплідника: {userData.namenursery}</p>
                            <p>Розмірність: {userData.size}</p>
                            <p>Кількість собак: {userData.dogsCount}</p>
                            <div>
                                <button className='button_edit_account'>
                                    <span className='button_edit_text'>Редагувати</span>
                                    <img className='edit_img' src={edit_img} alt='edit button' />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className="my_account_container_buttons background_rectangle_buttons">
                <div className='account_buttons'>
                    <button className='button_relatives'>
                        Мої собаки
                    </button>
                    <button className='button_relatives'>
                        Обране                   </button>
                    <button className='button_relatives'>
                        Родичі моїх собак
                    </button>
                </div>
            </div>
            <div className='my_dogs_container '>
                <div className='dog_card'>
                    <img src="" alt="" />
                    <p></p>
                    <p></p>
                    <p></p>
                </div>
                <div className='dog_card'>
                    <img src="" alt="" />
                    <p></p>
                    <p></p>
                    <p></p>
                </div>
                <div className='dog_card'>
                    <img src="" alt="" />
                    <p></p>
                    <p></p>
                    <p></p>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default MyAccount;

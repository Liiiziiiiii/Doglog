import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './MyAccount.scss';
import go_back from "../../images/go_back.png";
import account_photo from "../../images/account_photo.png";
import edit_img from "../../images/edit_account.png";
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { FaPlus } from "react-icons/fa";

const MyAccount = () => {
    const { userId } = useParams();
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);


    console.log("MyAccount- " + userId);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://apiproject-prod.us-east-1.elasticbeanstalk.com/api/DogDetails/users-with-dogs/${userId}`);
                console.log('Response:', response.data);
                setUserData(response.data);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData();
    }, [userId]);

    const handleGoBack = () => {
        navigate(-1);
    };

    const handleEditUserData = () => {
        navigate(`/edit-user-data/${userId}`);
    };

    const handleEditDogData = (dogId) => {
        navigate(`/dogpage/${dogId}`);
    };

    return (
        <div className='my_account_container'>
            <Header />
            <div className='account_header'>
                <button className='button_account' onClick={handleGoBack}>
                    <img className='go_back_img' src={go_back} onClick={handleGoBack} alt='go back img' />
                    <span className='button_account_text'>Повернутись</span>
                </button>
                <h2 className='my_account_header'>МІЙ АКАУНТ</h2>
            </div>
            <div className="my_account_container background_rectangle">
                <div className='account_details'>
                    {userData && (
                        <div className='user_container'>
                            <div>
                                <img className='account_photo' src={userData.photo || account_photo} alt='account photo' />
                            </div>
                            <div className='account_info'>
                                <p>Ім’я: {userData.name}</p>
                                <p>Прізвище: {userData.surname}</p>
                                <p>Номер телефону: {userData.phone}</p>
                                <p>Email: {userData.email}</p>
                                <p>Місце знаходження: {userData.location}</p>
                                <p>Назва розплідника: {userData.namenursery}</p>
                                <p>Кількість собак: {userData.dogs.length}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div>
                <button className='button-edit-edit-data-user' onClick={handleEditUserData}>
                    <span className='button_edit_text'>Редагувати</span>
                    <img className='edit_img' src={edit_img} alt='edit button' />
                </button>
            </div>
            <div className="my_account_container_buttons background_rectangle_buttons">
                <div className='account_buttons'>
                    <button className='button_relatives'>
                        Мої собаки
                    </button>
                </div>
            </div>
            {userData && userData.dogs && (
                <div className='my_dogs_container'>
                    <div className="items-container">
                        <div className="work-section-info-dog add-dog-button" onClick={() => navigate('/addDog')}>
                            <FaPlus size={24} />
                            <span>Додати собаку</span>
                        </div>
                        {userData.dogs.map((dog, idx) => (
                            <div key={`dog-${idx}`} className="work-section-info-dog">
                                <img className='photo_dog_details' src={dog.photo || account_photo} alt='Photo dog' />
                                <div className='details_dogs'>
                                    <div className='name_dog_details'>{dog.name}</div>
                                    <div className='breed_dog_details'>
                                        <span className='label'>Порода:</span>
                                        <span className='value'>{dog.breed}</span>
                                    </div>
                                    <div className='breed_dog_details'>
                                        <span className='label'>Стать:</span>
                                        <span className='value'>{dog.sex}</span>
                                    </div>
                                    <div className='breed_dog_details'>
                                        <span className='label'>Шерсть:</span>
                                        <span className='value'>{dog.wool}</span>
                                    </div>
                                    <div className='breed_dog_details'>
                                        <span className='label'>Вік:</span>
                                        <span className='value'>{dog.age}</span>
                                    </div>
                                </div>
                                <div>
                                    <button className='button_learn_more-dog' onClick={() => handleEditDogData(dog.id)}>
                                        <span className='button_edit_text'>Дізнатись більше</span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            <Footer />
        </div>
    );
};

export default MyAccount;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './OwnerDogPage.scss';

const OwnerDogPage = ({ dogId }) => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://cdq2m359-5254.euw.devtunnels.ms/swagger/index.html/api/DogDetails/dog-user/${dogId}`);
                console.log('Response:', response.data);
                setUserData(response.data.owner);  
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData();
    }, [dogId]);

    return (
        <div className='owner_account_details'>
            {userData ? (
                <>
                    <div>
                        <img className='detail_account_photo' src={userData.photo} alt='account photo' />
                    </div>
                    <div className='user_account_info'>
                        <p>Ім’я: {userData.name}</p>
                        <p>Прізвище: {userData.surname}</p>
                        <p>Номер телефону: {userData.phone}</p>
                        <p>Email: {userData.email}</p>
                        <p>Місце знаходження: {userData.location}</p>
                        <p>Назва розплідника: {userData.namenursery}</p>
                        <p>Кількість собак: {userData.dogs.length}</p>

                    </div>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default OwnerDogPage;

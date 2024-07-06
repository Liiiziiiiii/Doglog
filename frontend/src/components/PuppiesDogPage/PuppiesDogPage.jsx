import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PuppiesDogPage.scss';

const PuppiesDogPage = ({ dogId }) => {
    const [dogData, setDogData] = useState(null);

    useEffect(() => {
        const fetchDogPhotos = async () => {
            try {
                const response = await axios.get(`http://apiproject-prod.us-east-1.elasticbeanstalk.com/api/DogDetails/with-children/${dogId}`);
                console.log('Puppies Response:', response.data);
                setDogData(response.data);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchDogPhotos();
    }, [dogId]);

    return (
        <div>
            {dogData ? (
                <div className='my_dogs_container' >
                    <div className="items-container">
                        {dogData.puppies && dogData.puppies.length > 0 ? (
                            <div className="puppies-container">
                                {dogData.puppies.map((puppy, idx) => (
                                    <div key={`puppy-${idx}`} className="work-section-info-puppies">
                                        <img className='photo_dog_details' src={puppy.photo} alt='Puppy Photo' />
                                        <div className='details_dogs'>
                                            <div className='name_dog_details'>{puppy.name}</div>
                                            <div className='breed_dog_details'>
                                                <span className='label'>Порода:</span>
                                                <span className='value'>{puppy.breed || 'N/A'}</span>
                                            </div>
                                            <div className='breed_dog_details'>
                                                <span className='label'>Стать:</span>
                                                <span className='value'>{puppy.sex || 'N/A'}</span>
                                            </div>
                                            <div className='breed_dog_details'>
                                                <span className='label'>Вік:</span>
                                                <span className='value'>{puppy.age || 'N/A'}</span>
                                            </div>
                                            <div className='breed_dog_details'>
                                                <span className='label'>Шерсть:</span>
                                                <span className='value'>{puppy.wool || 'N/A'}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>Цуценят немає</p>
                        )}
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default PuppiesDogPage;

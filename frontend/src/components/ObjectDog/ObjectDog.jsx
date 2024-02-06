import React, { useState } from 'react';
import './ObjectDog.scss';
import AddDog from '../AddDog/AddDog';
import ObjectDogElem from '../ObjectDog/ObjectDogElem';


const ObjectDog = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dogs, setDogs] = useState([]);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleAddDog = (dogData) => {
        setDogs((prevDogs) => [...prevDogs, dogData]);
    };

    return (
        <div className="object_dog">
            {/* {<div className="container">
                <div className="img_dog">
                    <img src={photo_dog} alt="photo dog" />
                </div>
                <p className="name_dog">КЛИЧКА</p>
                <div className="section">
                    <a href="fwefwheofowjdpm.com">fwefwheofowjdpm.com ох</a>
                </div>
                } */}

            <div className="container">
                <button className="section_1" onClick={openModal}>+</button>
                <div className="section">ДОДАТИ</div>
            </div>
            {isModalOpen && <AddDog closeModal={closeModal} onAddDog={handleAddDog} />}
            {dogs.length > 0 && (
                <div className="dog-list">
                    <ul>
                        {dogs.map((dog, index) => (
                            <ObjectDogElem key={index} dog={dog} />
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default ObjectDog;
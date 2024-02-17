import React, { useState } from 'react';
import './ObjectDog.scss';
import AddDog from '../AddDog/AddDog';
import ObjectDogElem from '../ObjectDog/ObjectDogElem';
import plus from '../../images/plus.png';


const ObjectDog = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dogs, setDogs] = useState([]);
    const [showButton, setShowButton] = useState(true);
    const [editingDog, setEditingDog] = useState(null);

    const openModal = (dog) => {
        setEditingDog(dog);
        setIsModalOpen(true);
        setShowButton(false);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setShowButton(true);
    };

    const handleAddDog = (dogData) => {
        if (editingDog) {
            const updatedDogs = dogs.map(dog => (dog === editingDog ? { ...dog, ...dogData } : dog));
            setDogs(updatedDogs);
            setEditingDog(null);
        } else {
            setDogs((prevDogs) => [...prevDogs, dogData]);
        }
        setIsModalOpen(false);
        setShowButton(true);
    };

    return (
        <div className="object_dog" >
            <div className="container_dogs">
                {/* <div className="container">
                <div className="img_dog">
                    <img src={photo_dog} alt="photo dog" />
                </div>
                <p className="name_dog">КЛИЧКА</p>
                <div className="section">
                    <a href="fwefwheofowjdpm.com">fwefwheofowjdpm.com ох</a>
                </div> */}
                <div className='container_dog_list'>
                    {dogs.map((dog, index) => (
                        <ObjectDogElem key={index} dog={dog} onEdit={() => openModal(dog)} />
                    ))}
                </div>
                {showButton && (
                    <div className="container_button_add_dog">
                        <button className="button_add_dog" onClick={() => openModal(null)}>
                            <img className='plus_but' src={plus} alt="plus" />
                        </button>
                    </div>
                )}
            </div>
            {isModalOpen && <AddDog closeModal={closeModal} onAddDog={handleAddDog} dog={editingDog} />}
        </div>
        /* <div className="button_add_dog_2">ДОДАТИ</div> */
    );
};

export default ObjectDog;
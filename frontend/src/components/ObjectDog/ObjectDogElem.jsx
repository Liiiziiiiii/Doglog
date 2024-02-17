import React, { useState } from 'react';
import './ObjectDog.scss';
import photo_dog from "../../images/photo_dog.png";
import edit_img from "../../images/edit_account.png";

const ObjectDogElem = ({ dog, onEdit }) => {
    const calculateAge = (dob_dog) => {
        const today = new Date();
        const dobParts = dob_dog.split("-");
        const dobDate = new Date(`${dobParts[2]}-${dobParts[1]}-${dobParts[0]}`);
        const diffTime = Math.abs(today - dobDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const diffYears = Math.floor(diffDays / 365);
        return diffYears;
    };

    const age = calculateAge(dog.dob_dog);

    return (
        <div className="object_dog">
            <div className="container">
                <div className="img_dog">
                    <img src={photo_dog} alt="photo dog" />
                </div>
                <div className="content">
                    <div className="info">
                        <p className="name_dog">{dog.name_dog}</p>
                        <div className="breed_dog">
                            <p className='breed_text'>ПОРОДА: {dog.breed_dog}</p>
                        </div>
                        <div className="age_dog">
                            <p className='age_text'>BIK: {age}</p>
                        </div>
                        <div className="gender_dog">
                            <p className='gender_text'>СТАТЬ: {dog.gender_dog}</p>
                        </div>
                    </div>
                    <div className="edit_button">
                        <button className='button_edit_dog' onClick={onEdit}>
                            <span className='button_edit_text_dog'>Редагувати</span>
                            <img className='edit_img' src={edit_img} alt='edit button' />
                        </button>
                    </div>
                </div>
            </div>
            <div className="background_rect"></div>
        </div>
    );
};

export default ObjectDogElem;

import React, { useState } from 'react';
import './ObjectDog.scss';
import photo_dog from "../../images/photo_dog.png";
import edit_img from "../../images/edit_account.png";


const ObjectDogElem = () => {

    return (
        <div className="object_dog">
            <div className="container">
                <div className="img_dog">
                    <img src={photo_dog} alt="photo dog" />
                </div>
                <p className="name_dog">КЛИЧКА</p>
                <div className="breed_dog">
                    <p className='breed_text'>ПОРОДА: </p>
                </div>
                <div className="age_dog">
                    <p className='age_text'>BIK: </p>
                </div>
                <div className="sex_dog">
                    <p className='sex_text'>СТАТЬ: </p>
                </div>
                <div>
                    <button className='button_edit_dog'>
                        <span className='button_edit_text_dog'>Редагувати</span>
                        <img className='edit_img' src={edit_img} alt='edit button' />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ObjectDogElem;
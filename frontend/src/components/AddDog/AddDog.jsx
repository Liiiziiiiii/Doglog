import React, { useState, useEffect } from 'react';
import './AddDog.scss';
import add_photo_icon from "../../images/add_photo_icon.png"
import Header from '../Header/Header';
import FooterReg from '../Footer/Footer';


const AddDog = ({ closeModal, onAddDog, dog }) => {
    const [formData, setFormData] = useState({
        name_dog: '',
        breed_dog: '',
        coat_dog: '',
        dob_dog: '',
        gender_dog: 'male',
        height_dog: 0,
        weight_dog: 0,
        number_dog: 0,
    });

    useEffect(() => {
        if (dog) {
            setFormData(dog);
        }
    }, [dog]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddDog(formData);
        closeModal();
    };


    return (
        <>
        <Header></Header>
        <div className="modal_add_dog">
            <form onSubmit={handleSubmit}>
                <div className='form_dog'>
                    <div className="image_dog">
                        <button className='photo_dog'>
                            <img className='add_photo_icon_dog' src={add_photo_icon} alt="add_photo_icon" />
                        </button>
                        <input type="file" accept="image/*" />
                    </div>
                    <div className='form_fields'>
                        <div>
                            <input className='basicInput' placeholder="Кличка:" type="text" id="name_dog" name="name_dog" value={formData.name_dog} onChange={handleChange} />
                        </div>

                        <div>
                            <input className='basicInput' placeholder="Порода:" type="text" id="breed_dog" name="breed_dog" value={formData.breed_dog} onChange={handleChange} />
                        </div>

                        <div>
                            <input className='basicInput' placeholder="Шерсть:" type="text" id="coat_dog" name="coat_dog" value={formData.coat_dog} onChange={handleChange} />
                        </div>

                        <div>
                            <input className='basicInput' placeholder="Дата народження:"type="date" id="dob_dog" name="dob_dog" value={formData.dob_dog} onChange={handleChange} />
                        </div>

                        <div className='wrapper'>
                            <label className='gender_dog'>Стать:</label>
                            <select id="gender_and_dog" name="gender_dog">
                                <option value="male">Чоловіча</option>
                                <option value="female">Жіноча</option>
                            </select>
                        </div>

                        <div className='wrapper'>
                            <label className='height_dog'>Зріст:</label>
                            <input type="number" id="height_dog" name="height_dog" placeholder="Введіть ріст в см" value={formData.height_dog} onChange={handleChange} min="0" />
                        </div>

                        <div className='wrapper'>
                            <label className="weight_dog">Вага:</label>
                            <input  type="number" id="weight_dog" name="weight_dog" placeholder="Введіть вагу в кг" value={formData.weight_dog} onChange={handleChange} min="0" ></input>
                        </div>

                        <div className='wrapper' >
                            <label className="number_dog">Чіп:</label>
                            <input type="number" id="number_dog" name="number_dog" placeholder="Введіть номер чипу (необов'язково)" value={formData.number_dog} onChange={handleChange} min="0" />
                        </div>
                        <button className='submit_button'>Save</button>
                    </div>
                </div>
            </form>
        </div>
        <FooterReg></FooterReg>
        </>
    );
};


export default AddDog;
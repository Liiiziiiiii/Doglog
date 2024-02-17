import React, { useState, useEffect } from 'react';
import './AddDog.scss';


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
        <div className="modal_add_dog">
            <form onSubmit={handleSubmit}>
                <div className='form_dog'>
                    <div>
                        <label className='name_dog'>Кличка:</label>
                        <input type="text" id="name_dog" name="name_dog" value={formData.name_dog} onChange={handleChange} />
                    </div>

                    <div>
                        <label className='breed_dog'>Порода:</label>
                        <input type="text" id="breed_dog" name="breed_dog" value={formData.breed_dog} onChange={handleChange} />
                    </div>

                    <div>
                        <label className='coat_dog'>Шерсть:</label>
                        <input type="text" id="coat_dog" name="coat_dog" value={formData.coat_dog} onChange={handleChange} />
                    </div>

                    <div>
                        <label className='dob_dog'>Дата народження:</label>
                        <input type="date" id="dob_dog" name="dob_dog" value={formData.dob_dog} onChange={handleChange} />
                    </div>

                    <div>
                        <label className='gender_dog'>Стать:</label>
                        <select id="gender+dog" name="gender_dog">
                            <option value="male">Чоловіча</option>
                            <option value="female">Жіноча</option>
                        </select>
                    </div>

                    <div>
                        <label className='height_dog'>Зріст:</label>
                        <input type="number" id="height_dog" name="height_dog" value={formData.height_dog} onChange={handleChange} min="0" />
                    </div>

                    <div>
                        <label className="weight_dog">Вага:</label>
                        <input type="number" id="weight_dog" name="weight_dog" value={formData.weight_dog} onChange={handleChange} min="0" />
                    </div>

                    <div>
                        <label className="number_dog">Номер:</label>
                        <input type="number" id="number_dog" name="number_dog" value={formData.number_dog} onChange={handleChange} min="0" />
                    </div>

                    <div>
                        <input type="submit" value="Create" />
                    </div>

                </div>
            </form>
        </div>
    );
};


export default AddDog;
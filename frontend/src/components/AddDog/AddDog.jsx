import React, { useState } from 'react';
import './AddDog.scss';


const AddDog = ({ closeModal, onAddDog }) => {
    const [formData, setFormData] = useState({
        name: '',
        breed: '',
        coat: '',
        dob: '',
        gender: 'male',
        height: 0,
        weight: 0,
        number: 0,
    });

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
                        <input type="text" id="name_dog" name="name_dog" value={formData.name} onChange={handleChange} />
                    </div>

                    <div>
                        <label className='breed_dog'>Порода:</label>
                        <input type="text" id="breed_dog" name="breed_dog" value={formData.breed} onChange={handleChange} />
                    </div>

                    <div>
                        <label className='coat_dog'>Шерсть:</label>
                        <input type="text" id="coat_dog" name="coat_dog" value={formData.coat} onChange={handleChange} />
                    </div>

                    <div>
                        <label className='dob'>Дата народження:</label>
                        <input type="date" id="dob_dog" name="dob_dog" value={formData.dob} onChange={handleChange} />
                    </div>

                    <div>
                        <label className='gender'>Стать:</label>
                        <select id="gender+dog" name="gender_dog">
                            <option value="male">Чоловіча</option>
                            <option value="female">Жіноча</option>
                        </select>
                    </div>

                    <div>
                        <label className='height'>Зріст:</label>
                        <input type="number" id="height_dog" name="height_dog" value={formData.height} onChange={handleChange} />
                    </div>

                    <div>
                        <label htmlFor="weight_dog">Вага:</label>
                        <input type="number" id="weight_dog" name="weight_dog" value={formData.weight} onChange={handleChange} />
                    </div>

                    <div>
                        <label htmlFor="number">Номер:</label>
                        <input type="number" id="number_dog" name="number_dog" value={formData.number} onChange={handleChange} />
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
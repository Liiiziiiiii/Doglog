import React, { useState, useEffect } from 'react';
import './AddDog.scss';
import add_photo_icon from "../../images/add_photo_icon.png"
import Header from '../Header/Header';
import FooterReg from '../Footer/Footer';
import axios from 'axios';


const AddDog = ({ closeModal, onAddDog, dog }) => {
    const [formData, setFormData] = useState({
        name: '',
        breed: '',
        wool: '',
        age:'',
        dateBirth: '',
        sex: '',
        growth: 0,
        weight: 0,
        ksy: 0,
        namenursery: "",
        chip: "",
        photo: "",
        userId: 0,
        mother_Id: 0,
        father_Id: 0
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

    async function handleSubmit (e) {
        e.preventDefault();
        console.log(formData)
        try {
            const response = await axios.post('http://localhost:5254/api/Dog', formData);
            console.log('Response:', response);
            if(response.status === 201){
                console.log("Added sucsesfully")
            }
        } catch (error) {
            console.error('Error:', error);
        }
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
                            <input className='basicInput' placeholder="Кличка:" type="text" id="name_dog" name="name" value={formData.name} onChange={handleChange} />
                        </div>

                        <div>
                            <input className='basicInput' placeholder="Порода:" type="text" id="breed_dog" name="breed" value={formData.breed} onChange={handleChange} />
                        </div>

                        <div>
                            <input className='basicInput' placeholder="Шерсть:" type="text" id="coat_dog" name="wool" value={formData.wool} onChange={handleChange} />
                        </div>

                        <div>
                            <input className='basicInput' placeholder="Дата народження:"type="date" id="dob_dog" name="dateBirth" value={formData.dateBirth} onChange={handleChange} />
                        </div>

                        <div className='wrapper'>
                            <label className='gender_dog'>Стать:</label>
                            <select id="sex" name="sex" value={formData.sex} onChange={handleChange}>
                                    <option value="">Виберіть стать</option>
                                    <option value="male">Чоловіча</option>
                                    <option value="female">Жіноча</option>
                                </select>
                        </div>

                        <div className='wrapper'>
                            <label className='height_dog'>Зріст:</label>
                            <input type="number" id="height_dog" name="growth" placeholder="Введіть ріст в см" value={formData.growth} onChange={handleChange} min="0" />
                        </div>

                        <div className='wrapper'>
                            <label className="weight_dog">Вага:</label>
                            <input  type="number" id="weight_dog" name="weight" placeholder="Введіть вагу в кг" value={formData.weight} onChange={handleChange} min="0" ></input>
                        </div>

                        <div className='wrapper' >
                            <label className="number_dog">Чіп:</label>
                            <input type="number" id="number_dog" name="chip" placeholder="Введіть номер чипу (необов'язково)" value={formData.chip} onChange={handleChange} min="0" />
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
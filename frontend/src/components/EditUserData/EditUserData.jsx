import React, { useState, useEffect } from 'react';
import './EditUserData.scss';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Footer from '../Footer/Footer';
import plus from '../../images/add_photo_icon.png';

const EditUserData = () => {
    const { userId } = useParams();
    const navigate = useNavigate();
    const [selectedImage, setSelectedImage] = useState('');
    const [userFetched, setUserFetched] = useState(false);

    const formik = useFormik({
        initialValues: {
            Name: '',
            Surname: '',
            Email: '',
            Phone: '',
            Location: '',
            Namenursery: '',
            Photo: '',
        },
        validationSchema: Yup.object({
            Name: Yup.string().required('Поле не може бути порожнім'),
            Surname: Yup.string().required('Поле не може бути порожнім'),
            Email: Yup.string().email('Введіть коректний email').required('Поле не може бути порожнім'),
            Phone: Yup.string().required('Поле не може бути порожнім'),
        }),
        onSubmit: async (values) => {
            try {
                console.log('values: ', values);

                const response = await axios.put(`http://apiproject-prod.us-east-1.elasticbeanstalk.com/api/Users/${userId}`, values);
                console.log('Response:', response);
                if (response.status === 204) {
                    navigate(`/myaccount/${userId}`);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        },
    });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://apiproject-prod.us-east-1.elasticbeanstalk.com/api/Users/${userId}`);
                const userData = response.data;
                formik.setValues({
                    Photo: userData.photo || '',
                    Name: userData.name,
                    Surname: userData.surname,
                    Email: userData.email,
                    Phone: userData.phone,
                    Location: userData.location,
                    Namenursery: userData.namenursery,
                });


                if (userData.photo) {
                    setSelectedImage(userData.photo);
                }
                setUserFetched(true);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [userId]);

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result);
                formik.setFieldValue('Photo', reader.result); // Set image as string
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div>
            <div className="edit-user-data-section">
                <h2 className="create-account-heading">Редагувати дані</h2>
                <div className='edit-user-data-main-section'>
                    <div className="image-upload">
                        <label htmlFor="file-input">
                            <img
                                className='account_photo_edit-data'
                                src={selectedImage || plus}
                                alt='account photo'
                                style={{ cursor: 'pointer' }}
                            />
                        </label>
                        <input
                            id="file-input"
                            type="file"
                            style={{ display: 'none' }}
                            onChange={handleImageChange}
                        />
                    </div>
                    {userFetched && (
                        <form onSubmit={formik.handleSubmit} className='formik-form'>
                            <div className="form-group">
                                <input type="text" id="Name" name="Name" placeholder="Ім'я" value={formik.values.Name} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                {formik.touched.Name && formik.errors.Name ? <div className="error">{formik.errors.Name}</div> : null}
                            </div>
                            <div className="form-group">
                                <input type="text" id="Surname" name="Surname" placeholder="Прізвище" value={formik.values.Surname} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                {formik.touched.Surname && formik.errors.Surname ? <div className="error">{formik.errors.Surname}</div> : null}
                            </div>
                            <div className="form-group">
                                <input type="email" id="Email" name="Email" placeholder="Електронна пошта" value={formik.values.Email} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                {formik.touched.Email && formik.errors.Email ? <div className="error">{formik.errors.Email}</div> : null}
                            </div>
                            <div className="form-group">
                                <input type="tel" id="Phone" name="Phone" placeholder="Номер телефону" value={formik.values.Phone} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                {formik.touched.Phone && formik.errors.Phone ? <div className="error">{formik.errors.Phone}</div> : null}
                            </div>
                            <div className="form-group">
                                <input type="text" id="Location" name="Location" placeholder="Місцезнаходження" value={formik.values.Location} onChange={formik.handleChange} />
                            </div>
                            <div className="form-group">
                                <input type="text" id="Namenursery" name="Namenursery" placeholder="Назва розплідника" value={formik.values.Namenursery} onChange={formik.handleChange} />
                            </div>
                            <div className="form-group">
                                <button type="submit" className="register-button">Оновити</button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default EditUserData;

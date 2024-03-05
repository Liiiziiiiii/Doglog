import React from 'react';
import './CreateAccount.scss';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';


const CreateAccount = () => {

    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            Name: '',
            Surname: '',
            Email: '',
            passwordHash: '',
            Phone: '',
            Location: '',
            Namenursery: '',
        },
        validationSchema: Yup.object({
            Name: Yup.string().required('Поле не може бути порожнім'),
            Surname: Yup.string().required('Поле не може бути порожнім'),
            Email: Yup.string().email('Введіть коректний email').required('Поле не може бути порожнім'),
            passwordHash: Yup.string().required('Поле не може бути порожнім'),
            Phone: Yup.string().required('Поле не може бути порожнім'),
            // location: Yup.string().required('Поле не може бути порожнім'),
            // breederName: Yup.string().required('Поле не може бути порожнім'),
        }),
        onSubmit: async (values) => {
            try {
                const response = await axios.post('http://localhost:5254/api/RegistarationUsers/register', values);
                console.log('Response:', response);
                if(response.status === 201){
                    navigate("/");
                }
            } catch (error) {
                console.error('Error:', error);
            }
        },
    });


    return (
        <div>
            <div className="create-account-section">
                <h2 className="create-account-heading">Створення акаунту</h2>
                <form onSubmit={formik.handleSubmit}>
                    <div className="form-group">
                        <input type="text" id="Name" name="Name" placeholder="Ім'я" required value={formik.values.Name} onChange={formik.handleChange} />
                    </div>
                    <div className="form-group">
                        <input type="text" id="Surname" name="Surname" placeholder="Прізвище" required value={formik.values.Surname} onChange={formik.handleChange} />
                    </div>
                    <div className="form-group">
                        <input type="Email" id="Email" name="Email" placeholder="Електронна пошта" required value={formik.values.Email} onChange={formik.handleChange} />
                    </div>
                    <div className="form-group">
                        <input type="Password" id="passwordHash" name="passwordHash" placeholder="Пароль" required value={formik.values.passwordHash} onChange={formik.handleChange} />
                    </div>
                    <div className="form-group">
                        <input type="tel" id="Phone" name="Phone" placeholder="Номер телефону" required value={formik.values.Phone} onChange={formik.handleChange} />
                    </div>
                    <div className="form-group">
                        <input type="text" id="Location" name="Location" placeholder="Місцезнаходження" value={formik.values.Location} onChange={formik.handleChange} />
                    </div>
                    <div className="form-group">
                        <input type="text" id="Namenursery" name="Namenursery" placeholder="Назва розплідника" value={formik.values.Namenursery} onChange={formik.handleChange} />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="register-button">Зареєструватись</button>
                    </div>
                </form>
            </div>
        </div>
    );
};


export default CreateAccount;
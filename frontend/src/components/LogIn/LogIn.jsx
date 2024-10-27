import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import './LogIn.scss';
import { Footer } from '../Footer';


const LogIn = () => {
    const navigate = useNavigate();
    const [userRegistered, setUserRegistered] = useState(true)

    const formik = useFormik({
        initialValues: {
            Name: '',
            Password: '',
        },
        validationSchema: Yup.object({
            Name: Yup.string().required('Поле не може бути порожнім'),
            Password: Yup.string().required('Поле не може бути порожнім'),
        }),
        onSubmit: async (values) => {
            try {
                const response = await axios.post('https://cdq2m359-5254.euw.devtunnels.ms/api/Auth/login', values);
                console.log('Response:', response);

                if (response.status === 200) {
                    console.log("Login successful", response.data);

                    localStorage.setItem("loggedIn", true);
                    localStorage.setItem("token", response.data); 
                    localStorage.setItem("UserId", response.data); 

                    navigate(`/myaccount/${response.data}`);
                }
            } catch (error) {
                console.error('Error:', error);
                setUserRegistered(false)
            }
        },
    });

    const InputField = ({ name, ...props }) => {
        const { getFieldProps, getFieldMeta } = formik;
        const field = getFieldProps(name);
        const meta = getFieldMeta(name);

        return (
            <>
                <input {...field} {...props} />
                {meta.touched && meta.error ? (
                    <div className="error-message">{meta.error}</div>
                ) : null}
            </>
        );
    };

    const UserNotRegisteredAttention = ({ userRegisteredState }) => {
        if (!userRegisteredState) {
            return <p className="error-message">Користувач не зареєстрований</p>;
        } else {
            return null;
        }
    };

    return (
        <>
            <form className="myacc" onSubmit={formik.handleSubmit}>
                <div>
                    <h1>Мій Акаунт</h1>
                    <div>
                        <input type="text" id="Name" name="Name" placeholder="Name" className="rounded-input" value={formik.values.Name} onChange={formik.handleChange} required />
                    </div>
                    <div>
                        <input type="password" id="Password" name="Password" placeholder="Password" className="rounded-input" value={formik.values.Password} onChange={formik.handleChange} required  />
                    </div>
                    <div className="forgot-password">
                        <p><a href="#">Забули пароль?</a></p>
                    </div>
                    <UserNotRegisteredAttention userRegisteredState={userRegistered} />
                    <div>
                        <button type="submit" className="login-button">Увійти</button>
                    </div>
                </div>
                <div className="create-account">
                    <p>Не маєте акаунту? </p>
                    <Link to="/register" className="create-account-button">Створити акаунт</Link>
                </div>
            </form>
            <Footer />
        </>
    );
};

export default LogIn;
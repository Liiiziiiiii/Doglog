import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import './MyAcc.scss';

const MyAcc = () => {
    const navigate = useNavigate();

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
                const response = await axios.post('http://localhost:5254/api/RegistarationUsers/login', values);
                console.log('Response:', response);

                if (response.status === 200) {
                    console.log("Login successful");
                    window.localStorage.setItem("token", response.data);
                    navigate("/myaccount");
                }
            } catch (error) {
                console.error('Error:', error);
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
    

    return (
        <form className="myacc" onSubmit={formik.handleSubmit}>
            <div>
                <h1>Мій Акаунт</h1>
                <div>
                    <InputField type="text" id="Name" name="Name" placeholder="Name" className="rounded-input" required />
                </div>
                <div>
                    <InputField type="password" id="Password" name="Password" placeholder="Password" className="rounded-input" required />
                </div>
                <div className="forgot-password">
                    <p><a href="#">Забули пароль?</a></p>
                </div>
                <div>
                    <button type="submit" className="login-button">Увійти</button>
                </div>
            </div>
            <div className="create-account">
                <p>Не маєте акаунту? </p>
                <Link to="/register" className="create-account-button">Створити акаунт</Link>
            </div>
        </form>
    );
};

export default MyAcc;

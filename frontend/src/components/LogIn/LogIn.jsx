import React, { useState } from "react";
import {useDispatch} from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "./LogIn.scss";
import { login } from "../../store";
import { Footer } from "../Footer";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = (e)=>{
    e.preventDefault()
    dispatch(login({email, password}))
  }

  return (
    <>
      <form className="myacc" onSubmit={handleSubmit} >
        <div>
          <h1>Мій Акаунт</h1>
          <div>
            <input
              onChange={e=>setEmail(e.target.value)}
              type="text"
              id="Name"
              name="Name"
              placeholder="Name"
              className="rounded-input"
              required
            />
          </div>
          <div>
            <input
              onChange={e=>setPassword(e.target.value)}
              type="password"
              id="Password"
              name="Password"
              placeholder="Password"
              className="rounded-input"
              required
            />
          </div>
          <div className="forgot-password">
            <p>
              <a href="#">Забули пароль?</a>
            </p>
          </div>
          <div>
            <button type="submit" className="login-button">
              Увійти
            </button>
          </div>
        </div>
        <div className="create-account">
          <p>Не маєте акаунту? </p>
          <Link to="/register" className="create-account-button">
            Створити акаунт
          </Link>
        </div>
      </form>
      <Footer />
    </>
  );
};

export default LogIn;

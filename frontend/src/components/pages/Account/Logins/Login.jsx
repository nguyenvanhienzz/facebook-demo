import React, { useState } from 'react'
import './Login.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { Logins } from '../../../../Redux/Slices/userSlice';

const Login = () => {
    const dispatch = useDispatch();

    const [values, setValues] = useState({
        email: "",
        password: "",
    })
    const [error, setError] = useState("");

    const handerSubmit = async (e) => {
        e.preventDefault();
        try {
            const login = await axios.post("/user/login", values);
            dispatch(Logins(login.data))
            navigate("/");
        } catch (error) {
            setError(error.response.data.message);
            setValues({
                email: "",
                password: "",
            })
        }
    }
    const navigate = useNavigate();
    const handerChanges = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value })
    }
    return (
        <div className='login'>
            <div className='logo-nt'>
                <img src='https://www.gamerevolution.com/assets/uploads/2018/11/facebook-messenger-down-how-to-fix.jpg' />
            </div>
            <div className='form-login'>
                <h2>Đăng nhập</h2>
                {error ? <div className='form-err'>{error}</div> : ""}
                <div>
                    <input type='email' name='email' placeholder='Nhập Email' onChange={handerChanges} value={values.email} />
                </div>
                <div>
                    <input type='password' name='password' placeholder='Nhập Password' onChange={handerChanges} value={values.password} />
                </div>
                <button className='login-btn' onClick={handerSubmit}>Đăng nhập</button><br />
                <button className='newacount-btn' onClick={() => navigate('/newacount')}>Tạo tài khoản</button>
            </div>
        </div>
    )
}

export default Login

import React, { useState } from 'react'
import './NewAcount.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const NewAccount = () => {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        username: "",
        email: "",
        password: ""
    });
    const [error, setError] = useState("");
    const handerSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/user/register', values);
            navigate("/login")
        } catch (error) {
            setError(error.response.data.message);
            setValues({
                username: "",
                email: "",
                password: ""
            })
        }
    }

    const handerChanges = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value })
    }
    return (
        <div className='newacount'>
            <div className='logo-nt'>
                <img src='https://www.gamerevolution.com/assets/uploads/2018/11/facebook-messenger-down-how-to-fix.jpg' />
            </div>
            <div className='form-newacount'>
                <h2>Tạo tài khoản</h2>
                <div className='form-err'>{error ? <p>{error}</p> : ''}</div>
                <div>
                    <input type='text' name='username' placeholder='Nhập họ tên' onChange={handerChanges} value={values.username} />
                </div>
                <div>
                    <input type='email' name='email' placeholder='Nhập Email' onChange={handerChanges} value={values.email} />
                </div>
                <div>
                    <input type='password' name='password' placeholder='Nhập Password' onChange={handerChanges} value={values.password} />
                </div>
                <button className='newacc-btn' onClick={handerSubmit}>Tạo tài khoản mới</button><br />
                <button className='login-btn' onClick={() => navigate('/login')}>Đăng nhập</button>
            </div>
        </div>
    )
}

export default NewAccount
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../redux/authslice';
import { useNavigate } from 'react-router-dom';
import './Login.css'; 

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate(); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await dispatch(loginUser(email, password));
        if (result.error) {
            alert(result.error);
        } else {
            navigate('/dashboard'); 
        }
    };

    return (
        <div className="login-container">
            <h2>Login to Your Account</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email Address"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                <button type="submit">Login</button>
            </form>
            <p>
                Don't have an account? <a href="/register">Register here</a>
            </p>
        </div>
    );
};

export default LoginPage;

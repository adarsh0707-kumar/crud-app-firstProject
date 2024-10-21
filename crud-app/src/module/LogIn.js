import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import loader from '../assets/loader.gif'

const LogIn = () => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [error, setError] = useState();

    let navigate = useNavigate();


    const submitHandlar = (event) => {
        event.preventDefault();
        setLoading(true);
        axios.post('http://www.localhost:3000/form/login', {
            userName: userName,
            password: password

        })
            .then(res => {
                setLoading(false);
                localStorage.setItem('token', res.data.token)
                setHasError(false)
                navigate('/dashboard');
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
                setHasError(true);
                setError(err.response.data.msg);
            })
    }

    return (
        <>
            {isLoading && <div>
                <img src={loader} alt='loader' style={{ width: 150 }} />
            </div>}

            {!isLoading && <div>
                <h1>Create Account</h1>
                <form onSubmit={submitHandlar}>

                    <input type='text' placeholder='username' onChange={(e) => setUserName(e.target.value)} />
                    <br />
                    <input type='password' placeholder='password' onChange={(e) => setPassword(e.target.value)} />
                    <br />



                    <button type='submit'>Submit</button>
                </form>
            </div>}

            {hasError && <div>
                <h3 style={{ color: 'red' }}>Error :- {error}</h3>
            </div>}
        </>
    )
}

export default LogIn
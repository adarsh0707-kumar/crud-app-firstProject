import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import loader from '../assets/loader.gif'

const SignUp = () => {

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('null');
    const [isLoading, setLoading] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [error, setError] = useState();

    let navigate = useNavigate();


    const submitHandlar = (event) => {
        event.preventDefault();
        setLoading(true);
        axios.post('http://www.localhost:3000/form/signup', {
            userName: userName,
            password: password,
            email: email,
            phone: phone

        })
            .then(res => {
                console.log(res);
                setLoading(false);
                navigate('/login');
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
                setHasError(true);
                setError(err.message);
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

                    <input type='email' placeholder='email' autoComplete='off' onChange={(e) => setEmail(e.target.value)} />
                    <br />

                    <input type='number' placeholder='phone' onChange={(e) => setPhone(e.target.value)} />
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

export default SignUp
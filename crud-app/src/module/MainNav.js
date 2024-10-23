import React from 'react';
import { Link, useNavigate } from 'react-router-dom';




const MainNav = () => {
    let navigate = useNavigate();
    const logOutHandler = () => {
        localStorage.clear();
        navigate('/login');
    }
    return (
        <>
            <Link to='/dashboard/category'>Category list</Link>
            <Link to='/dashboard/add-category'>Add Category list</Link>
            <br />
            <p>Hello {localStorage.getItem('userName')}!</p>
            <button onClick={logOutHandler}>LogOut</button>
        </>

    )
}

export default MainNav;

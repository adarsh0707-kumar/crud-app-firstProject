import React from 'react';
import { Link } from 'react-router-dom';
const MainNav = () => {
    return (
        <>
            <Link to='/category'>Category list</Link>
            <Link to='/add-category'>Add Category list</Link>
        </>

    )
}

export default MainNav
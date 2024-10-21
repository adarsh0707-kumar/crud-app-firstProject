import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import loader from '../assets/loader.gif'

const Detail = () => {

    const [category, setCategory] = useState({});
    const [isLoading, setLoading] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [error, setError] = useState();


    let params = useParams();
    console.log(params.id);
    useEffect(() => {
        setLoading(true);
        axios.get('http://localhost:3000/category/' + params.id)
            .then(res => {
                setHasError(false);
                setLoading(false);
                console.log(res.data.category);
                setCategory(res.data.category);
            })
            .catch(err => {
                setLoading(false);
                console.log(err);
                setHasError(true);
                setError(err.response.statusText)
            })
    }, [params.id])

    return (
        <>
            {isLoading && <div>
                <img src={loader} alt='loader' style={{ width: 150 }} />
            </div>}

            {!isLoading && !hasError &&<div>
                <img src={category.photo} style={{ width: 250 }} alt={category.name} />
                <h1>{category.name}</h1>
            </div>}

            {hasError && <div>
                <h3 style={{ color: 'red' }}>Error :- {error}</h3>
            </div>}
        </>
    )
}

export default Detail
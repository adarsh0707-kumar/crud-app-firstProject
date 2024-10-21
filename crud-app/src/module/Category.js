import axios from 'axios';
import React, { useEffect, useState } from 'react'
import loader from '../assets/loader.gif'
import { useNavigate } from 'react-router-dom';



const Category = () => {
    const [categoryList, setCategoryList] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [error, setError] = useState();
    let navigate = useNavigate();


    const detailRoute = (id) => {
        navigate('/detail/' + id);
    }

    const editRoute = (id) => {
        navigate('/edit/' + id);
    }



    const deleteData = (id, imgLink) => {
        if (window.confirm('Are you sure ?')) {

            const url = `http://localhost:3000/category?id=${id}&imageUrl=${imgLink}`

            axios.delete(url)


                .then(res => {
                    console.log(res);
                    window.alert("Data Deleted");
                    getData();
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }
    const getData = () => {
        axios.get('http://www.localhost:3000/category', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then(res => {
                setHasError(false);
                setLoading(false);
                console.log(res.data.category);
                setCategoryList(res.data.category);
            })
            .catch(err => {
                console.log(err);
                setLoading(false)
                console.log(err.response.data.msg);
                setHasError(true);
                setError(err.response.data.msg);

            });
    }


    useEffect(() => {
        setLoading(true);
        getData();
    }, []);


    return (
        <>
            {isLoading && <div>
                <img src={loader} alt='loader' style={{ width: 150 }} />
            </div>}

            {!isLoading && !hasError && <div>
                <h1>Category List</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Image</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categoryList?.map(data => <Row key={data._id} editReq={editRoute} detailReq={detailRoute} deleteReq={deleteData} detail={data} />)}
                    </tbody>
                </table>
            </div>}

            {hasError && <div>
                <h3 style={{ color: 'red' }}>Error :- {error}</h3>
            </div>}
        </>
    )
}

const Row = (props) => {

    return (
        <tr>
            <td>{props.detail.name}</td>

            <td><img src={props.detail.photo} alt={props.detail.name} style={{ width: 120 }} /></td>
            <td><button onClick={() => { props.editReq(props.detail._id) }}>Edit</button></td>

            <td><button onClick={() => { props.detailReq(props.detail._id) }}>Detail</button></td>
            <td><button onClick={() => { props.deleteReq(props.detail._id, props.detail.photo) }}>Delete</button></td>
        </tr>
    )
}

export default Category
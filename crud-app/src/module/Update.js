import axios from 'axios';
import React, { useEffect, useState } from 'react';
import imageLogo from '../assets/imageLogo.png'
import loader from '../assets/loader.gif'
import { useNavigate, useParams } from 'react-router-dom';


const Update = () => {
  const [category, setCategory] = useState('')
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(imageLogo);
  const [isLoading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState();

  let navigate = useNavigate();
  let params = useParams();

  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:3000/category/' + params.id)
      .then(res => {
        setHasError(false);
        setLoading(false);
        console.log(res.data.category);
        setCategory(res.data.category.name);
        setImageUrl(res.data.category.photo);
      })
      .catch(err => {
        setLoading(false);
        console.log(err);
        setHasError(true);
        setError(err.response.statusText)
      })
  }, [params.id])


  const fileHandler = (e) => {
    setSelectedFile(e.target.files[0]);
    setImageUrl(URL.createObjectURL(e.target.files[0]));
  };

  const submitHandlar = (event) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append('name', category);
    formData.append('photo', selectedFile);

    axios.put('http://www.localhost:3000/category/'+params.id, formData)
      .then(res => {
        console.log(res);
        setLoading(false);
        navigate('/category')
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
        setHasError(true);
        setError(err.message);
      });
  };


  return (
    <>
      {isLoading && <div>
        <img src={loader} alt='loader' style={{ width: 150 }} />
      </div>}

      {!isLoading && <div>
        <h1>Add New Category</h1>
        <form onSubmit={submitHandlar}>
          <input value={category} onChange={(e) => { setCategory(e.target.value) }} type='text' />
          <input onChange={(e) => { fileHandler(e) }} type='file' />
          <button type='submit'>Submit</button> <br />
          <img src={imageUrl} style={{ height: 100 }} alt='demo'></img>
        </form>

      </div>}
      {hasError && <div>
        <h3 style={{ color: 'red' }}>Error :- {error}</h3>
      </div>}
    </>

  );
};


export default Update
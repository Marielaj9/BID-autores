import React, { useEffect } from 'react'
import { useState } from 'react';
import { Link, Outlet, useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Editar = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        author: '',
    });

    
  const [error, setError] = useState('');

      useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/api/autores/' + id)
      .then((response) => {
        setFormData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        
        /*if (formData.author.length < 3) {
            setError('Author name should be at least 3 characters long.');
            return;
        }*/
        axios.put('http://127.0.0.1:8000/api/autores/' + id, formData)
            .then((response) => {
                navigate('/');
            })
            .catch((error) => {
                setError(error.response.data.message);
                console.error(error);
            });
    }
    

    return (
        <>
            <div className="container mt-5">
                <div className="row justify-content-between align-items-center">
                    <div className="col-auto">
                        <h1>Favorite authors</h1>
                    </div>
                    <div className="col-auto">
                        <Link to='/' className='btn btn-primary'>Home</Link>
                    </div>
                </div>
                
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="author" className="form-label">Author:</label>
                        <input
                            type="text"
                            id="author"
                            name="author"
                            minLength={3}
                            className="form-control"
                            value={formData.author}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="d-flex justify-content-end">
                        <button type="submit" className='btn btn-primary me-2'>Editar</button>
                        <Link to='/' className='btn btn-secondary'>Cancelar</Link>
                    </div>
                    {error && <div className="error">{error}</div>}

                </form>
                <Outlet />
            </div>
        </>
    )
}

export default Editar;

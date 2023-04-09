import React, { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AñadirAutores = ({ setData, data }) => {
    const [formData, setFormData] = useState({
        author: '',
    });

    const navigate = useNavigate();

    const [error, setError] = useState('');

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axios
            .post('http://localhost:8000/api/autores', formData)
            .then((response) => {
                setData([...data, response.data]);
                navigate('/');
                console.log(response.data);
            })
            
            .catch((error) => {
                setError(error.response.data.message);
                console.error(error);
            });
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
                    <h1>Favorite authors</h1>
                    <Link to="/">Home</Link>

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="author">Author:</label>
                            <input
                                type="text"
                                id="author"
                                name="author"
                                minLength={3}
                                value={formData.author}
                                onChange={handleChange}
                                className="form-control"
                            />
                        </div>
                        {error && <div className="error">{error}</div>}
                        <div className="d-flex justify-content-between">
                            <button type="submit" className="btn btn-primary" >
                                Add author
                            </button>
                            <Link to="/" className="btn btn-secondary" >
                                Cancel
                            </Link>
                        </div>

                    </form>

                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AñadirAutores;

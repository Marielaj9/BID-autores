import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';

export const Home = () => {
    const [data, setData] = useState(null);
    const [autores, setAutores] = useState([]);
    const [deleteId, setDeleteId] = useState(null);

    const getAutores = () => {
        axios.get('http://127.0.0.1:8000/api/autores')
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }

    useEffect(() => {
        getAutores();
    }, []);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/autores/')
            .then(response => {
                setAutores(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, [deleteId]);

   const eliminar = (id) => {
  axios.delete(`http://127.0.0.1:8000/api/autores/${id}`)
    .then((response) => {
        console.log(response.data);
      setData(data.filter(item => item._id !== id));
    })
    .catch(error => {
      console.error(error);
    });
};


    return (
        <div>
            <h1>Favorite Authors</h1>
            <Link to='/autores'>Add an author</Link>
            {data ? (
                <table>
                    <thead>
                        <tr>
                            <th>Author</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(item => (
                            <tr key={item._id}>
                                <td>
                                    <Link to={`/autores/${item._id}`} className="text1">{item.author}</Link>
                                </td>
                                <td>
                                    <Link to={`/autores/${item._id}/edit`} className="text2">Edit</Link>
                                </td>
                                <td>
                                    <button onClick={() => eliminar(item._id)} className="btn btn-danger">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>Loading data...</p>
            )}
        </div>
    )
}

import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

const Update = () => {
  const [book, setBook] = useState({
    title: '',
    desc: '',
    price: null,
    cover: '',
  });
  const [error, setError] = useState('');

  // const location = useLocation();
  // const bookId = location.pathname.split('/')[2];
  const navigate = useNavigate();

  const { id } = useParams();
  console.log(id);

  const handleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (bookId) => {
    fetch(`http://localhost:4000/books/${bookId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(book),
    })
      .then(() => navigate('/'))
      .catch((err) => setError(err));
  };

  return (
    <div className="form">
      <h1>Update the Book</h1>
      <input
        type="text"
        placeholder="Book title"
        name="title"
        onChange={handleChange}
      />
      <textarea
        rows={5}
        type="text"
        placeholder="Book desc"
        name="desc"
        onChange={handleChange}
      />
      <input
        type="number"
        placeholder="Book price"
        name="price"
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Book cover"
        name="cover"
        onChange={handleChange}
      />
      <button onClick={() => handleClick(id)}>Update</button>
      {error && 'Something went wrong!'}
      <Link to="/">See all books</Link>
    </div>
  );
};

export default Update;

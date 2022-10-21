import React from 'react';
import { Link } from 'react-router-dom';

function Books() {
  const [books, setBooks] = React.useState([]);

  React.useEffect(() => {
    fetch('http://localhost:4000/books')
      .then((response) => response.json())
      .then((data) => setBooks(data))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (bookId) => {
    fetch(`http://localhost:4000/books/${bookId}`, {
      method: 'DELETE',
    })
      .then(() => window.location.reload())
      .catch((err) => setError(err));
  };

  return (
    <div>
      <h1>Hiu Book Shop</h1>
      <div className="books">
        {books.map((book) => (
          <div key={book.id} className="book">
            <img src={book?.cover} alt="" />
            <h2>{book.title}</h2>
            <p>{book.desc}</p>
            <span>${book.price}</span>
            <button className="delete" onClick={() => handleDelete(book.id)}>
              Delete
            </button>
            <button className="update">
              <Link
                to={`/update/${book.id}`}
                style={{ color: 'inherit', textDecoration: 'none' }}
              >
                Update
              </Link>
            </button>
          </div>
        ))}
      </div>

      <button className="addHome">
        <Link to="/add" style={{ color: 'inherit', textDecoration: 'none' }}>
          Add new book
        </Link>
      </button>
    </div>
  );
}

export default Books;

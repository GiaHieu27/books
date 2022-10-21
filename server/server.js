const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();
const port = 4000;

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'qqqqqq',
  database: 'test',
});

app.get('/books', (req, res) => {
  const query = 'select * from books';
  db.query(query, (err, data) => {
    if (err) return res.json(err.sqlMessage);
    return res.json(data);
  });
});

app.post('/books', (req, res) => {
  console.log(req.body);
  const query =
    'insert into books (`title`, `desc`, `cover`, `price`) values (?)';
  const values = [
    req.body.title,
    req.body.desc,
    req.body.cover,
    req.body.price,
  ];

  db.query(query, [values], (err, data) => {
    if (err) return res.json(err.sqlMessage);
    return res.json('Book has been created');
  });
});

app.delete('/books/:id', (req, res) => {
  const bookId = req.params.id;
  const query = 'delete from books where id = ?';
  db.query(query, [bookId], (err, data) => {
    if (err) return res.json(err.sqlMessage);
    return res.json('Book has been deleted');
  });
});

app.put('/books/:id', (req, res) => {
  console.log(req.params.id);
  const bookId = req.params.id;
  const query =
    'update books set `title` = ?, `desc` = ?, `price` = ?, `cover` = ? where id = ?';

  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ];
  db.query(query, [...values, bookId], (err, data) => {
    if (err) return res.json(err.sqlMessage);
    return res.json('Book has been updated');
  });
});

app.listen(port, () => {
  console.log(`App running`);
});

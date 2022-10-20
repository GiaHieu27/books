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

app.listen(port, () => {
  console.log(`App running`);
});

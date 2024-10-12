const express = require('express');
const mysql = require('mysql2');
const router = express.Router();

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', 
  password: '1234',  
  database: 'studentdb',
});


db.connect(err => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to MySQL database');
});


router.get('/', (req, res) => {
  const sql = 'SELECT * FROM students';
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});


router.post('/', (req, res) => {
  const { name, age, address, contact, guardian, image } = req.body;
  const sql = 'INSERT INTO students (name, age, address, contact, guardian, image) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(sql, [name, age, address, contact, guardian, image], (err, result) => {
    if (err) throw err;
    res.json({ id: result.insertId, name, age, address, contact, guardian, image });
  });
});

router.delete('/:id', (req, res) => {
  const sql = 'DELETE FROM students WHERE id = ?';
  db.query(sql, [req.params.id], (err, result) => {
    if (err) throw err;
    res.json({ message: 'Student deleted' });
  });
});

router.put('/:id', (req, res) => {
  const { name, age, address, contact, guardian, image } = req.body;
  const sql = 'UPDATE students SET name = ?, age = ?, address = ?, contact = ?, guardian = ?, image = ? WHERE id = ?';
  db.query(sql, [name, age, address, contact, guardian, image, req.params.id], (err, result) => {
    if (err) throw err;
    res.json({ id: req.params.id, name, age, address, contact, guardian, image });
  });
});

module.exports = router;

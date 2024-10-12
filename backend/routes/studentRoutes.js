const express = require('express');
const mysql = require('mysql2');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '..', '..', 'src', 'img')); 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); 
  }
});

const upload = multer({ storage: storage });

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

router.post('/', upload.single('image'), (req, res) => {
  const { name, age, address, contact, guardian } = req.body;
  const image = req.file ? req.file.filename : null; 
  const sql = 'INSERT INTO students (name, age, address, contact, guardian, image) VALUES (?, ?, ?, ?, ?, ?)';
  
  db.query(sql, [name, age, address, contact, guardian, image], (err, result) => {
    if (err) throw err;
    res.json({ id: result.insertId, name, age, address, contact, guardian, image });
  });
});

router.put('/:id', upload.single('image'), (req, res) => {
  const { name, age, address, contact, guardian } = req.body;
  const image = req.file ? req.file.filename : req.body.image;
  const sql = 'UPDATE students SET name = ?, age = ?, address = ?, contact = ?, guardian = ?, image = ? WHERE id = ?';
  db.query(sql, [name, age, address, contact, guardian, image, req.params.id], (err, result) => {
    if (err) throw err;
    res.json({ id: req.params.id, name, age, address, contact, guardian, image });
  });
});

router.delete('/:id', (req, res) => {
  const sql = 'DELETE FROM students WHERE id = ?';
  db.query(sql, [req.params.id], (err, result) => {
    if (err) throw err;
    res.json({ message: 'Student deleted' });
  });
});

module.exports = router;

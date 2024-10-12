const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const studentRoutes = require('./routes/studentRoutes');

app.use(cors());
app.use(express.json());

app.use('/img', express.static(path.join(__dirname, '..', 'src', 'img')));

app.use('/students', studentRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

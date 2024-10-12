const express = require('express');
const cors = require('cors');
const studentRoutes = require('./routes/studentRoutes');
const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());

app.use('/students', studentRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

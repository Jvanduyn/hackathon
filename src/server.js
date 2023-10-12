const express = require('express');
const mongoose = require('mongoose');
var cors = require('cors')
const app = express();

app.use(cors())

mongoose.connect('mongodb://localhost:27017/database', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

import dotenv from 'dotenv';
const express = require('express');
const app = express();
const cors = require("cors");

dotenv.config();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require('./routes/todo')(app)
require('./routes/task')(app)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
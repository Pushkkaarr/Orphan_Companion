const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

const { pool } = require('./config/db');
const contentRoutes = require('./routes/fatherRoutes');
const motherRoutes = require('./routes/motherRoute');
const brotherRoutes = require('./routes/brotherRoutes');
const sisterRoutes = require('./routes/sisterRoutes');
dotenv.config();

const app = express();
app.use(cors());

const PORT = process.env.PORT || 5000;

app.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()"); // Simple query to test connection
    res.send(`PostgreSQL connected! Server time is ${result.rows[0].now}`);
  } catch (err) {
    console.error("Error testing PostgreSQL connection:", err);
    res.status(500).send("Internal Server Error");
  }
});

app.use(express.json());

app.use('/api/model', contentRoutes);
app.use('/api/model',motherRoutes);
app.use('/api/model', brotherRoutes);
app.use("/api/model",sisterRoutes);



app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

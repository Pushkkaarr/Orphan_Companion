const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

// const pool = require('./config/db');
const contentRoutes = require('./routes/fatherRoutes');


dotenv.config();

const app = express();
app.use(cors());

app.use(express.json());
// app.get('/test-db', async (req, res) => {
//     try {
//       const result = await pool.query('SELECT NOW()'); // Simple test query
//       res.json({ success: true, time: result.rows[0].now });
//     } catch (error) {
//       res.status(500).json({ success: false, error: error.message });
//     }
//   });

app.use('/api/content', contentRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

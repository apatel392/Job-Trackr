const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const appRoutes = require('./routes/appRoutes');

const app = express();
const allowedOrigins = ['http://localhost:3000', 'http://localhost:5173'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(express.json());

app.use('/api/auth',authRoutes);
app.use('/api/applications',appRoutes);

app.get('/', (req,res) => res.send('JobTrackr API is up'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => 
    console.log(`server is listening on port ${PORT}`));

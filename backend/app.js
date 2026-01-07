const express = require('express');
const cors = require('cors');
require('dotenv').config();
const authRoutes = require('./routes/authRoutes');
const appRoutes = require('./routes/appRoutes');
const interviewRoutes = require('./routes/interviewRoutes');

const app = express();
const allowedOrigins = ['https://jobtrackr-frontend-3ep6.onrender.com'];

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
app.use('/api/interviews',interviewRoutes);

app.get('/', (req,res) => res.send('JobTrackr API is up'));
require('./cron/emailReminder');

module.exports = app;

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const appRoutes = require('./routes/appRoutes');
const interviewRoutes = require('./routes/interviewRoutes');

const app = express();
const allowedOrigins = ['http://localhost:3000', 'http://localhost:5173','http://jobtrackr-frontend.s3-website.us-east-2.amazonaws.com'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  credentials: true
}));
app.use(express.json());

app.use('/api/auth',authRoutes);
app.use('/api/applications',appRoutes);
app.use('/api/interviews',interviewRoutes);

app.get('/', (req,res) => res.send('JobTrackr API is up'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => 
    console.log(`server is listening on port ${PORT}`));

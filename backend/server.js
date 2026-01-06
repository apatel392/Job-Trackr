const app = require('./app');
const pool = require('./config/db');
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => 
    console.log(`server is listening on port ${PORT}`));

app.get('/test-db', async (req,res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({dbTime: result.rows[0].now});
  } catch (err) {
    console.error('DB Test Error:', err);
    res.status(500).json({error: err.message});
  }
});

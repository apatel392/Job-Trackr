const pool = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async(req, res) => {
    const {name, email, password} = req.body;
    try {
        const find = await pool.query(
            'SELECT * FROM users WHERE email=$1',[email]
        );
        if (find.rows.length!=0)
            return res.status(400).json({message: 'User already Registered'});
        if (!password || password.length==0)
            return res.status(401).json({message:'Enter a valid password'});

        const hashed = await bcrypt.hash(password,10);
        const result = await pool.query(
            'INSERT INTO users (name,email,password) VALUES ($1,$2,$3) RETURNING *',
            [name,email,hashed]
        );
        res.status(201).json({message:'User Registered'});
    }   
    catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ error: error.message || 'Server Error' });
    }
};

exports.login = async(req,res) => {
    const {email, password} = req.body;
    try {
        const result = await pool.query('SELECT * FROM users WHERE email=$1', [email]);
        const user = result.rows[0];
        
         if (!user) {
        return res.status(400).json({ message: 'User not registered' });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
        return res.status(401).json({ message: 'Invalid password' });
        }
        const token = jwt.sign({id:user.id}, process.env.JWT_SECRET,{expiresIn: '1d'});
        res.json({token, user:{id: user.id, name: user.name, email: user.email}});
    }
    catch (error) {
        console.log(error);
        res.status(500).json({error: 'Server error!'});
    }
};
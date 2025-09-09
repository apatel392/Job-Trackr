const pool = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validatePassword = require('../middleware/passwordValidator')
const crypto = require("crypto");
const nodemailer = require("nodemailer");
require('dotenv').config();

exports.register = async(req, res) => {
    const {name, email, password} = req.body;
    try {
        const find = await pool.query(
            'SELECT email FROM users WHERE email=$1',[email]
        );
        if (find.rows.length!=0)
            return res.status(400).json({message: 'User already Registered'});
        const validator = validatePassword(password);
        if (!validator.valid)
            return res.status(400).json({ error: validator.message});

        const hashed = await bcrypt.hash(password,10);
        await pool.query(
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
        return res.status(401).json({ message: 'Invalid password. Try Again!' });
        }
        const token = jwt.sign({id:user.id}, process.env.JWT_SECRET,{expiresIn: '1d'});
        res.json({token, user:{id: user.id, name: user.name, email: user.email}});
    }
    catch (error) {
        console.log(error);
        res.status(500).json({error: 'Server error!'});
    }
};

exports.forgotpassword = async(req, res) => {
    const {email} = req.body;
    try {
        const user = await pool.query('SELECT * FROM users WHERE email=$1', [email]);
        if(user.rows.length===0) {
            return res.status(400).json({message: 'user not found'});
        }

        const resetToken = crypto.randomBytes(3).toString("hex");
        const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

        await pool.query('UPDATE users SET reset_token=$1, reset_token_expires=$2 WHERE email=$3',[resetToken, expiresAt, email]);
        
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            }, 
        });

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Password Reset Code",
            text: `Your reset code is: ${resetToken}. It expires in 15 minutes.`,
        });

        res.json({ message: "Reset code sent to email."});
    } 
    catch(error) {
        console.error("Forgot password error:", error);
        res.json(500).json({error: "Server error"});
    }
};

exports.resetpassword = async(req,res) => {
    const {email, code, password} = req.body;
    try {
        const find = await pool.query(
        'SELECT * FROM users WHERE email=$1',[email]
        );
        if (find.rows.length===0)
            return res.status(400).json({message: 'User not fOund!'});
        
        const dbUser = find.rows[0];

        if(!dbUser.reset_token || dbUser.reset_token !== code || new Date() > new Date(dbUser.reset_token_expires)) {
            return res.status(400).json({message:"Invalid or expired reset code"});
        }

        const validator = validatePassword(password);
        if (!validator.valid)
            return res.status(400).json({ error: validator.message});

        const hashed = await bcrypt.hash(password,10);
        await pool.query(`UPDATE users SET password = $1 WHERE email = $2 RETURNING *`,[hashed, email]);
        res.status(204).json({message:'Password Updated Successfully!'});
    }
    catch (error) {
    console.error('Update error:', error);
    res.status(500).json({ error: error.message || 'Server Error' });
    }
}
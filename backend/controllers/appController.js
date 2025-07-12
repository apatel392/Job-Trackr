const pool = require('../config/db');

exports.getApplications = async (req,res) => {
    const userId = req.user.id;
    const result = await pool.query('SELECT * FROM applications WHERE user_id=$1 ORDER BY created_at DESC',[userId]);
    res.json(result.rows);
};

exports.getApplicationById = async(req,res) => {
    const user_id = req.user.id;
    const {id} = req.params;
    const result = await pool.query('SELECT * FROM applications WHERE user_id=$1 AND id=$2',[user_id,id]);

    if (result.rows.length === 0) {
        return res.status(404).json({error: 'Application not Found'});
    }
    res.json(result.rows[0]);
};

exports.createApplication = async(req,res) => {
    userId = req.user.id;
    const { company, position, status, date_applied, job_link, notes} = req.body;
    const result = await pool.query(
        `INSERT INTO applications (user_id, company, position, status, date_applied, job_link, notes) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`,
        [userId,company,position,status,date_applied,job_link,notes]
    );
    res.status(201).json(result.rows[0]);
};

exports.updateApplication = async(req,res) => {
    const userId = req.user.id;
    const {id} = req.params;
    const { company,position,status,date_applied,job_link,notes} = req.body;
    const result = await pool.query(
        `UPDATE applications SET company=$1, position=$2, status=$3, date_applied=$4, job_link=$5, notes=$6 WHERE id=$7 and user_id=$8 RETURNING *`,
        [company,position,status,date_applied,job_link,notes,id,userId]
    );
    res.json(result.rows[0]);
};

exports.deleteApplication = async(req,res) => {
    const userId = req.user.id;
    const {id} = req.params;
    const result = await pool.query(
        'DELETE FROM applications WHERE id=$1 AND user_id=$2',[id,userId]
    );
    res.status(204).json({message: 'Application Deleted Successfully'});
};


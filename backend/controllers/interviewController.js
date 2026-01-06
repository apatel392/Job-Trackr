const pool = require('../config/db');
const fs = require("fs");
const multer = require("multer");
const path = require("path");
const { parseResume } = require("../services/fileParser");
const { generateInterviewQA } = require("../services/aiService");
const upload = multer({ dest: "uploads/" });

exports.getInterviews = async(req,res) => {
    try {
    const result = await pool.query('SELECT * FROM interviews WHERE job_id=$1 ORDER BY interview_date ASC',[req.params.jobId]);
    res.json(result.rows);
    }
    catch(err){
        res.status(500).json({error: 'Failed to fetch interviews'});
    }
};

exports.reminderInterview =  async (req, res) => {
  try {
    const userId = req.user.id; 
    const today = new Date().toISOString().split('T')[0];
    const result = await pool.query(
      `SELECT i.*, a.company as company, a.position 
       FROM interviews i
       JOIN applications a ON i.job_id = a.id
       WHERE DATE(i.reminder_date) = $1
       AND i.user_id = $2`,
      [today, userId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Reminder fetch failed:', err); // log exact cause
    res.status(500).json({ error: err.message });
  }
};  

exports.addInterview = async(req,res) => {
    const { job_id, interview_date, interview_type, notes } = req.body;
    const reminder_date = new Date(interview_date);
    reminder_date.setDate(reminder_date.getDate() + 7);
    try{
        const result = await pool.query(`INSERT INTO interviews (job_id, interview_date, interview_type, notes, reminder_date, user_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`, [job_id, interview_date, interview_type, notes, reminder_date, req.user.id]);
        res.status(201).json(result.rows[0]);
    }
    catch(err) {
        res.status(500).json({error: 'Failed to add interview'});
    }
};

exports.deleteInterview = async(req,res) => {
    try{
        await pool.query('DELETE FROM interviews WHERE id=$1',[req.params.id]);
        res.json({message: "Interview deleted"});
    }
    catch(err) {
        res.status(500).json({error: 'Failed to delete interview'});
    }
};

exports.generate = [
  upload.single("res"), 
  async (req, res) => {
    try {
      const jobDescription = req.body.jd;  
      const resumeFile = req.file;        

      if (!resumeFile) {
        return res.status(400).json({ message: "Resume required" });
      }
      if (!jobDescription) {
        return res.status(400).json({ message: "Job description required" });
      }

      // parse resume file
      const resumeText = await parseResume(resumeFile);

      // generate interview Q&A
      const result = await generateInterviewQA(resumeText, jobDescription);

      // clean up uploaded file
      fs.unlinkSync(resumeFile.path);

      res.json(result);
    } catch (err) {
      console.error("Interview QA generation error:", err.message);
      res.status(500).json({ error: "Failed to generate Interview QA" });
    }
  },
];

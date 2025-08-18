import cron from 'node-cron';
import pool from './config/db';
import {sendEmail} from './config/mailer';

cron.schedule('* * * * *', async() => {

    const today = new Date().toISOString().split('T')[0];
    const { rows } = await pool.query(`SELECT i.*, a.position, a.company FROM interviews i JOIN applications a ON a.id = i.job_id WHERE DATE(i.reminder_date)=$1 AND i.follow_up_sent=$2`,[today, False]);

    for(let interview of rows) {
        await sendEmail('patelakshar1226@gmail.com',
        `Follow-up reminder: ${interview.company}`,
        `You had an interview with ${interview.company} for ${interview.position} more than 7 days ago. Time to follow up!`
        );  
    
    await pool.query('UPDATE interviews SET follow_up_sent = TRUE where id=$1',[interview.id]);
    }
});
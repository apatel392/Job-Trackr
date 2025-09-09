const cron = require('node-cron');
const pool = require('../config/db'); // adjust path if needed
const sendEmail = require('../config/mailer');

cron.schedule('0 9 * * *', async () => { // runs daily at 9 AM
    try {
        const today = new Date().toISOString().split('T')[0];
        console.log('Cron job triggered');
        const { rows } = await pool.query(
            `SELECT i.*, a.position, a.company, u.email, u.name
             FROM interviews i 
             JOIN applications a ON a.id = i.job_id
             JOIN users u ON u.id = i.user_id
             WHERE DATE(i.reminder_date)=$1 AND i.follow_up_sent=$2`,
            [today, false]
        );

        for (let interview of rows) {
            await sendEmail(
                `${interview.email}`,
                `Follow-up reminder: ${interview.company}`,
                `Hi ${interview.name},

You had an interview with ${interview.company} for the ${interview.position} position more than 7 days ago.

This is a great time to send a polite follow-up email to thank them again for the opportunity and check on the status of your application.

Good luck!`
            );

            await pool.query(
                'UPDATE interviews SET follow_up_sent = TRUE WHERE id=$1',
                [interview.id]
            );
        }
        console.log(`${rows.length} reminder emails sent today.`);

    } catch (err) {
        console.error('Cron job error:', err);
    }
});

const nodemailer = require('nodemailer');
require('dotenv').config();

async function sendEmail(to, subject, text) {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true, // true for port 465
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS, // use App Password if 2FA enabled
            },
        });

        await transporter.sendMail({
            from: `"JobTrackr Notifications <no-reply@jobtrackr.com>"`,
            to,
            subject,
            text
        });
        console.log(`Email sent to ${to} with subject "${subject}"`);
    } catch (err) {
        console.error('Error sending email:', err);
    }
}

module.exports = sendEmail;

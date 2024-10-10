import express from 'express';
import cors from 'cors';         // Import the CORS package
import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const app = express();

// Use CORS middleware to allow cross-origin requests
app.use(cors());
app.use(express.json());

app.post('/send-email', async (req, res) => {
    const { to, dynamic_template_data } = req.body;

    const msg = {
        to,
        from: {
            email: process.env.FROM_MAIL,
            name: 'MoodX Team'
        },
        templateId: process.env.TEMPLATE_ID,
        dynamic_template_data: dynamic_template_data, // Pass the dynamic data to SendGrid
        attachments: [
            {
                content: fs.readFileSync(path.resolve('src/assets/WelcomeLetter.png')).toString("base64"),
                filename: 'WelcomeLetter.png',
                type: 'image/png',
                disposition: 'attachment'
            }
        ]
    };

    try {
        await sgMail.send(msg);
        res.status(200).send({ message: 'Email sent successfully' });
    } catch (error) {
        console.error("Error sending email:", error);
        if (error.response) {
            console.error("Error details:", error.response.body.errors);
        }
        res.status(500).send({ error: 'Failed to send email' });
    }
});

const PORT = process.env.PORT || 3000;
app.get('/', (req, res) => {
    res.send('Hello from Node.js!');
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

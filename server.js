import express from 'express';
import cors from 'cors';         // Import the CORS package
import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';

dotenv.config();
sgMail.setApiKey('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');

const app = express();

// Use CORS middleware to allow cross-origin requests
app.use(cors());
app.use(express.json());

app.post('/send-email', async (req, res) => {
    const { to, dynamic_template_data } = req.body;

    const msg = {
        to,
        from: {
            email: 'whateverittakes23@outlook.com',
            name: 'MoodX Team'
        },
        templateId: 'd-6949e39b03c84ad4ac0929795fa2f2b8',
        dynamic_template_data: dynamic_template_data // Pass the dynamic data to SendGrid
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

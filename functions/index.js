// const express = require("express");
const sgMail = require("@sendgrid/mail");
const fs = require("fs");
const path = require("path");
const {onRequest} = require("firebase-functions/v2/https");
// const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require("cors")({origin: true});
const {GoogleGenerativeAI} = require("@google/generative-ai");

admin.initializeApp();
// const db = admin.firestore();
sgMail.setApiKey(process.env.VITE_SENDGRID_KEY);
// const sendgridApiKey = functions.config().sendgrid.key;
// const fromEmail = functions.config().from.mail;
// const templateId = functions.config().template.id;

// Set up environment variables from Firebase Functions config
// sgMail.setApiKey(sendgridApiKey);

// const app = express();

// Use CORS middleware to allow cross-origin requests
// app.use(cors());
// app.use(express.json());

exports.sendEmail = onRequest((req, res) => {
  cors(req, res, async () => {
    const {email, dynamicTemplateData} = req.body;
    const filePath = path.join(__dirname, "assets/WelcomeLetter.png");
    const attachment = fs.readFileSync(filePath).toString("base64");

    const msg = {
      to: email,
      from: {
        email: process.env.FROM_MAIL,
        name: "MoodX Team",
      },
      templateId: process.env.TEMPLATE_ID,
      dynamicTemplateData: dynamicTemplateData,
      attachments: [
        {
          content: attachment,
          filename: "WelcomeLetter.png",
          type: "image/png",
          disposition: "attachment",
        },
      ],
    };
    try {
      sgMail
          .send(msg)
          .then(() => {
            console.log("Email sent");
          })
          .catch((error) => {
            console.error(error);
          });
      res.status(200).send("Email sent successfully");
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).send({error: "Failed to send email"});
    }
  });
});

exports.sendBulkEmails = onRequest((req, res) => {
  cors(req, res, async () => {
    const {emails, dynamicTemplateData} = req.body;

    // Path to attachment file
    const filePath = path.join(__dirname, "assets/WelcomeLetter.png");
    const attachment = fs.readFileSync(filePath).toString("base64");

    // Prepare messages array for bulk sending
    const messages = emails.map((email) => ({
      to: email,
      from: {
        email: process.env.FROM_MAIL,
        name: "MoodX Team",
      },
      templateId: process.env.TEMPLATE_ID,
      dynamicTemplateData: dynamicTemplateData,
      attachments: [
        {
          content: attachment,
          filename: "WelcomeLetter.png",
          type: "image/png",
          disposition: "attachment",
        },
      ],
    }));

    try {
      // Send all emails in a single call
      await sgMail.send(messages, {isMultiple: true});
      console.log("Bulk email sent successfully");
      res.status(200).send("Bulk email sent successfully");
    } catch (error) {
      console.error("Error sending bulk email:", error);
      res.status(500).send({error: "Failed to send bulk email"});
    }
  });
});

const textGenTextOnlyPrompt = async (promptText) => {
  // Initialize the Google Generative AI client with your API key
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({model: "gemini-1.5-flash"});

  // Generate content based on the prompt
  const result = await model.generateContent(promptText);

  // Access the text content in the response
  const text = result.response.text();

  return text;
};

// Firebase Function to handle HTTP requests for AI text generation
exports.textGenTextOnlyPrompt = onRequest(async (req, res) => {
  cors(req, res, async () => {
    const {prompt} = req.body;

    if (!prompt) {
      return res.status(400).send("Prompt text is required");
    }

    try {
      const result = await textGenTextOnlyPrompt(prompt);
      res.status(200).send({generatedText: result});
    } catch (error) {
      console.error("Error generating content:", error);
      res.status(500).send("Error generating content");
    }
  });
});

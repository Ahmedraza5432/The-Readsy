import express from 'express';
import cors from 'cors'
import bodyParser from 'body-parser';
import nodemailer from 'nodemailer';
const app = express();
const port = 8000;
app.use(bodyParser.json());
app.use(express.json());
app.use(cors())
app.options('*', cors());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ahmed.radiantcortex@gmail.com',
    pass: 'mreljejirzhndetb',
  },
});

app.get('/' , (req,res) =>{
res.send("Server Start Succesfully!!!")
})
app.post('/api/messages', (req, res) => {
  const { name, email, number} = req.body;

  // Validate input
  if (!name || !email || !number) {
    return res.status(400).json({ error: 'Please provide all required fields.' });
  }

  const mailOptions = {
    from: 'ahmed.radiantcortex@gmail.com',
    to: 'contact@thereadsy.com',
    subject: `${name ? `${name}, ` : ''}your Exclusive Invitation Inside`,
    html: `
        <html>
          <head>
            <style>
              body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                color: #333;
              }
    
              .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #fff;
                border-radius: 8px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              }
    
              h1 {
                color: #007BFF;
              }
    
              p {
                line-height: 1.6;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <h1>Contact Client</h1>

              <h2>Contact Information:</h2>
              <p><strong>Name:</strong> ${name ? name : 'Name not Available'}</p>
              <p><strong>Email:</strong> ${email ? email : 'Email Not Available'}</p>
              <p><strong>Phone Number:</strong> ${number ? number : 'Phone Number Not Available'}</p>
              <p><strong>Message:</strong></p>
              <p>${req.body.textarea ? req.body.textarea : 'No text Available'}</p>              
            </div>
          </body>
        </html>
      `,
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error:', error);
      return res.status(500).send(error.toString());
    }

    console.log('Email sent:', info.response);
    res.status(200).json({ message: 'Message successfully saved.' });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

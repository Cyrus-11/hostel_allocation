const nodemailer = require('nodemailer');

// Email Transporter Configuration
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,  // Your Gmail
    pass: process.env.EMAIL_PASS   // Your Gmail App Password
  }
});

// Send Verification Email Function
exports.sendVerificationEmail = async (email, verificationCode) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Verify Your Account - Hostel Allocation System',
      html: `
        <h1>Email Verification</h1>
        <p>Thank you for registering. Use the code below to verify your email:</p>
        <h2>${verificationCode}</h2>
        <p>This code expires in 15 minutes. Please do not share it.</p>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Verification email sent:', info.response);
  } catch (error) {
    console.error('Error sending verification email:', error);
    throw error;
  }
};

// Send Password Reset Email Function
exports.sendPasswordResetEmail = async (email, resetLink) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Password Reset Request - Hostel Allocation System',
      html: `
        <h1>Password Reset</h1>
        <p>You have requested to reset your password. Click the link below to reset it:</p>
        <a href="${resetLink}" style="display: inline-block; padding: 10px 20px; background-color: #007BFF; color: white; text-decoration: none; border-radius: 5px;">
          Reset Password
        </a>
        <p>If you did not request this, please ignore this email.</p>
        <p>This link will expire in 15 minutes.</p>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Password reset email sent:', info.response);
  } catch (error) {
    console.error('Error sending password reset email:', error);
    throw error;
  }
};

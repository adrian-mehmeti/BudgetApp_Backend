const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

const getTransport = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT),
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
};

module.exports = {
  sendVerificationEmailAccount: async user => {
    const transporter = getTransport();

    const emailText = `Welcome to yourbudget30, Please click in link below to confirm your account`;

    const token = jwt.sign({ _id: user._id }, process.env.JWT_VERIFICATION);

    const link = `http://localhost:3001/verify-account?token=${token}`;

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: user.email,
      subject: 'Verification Account',
      text: emailText + link,
      html: emailText + `<a href=${link}>Click to verify</a>`,
    });
  },

  sendResetPasswordEmail: async user => {
    const transporter = getTransport();

    const emailText = `Welcome to yourbudget30, Pleace click in link bellow to reset password`;

    const token = jwt.sign({ _id: user._id }, process.env.JWT_VERIFICATION);

    const link = `http://localhost:3001/reset-password?token=${token}`;

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: user.email,
      subject: 'Reset Password',
      text: emailText + link,
      html: emailText + `<a href=${link}>Reset Passord</a>`,
    });
  },
};

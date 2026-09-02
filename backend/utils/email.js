const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_ADDRESS = 'onboarding@resend.dev'; // switch once a domain is verified

const generateCode = () => Math.floor(100000 + Math.random() * 900000).toString();

const sendVerificationEmail = async (toEmail, fullName, code) => {
  return resend.emails.send({
    from: `Flight 13 Academy <${FROM_ADDRESS}>`,
    to: toEmail,
    subject: 'Verify your Flight 13 account',
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
        <h2 style="color: #d32f2f;">Welcome to Flight 13, ${fullName}!</h2>
        <p>Use this code to verify your account:</p>
        <p style="font-size: 32px; font-weight: bold; letter-spacing: 6px; background: #f5f5f5; padding: 16px; border-radius: 8px; text-align: center;">${code}</p>
        <p style="color: #888; font-size: 13px;">This code expires in 15 minutes. If you didn't create this account, you can ignore this email.</p>
      </div>
    `,
  });
};

const sendPasswordResetEmail = async (toEmail, fullName, code) => {
  return resend.emails.send({
    from: `Flight 13 Academy <${FROM_ADDRESS}>`,
    to: toEmail,
    subject: 'Reset your Flight 13 password',
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
        <h2 style="color: #d32f2f;">Password Reset</h2>
        <p>Hi ${fullName}, use this code to reset your password:</p>
        <p style="font-size: 32px; font-weight: bold; letter-spacing: 6px; background: #f5f5f5; padding: 16px; border-radius: 8px; text-align: center;">${code}</p>
        <p style="color: #888; font-size: 13px;">This code expires in 15 minutes. If you didn't request this, you can safely ignore this email.</p>
      </div>
    `,
  });
};

const sendNewDeviceAlert = async (toEmail, fullName, browser, os, location, ip) => {
  return resend.emails.send({
    from: `Flight 13 Academy <${FROM_ADDRESS}>`,
    to: toEmail,
    subject: 'New sign-in to your Flight 13 account',
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
        <h2 style="color: #d32f2f;">New Sign-In Detected</h2>
        <p>Hi ${fullName}, we noticed a sign-in to your account from a device we haven't seen before:</p>
        <div style="background: #f5f5f5; padding: 16px; border-radius: 8px; margin: 16px 0;">
          <p style="margin: 4px 0;"><strong>Browser:</strong> ${browser}</p>
          <p style="margin: 4px 0;"><strong>Device/OS:</strong> ${os}</p>
          <p style="margin: 4px 0;"><strong>Approximate location:</strong> ${location}</p>
          <p style="margin: 4px 0;"><strong>IP address:</strong> ${ip}</p>
        </div>
        <p style="color: #888; font-size: 13px;">If this was you, no action is needed. If you don't recognize this activity, we recommend resetting your password immediately.</p>
      </div>
    `,
  });
};
  
module.exports = { generateCode, sendVerificationEmail, sendPasswordResetEmail, sendNewDeviceAlert };
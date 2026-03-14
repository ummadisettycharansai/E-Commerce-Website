import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT) || 587,
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
});

export const sendEmail = async (to: string, subject: string, html: string) => {
  await transporter.sendMail({ from: process.env.EMAIL_USER, to, subject, html });
};

export const sendPasswordResetEmail = async (to: string, token: string) => {
  const url = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
  await sendEmail(to, 'Password Reset', `<p>Click <a href="${url}">here</a> to reset your password. Link expires in 1 hour.</p>`);
};

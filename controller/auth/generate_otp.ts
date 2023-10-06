
import { Request, Response } from 'express';
import nodemailer from 'nodemailer';
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


export const generate_otp = async (req: Request, res: Response) => {
  const { email } = req.body;

  // Generate a random 6-digit OTP)
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  try {
    // Create or update the user's OTP in the database
    const user = await prisma.users.upsert({
      where: { email },
      update: { otp },
      create: { email, otp },
    });

    // Send OTP via email
    const transporter = nodemailer.createTransport({
      service: 'gmail', // e.g., 'gmail'
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: email,
      subject: 'OTP Verification',
      text: `Your OTP for verification is: ${otp}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to send OTP email' });
      } else {
        console.log(`Email sent: ${info.response}`);
        res.status(200).json({ message: 'OTP sent successfully' });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


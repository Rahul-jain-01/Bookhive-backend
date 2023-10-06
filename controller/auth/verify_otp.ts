import { Request, Response } from 'express';

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

export const verify_otp = async (req: Request, res: Response) => {
  const { email, otp } = req.body;

  try {
    const user = await prisma.users.findUnique({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.otp === otp) {
      // OTP is correct
      res.status(200).json({ message: 'OTP verification successful' });
    } else {
      // OTP is incorrect
      res.status(401).json({ message: 'Invalid OTP' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
